import type { Context } from 'hono';
import type { Env, JwtPayload } from './types';
import { verifyJwt } from './crypto';

/**
 * Middleware: require a valid JWT Bearer token.
 * Attaches the decoded payload to `c.set('user', payload)`.
 */
export async function requireAuth(
  c: Context<{ Bindings: Env }>,
  next: () => Promise<void>,
): Promise<Response | void> {
  const authorization = c.req.header('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authorization.slice(7);
  const payload = await verifyJwt(token, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }

  c.set('user', payload as JwtPayload);
  await next();
}

export function json<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
