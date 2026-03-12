import { clamp } from './math';

/**
 * Calculate time-based bonus score.
 * Maximum bonus at 0ms, 0 bonus at maxTimeMs.
 */
export function timeBonus(
  timeMs: number,
  maxTimeMs: number,
  maxBonus: number
): number {
  const ratio = clamp(1 - timeMs / maxTimeMs, 0, 1);
  return Math.round(ratio * maxBonus);
}

/**
 * Calculate score for a path game (e.g. Walk It).
 * Fewer steps = higher score.
 */
export function pathScore(
  actualSteps: number,
  optimalSteps: number,
  baseScore: number
): number {
  if (actualSteps <= optimalSteps) return baseScore;
  const penalty = (actualSteps - optimalSteps) * Math.floor(baseScore * 0.1);
  return Math.max(0, baseScore - penalty);
}
