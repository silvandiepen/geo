-- Geo Platform D1 Database Schema
-- Run with: wrangler d1 execute geo-db --file=worker/schema.sql

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  username    TEXT NOT NULL UNIQUE,
  email       TEXT NOT NULL UNIQUE,
  password    TEXT NOT NULL, -- bcrypt hash
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email    ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);

-- Sessions table (JWT refresh tokens)
CREATE TABLE IF NOT EXISTS sessions (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  token      TEXT NOT NULL UNIQUE, -- hashed refresh token
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token   ON sessions (token);

-- Game scores table
CREATE TABLE IF NOT EXISTS game_scores (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  game_id    TEXT NOT NULL, -- 'walk-it' | 'guess-the-flag' | 'guess-by-hints' | 'border-blitz' | 'capital-match'
  score      INTEGER NOT NULL DEFAULT 0,
  correct    INTEGER NOT NULL DEFAULT 0,
  rounds     INTEGER NOT NULL DEFAULT 0,
  streak     INTEGER NOT NULL DEFAULT 0,
  duration   INTEGER NOT NULL DEFAULT 0, -- seconds
  metadata   TEXT, -- JSON blob for game-specific data
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_game_scores_user_id   ON game_scores (user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_game_id   ON game_scores (game_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_score      ON game_scores (score DESC);
CREATE INDEX IF NOT EXISTS idx_game_scores_created_at ON game_scores (created_at DESC);
