/**
 * Normalize a string for comparison (lowercase, trim, remove diacritics).
 */
export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Check if two strings match after normalization.
 */
export function stringsMatch(a: string, b: string): boolean {
  return normalizeString(a) === normalizeString(b);
}

/**
 * Generate a unique ID.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
