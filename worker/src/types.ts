import type { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

export interface GameScore {
  id: string;
  user_id: string;
  game_id: string;
  score: number;
  correct: number;
  rounds: number;
  streak: number;
  duration: number;
  metadata: string | null;
  created_at: string;
}

export type GameId =
  | 'walk-it'
  | 'guess-the-flag'
  | 'guess-by-hints'
  | 'border-blitz'
  | 'capital-match';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export interface ApiError {
  error: string;
  details?: string;
}
