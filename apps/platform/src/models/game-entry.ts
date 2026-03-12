export interface GameEntry {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  path: string;
  category: string;
}

export const GAMES: GameEntry[] = [
  {
    id: 'walk-it',
    name: 'Walk It',
    description: 'Navigate from one country to another by crossing borders.',
    emoji: '🚶',
    color: '#10b981',
    path: 'http://localhost:5174',
    category: 'borders',
  },
  {
    id: 'guess-the-flag',
    name: 'Guess The Flag',
    description: 'Identify countries by their flags. How many can you name?',
    emoji: '🏴',
    color: '#3b82f6',
    path: 'http://localhost:5175',
    category: 'flags',
  },
  {
    id: 'guess-by-hints',
    name: 'Guess By Hints',
    description: 'Guess the mystery country from distance and direction clues.',
    emoji: '🔍',
    color: '#8b5cf6',
    path: 'http://localhost:5176',
    category: 'hints',
  },
  {
    id: 'border-blitz',
    name: 'Border Blitz',
    description: 'Name all neighbors of a country as fast as you can!',
    emoji: '⚡',
    color: '#f59e0b',
    path: 'http://localhost:5177',
    category: 'borders',
  },
  {
    id: 'capital-match',
    name: 'Capital Match',
    description: 'Match countries to their capitals or vice versa.',
    emoji: '🏛️',
    color: '#ec4899',
    path: 'http://localhost:5178',
    category: 'capitals',
  },
];
