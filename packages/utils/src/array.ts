/**
 * Pick a random element from an array.
 */
export function pickRandom<T>(arr: T[]): T {
  if (arr.length === 0) throw new Error('Cannot pick from empty array');
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Pick N unique random elements from an array.
 */
export function pickRandomN<T>(arr: T[], n: number): T[] {
  if (n > arr.length) throw new Error('n exceeds array length');
  const shuffled = shuffle([...arr]);
  return shuffled.slice(0, n);
}

/**
 * Shuffle an array using Fisher-Yates algorithm.
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Remove duplicates from an array.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
