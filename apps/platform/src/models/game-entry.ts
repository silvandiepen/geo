export interface GameEntry {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  path: string;
  category: string;
}

const base = (import.meta as { env?: Record<string, string> }).env ?? {};

function gameUrl(envKey: string, fallback: string): string {
  return base[envKey] ?? fallback;
}

export const GAMES: GameEntry[] = [
  {
    id: 'walk-it',
    name: 'Walk It',
    description: 'Navigate from one country to another by crossing borders.',
    emoji: '🚶',
    color: '#10b981',
    path: gameUrl('VITE_URL_WALK_IT', 'http://localhost:5174'),
    category: 'borders',
  },
  {
    id: 'guess-the-flag',
    name: 'Guess The Flag',
    description: 'Identify countries by their flags. How many can you name?',
    emoji: '🏴',
    color: '#3b82f6',
    path: gameUrl('VITE_URL_GUESS_THE_FLAG', 'http://localhost:5175'),
    category: 'flags',
  },
  {
    id: 'guess-by-hints',
    name: 'Guess By Hints',
    description: 'Guess the mystery country from distance and direction clues.',
    emoji: '🔍',
    color: '#8b5cf6',
    path: gameUrl('VITE_URL_GUESS_BY_HINTS', 'http://localhost:5176'),
    category: 'hints',
  },
  {
    id: 'border-blitz',
    name: 'Border Blitz',
    description: 'Name all neighbors of a country as fast as you can!',
    emoji: '⚡',
    color: '#f59e0b',
    path: gameUrl('VITE_URL_BORDER_BLITZ', 'http://localhost:5177'),
    category: 'borders',
  },
  {
    id: 'capital-match',
    name: 'Capital Match',
    description: 'Match countries to their capitals or vice versa.',
    emoji: '🏛️',
    color: '#ec4899',
    path: gameUrl('VITE_URL_CAPITAL_MATCH', 'http://localhost:5178'),
    category: 'capitals',
  },
];
