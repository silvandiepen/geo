import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import authRoutes from './routes/auth';
import scoresRoutes from './routes/scores';

const app = new Hono<{ Bindings: Env }>();

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  '/api/*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  }),
);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.route('/api/auth', authRoutes);
app.route('/api/scores', scoresRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.notFound((c) => c.json({ error: 'Not found' }, 404));

// ── Error handler ─────────────────────────────────────────────────────────────
app.onError((err, c) => {
  console.error('[worker error]', err);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;
