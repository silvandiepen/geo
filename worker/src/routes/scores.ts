import { Hono } from 'hono';
import type { Env, GameScore } from '../types';
import { requireAuth } from '../middleware';
import { generateId } from '../crypto';

type Variables = { user: { sub: string; username: string; email: string } };

const scores = new Hono<{ Bindings: Env; Variables: Variables }>();

// ── POST /scores — save a new score (requires auth) ───────────────────────────
scores.post('/', requireAuth, async (c) => {
  const user = c.get('user');

  let body: {
    game_id?: string;
    score?: number;
    correct?: number;
    rounds?: number;
    streak?: number;
    duration?: number;
    metadata?: Record<string, unknown>;
  };

  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }

  const { game_id, score, correct, rounds, streak, duration, metadata } = body;

  const validGameIds = [
    'walk-it',
    'guess-the-flag',
    'guess-by-hints',
    'border-blitz',
    'capital-match',
  ];

  if (!game_id || !validGameIds.includes(game_id)) {
    return c.json({ error: `game_id must be one of: ${validGameIds.join(', ')}` }, 400);
  }

  if (score === undefined || typeof score !== 'number') {
    return c.json({ error: 'score is required and must be a number' }, 400);
  }

  const id = generateId();
  const now = new Date().toISOString();

  await c.env.DB.prepare(
    `INSERT INTO game_scores
     (id, user_id, game_id, score, correct, rounds, streak, duration, metadata, created_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`,
  )
    .bind(
      id,
      user.sub,
      game_id,
      score,
      correct ?? 0,
      rounds ?? 0,
      streak ?? 0,
      duration ?? 0,
      metadata ? JSON.stringify(metadata) : null,
      now,
    )
    .run();

  return c.json({ id, message: 'Score saved' }, 201);
});

// ── GET /scores/me — current user's scores ────────────────────────────────────
scores.get('/me', requireAuth, async (c) => {
  const user = c.get('user');
  const gameId = c.req.query('game_id');
  const limit = Math.min(parseInt(c.req.query('limit') ?? '20', 10), 100);

  let query = 'SELECT * FROM game_scores WHERE user_id = ?1';
  const bindings: (string | number)[] = [user.sub];

  if (gameId) {
    query += ' AND game_id = ?2';
    bindings.push(gameId);
  }

  query += ' ORDER BY created_at DESC LIMIT ?';
  bindings.push(limit);

  const result = await c.env.DB.prepare(query)
    .bind(...bindings)
    .all<GameScore>();

  return c.json({ scores: result.results });
});

// ── GET /scores/leaderboard/:game_id ─────────────────────────────────────────
scores.get('/leaderboard/:game_id', async (c) => {
  const gameId = c.req.param('game_id');
  const limit = Math.min(parseInt(c.req.query('limit') ?? '10', 10), 50);

  const result = await c.env.DB.prepare(
    `SELECT
       gs.id,
       gs.user_id,
       u.username,
       gs.score,
       gs.correct,
       gs.rounds,
       gs.streak,
       gs.duration,
       gs.created_at
     FROM game_scores gs
     JOIN users u ON u.id = gs.user_id
     WHERE gs.game_id = ?1
     ORDER BY gs.score DESC, gs.correct DESC
     LIMIT ?2`,
  )
    .bind(gameId, limit)
    .all<GameScore & { username: string }>();

  return c.json({ leaderboard: result.results, game_id: gameId });
});

// ── GET /scores/leaderboard/:game_id/me — user's best score for a game ────────
scores.get('/leaderboard/:game_id/me', requireAuth, async (c) => {
  const user = c.get('user');
  const gameId = c.req.param('game_id');

  const best = await c.env.DB.prepare(
    'SELECT * FROM game_scores WHERE user_id = ?1 AND game_id = ?2 ORDER BY score DESC LIMIT 1',
  )
    .bind(user.sub, gameId)
    .first<GameScore>();

  // Get rank
  let rank: number | null = null;
  if (best) {
    const rankResult = await c.env.DB.prepare(
      'SELECT COUNT(*) as cnt FROM game_scores WHERE game_id = ?1 AND score > ?2',
    )
      .bind(gameId, best.score)
      .first<{ cnt: number }>();
    rank = (rankResult?.cnt ?? 0) + 1;
  }

  return c.json({ best, rank });
});

export default scores;
