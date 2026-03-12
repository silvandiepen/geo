import { ref } from 'vue';
import { useAuth } from './useAuth';
import type { SaveScorePayload, LeaderboardEntry, UserScore } from './types';

function apiUrl(path: string): string {
  const base =
    typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.['VITE_API_URL']
      ? (import.meta as { env?: Record<string, string> }).env!['VITE_API_URL']
      : 'http://localhost:8787';
  return `${base}/api${path}`;
}

export function useScores() {
  const { token } = useAuth();
  const saving = ref(false);
  const saveError = ref<string | null>(null);

  /**
   * Save a completed game score.
   * Silently skips if the user is not authenticated (games are playable without login).
   */
  async function saveScore(payload: SaveScorePayload): Promise<{ id: string } | null> {
    if (!token.value) return null;

    saving.value = true;
    saveError.value = null;

    try {
      const res = await fetch(apiUrl('/scores'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json() as { id?: string; error?: string };

      if (!res.ok) {
        saveError.value = json.error ?? 'Failed to save score';
        return null;
      }

      return { id: json.id! };
    } catch (e) {
      saveError.value = e instanceof Error ? e.message : 'Network error';
      return null;
    } finally {
      saving.value = false;
    }
  }

  /**
   * Fetch the global leaderboard for a game.
   */
  async function getLeaderboard(
    gameId: string,
    limit = 10,
  ): Promise<LeaderboardEntry[]> {
    try {
      const res = await fetch(
        apiUrl(`/scores/leaderboard/${gameId}?limit=${limit}`),
      );
      if (!res.ok) return [];
      const json = await res.json() as { leaderboard: LeaderboardEntry[] };
      return json.leaderboard ?? [];
    } catch {
      return [];
    }
  }

  /**
   * Fetch the current user's scores for a game.
   * Returns an empty array if not authenticated.
   */
  async function getMyScores(gameId?: string, limit = 20): Promise<UserScore[]> {
    if (!token.value) return [];

    try {
      const params = new URLSearchParams({ limit: String(limit) });
      if (gameId) params.set('game_id', gameId);

      const res = await fetch(apiUrl(`/scores/me?${params.toString()}`), {
        headers: { Authorization: `Bearer ${token.value}` },
      });

      if (!res.ok) return [];
      const json = await res.json() as { scores: UserScore[] };
      return json.scores ?? [];
    } catch {
      return [];
    }
  }

  /**
   * Get the current user's best score and rank for a game.
   */
  async function getMyBest(
    gameId: string,
  ): Promise<{ best: UserScore | null; rank: number | null }> {
    if (!token.value) return { best: null, rank: null };

    try {
      const res = await fetch(apiUrl(`/scores/leaderboard/${gameId}/me`), {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      if (!res.ok) return { best: null, rank: null };
      return await res.json() as { best: UserScore | null; rank: number | null };
    } catch {
      return { best: null, rank: null };
    }
  }

  return {
    saving,
    saveError,
    saveScore,
    getLeaderboard,
    getMyScores,
    getMyBest,
  };
}
