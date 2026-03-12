import { Hono } from 'hono';
import type { Env, User } from '../types';
import { hashPassword, verifyPassword, signJwt, generateId } from '../crypto';

const auth = new Hono<{ Bindings: Env }>();

// ── POST /auth/register ───────────────────────────────────────────────────────
auth.post('/register', async (c) => {
  let body: { username?: string; email?: string; password?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }

  const { username, email, password } = body;

  if (!username || !email || !password) {
    return c.json({ error: 'username, email, and password are required' }, 400);
  }

  if (username.length < 3 || username.length > 32) {
    return c.json({ error: 'Username must be 3–32 characters' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Invalid email address' }, 400);
  }

  if (password.length < 8) {
    return c.json({ error: 'Password must be at least 8 characters' }, 400);
  }

  // Check for duplicate username / email
  const existing = await c.env.DB.prepare(
    'SELECT id FROM users WHERE email = ?1 OR username = ?2',
  )
    .bind(email.toLowerCase(), username)
    .first<{ id: string }>();

  if (existing) {
    return c.json({ error: 'Email or username already taken' }, 409);
  }

  const id = generateId();
  const hashed = await hashPassword(password);
  const now = new Date().toISOString();

  await c.env.DB.prepare(
    'INSERT INTO users (id, username, email, password, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)',
  )
    .bind(id, username, email.toLowerCase(), hashed, now, now)
    .run();

  const accessToken = await signJwt(
    { sub: id, username, email: email.toLowerCase() },
    c.env.JWT_SECRET,
    60 * 60, // 1 hour
  );

  return c.json(
    {
      user: { id, username, email: email.toLowerCase() },
      accessToken,
    },
    201,
  );
});

// ── POST /auth/login ──────────────────────────────────────────────────────────
auth.post('/login', async (c) => {
  let body: { email?: string; password?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }

  const { email, password } = body;

  if (!email || !password) {
    return c.json({ error: 'email and password are required' }, 400);
  }

  const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?1')
    .bind(email.toLowerCase())
    .first<User>();

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }

  const accessToken = await signJwt(
    { sub: user.id, username: user.username, email: user.email },
    c.env.JWT_SECRET,
    60 * 60, // 1 hour
  );

  return c.json({
    user: { id: user.id, username: user.username, email: user.email },
    accessToken,
  });
});

// ── GET /auth/me ──────────────────────────────────────────────────────────────
auth.get('/me', async (c) => {
  const authorization = c.req.header('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const { verifyJwt: verify } = await import('../crypto');
  const token = authorization.slice(7);
  const payload = await verify(token, c.env.JWT_SECRET);

  if (!payload) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  const user = await c.env.DB.prepare(
    'SELECT id, username, email, created_at FROM users WHERE id = ?1',
  )
    .bind(payload.sub)
    .first<Omit<User, 'password' | 'updated_at'>>();

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  return c.json({ user });
});

export default auth;
