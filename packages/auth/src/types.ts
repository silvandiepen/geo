export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface SaveScorePayload {
  game_id: string;
  score: number;
  correct?: number;
  rounds?: number;
  streak?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  username: string;
  score: number;
  correct: number;
  rounds: number;
  streak: number;
  duration: number;
  created_at: string;
}

export interface UserScore {
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
