export type GameCategory =
  | 'geography'
  | 'flags'
  | 'capitals'
  | 'borders'
  | 'hints';

export type InputMode = 'multiple-choice' | 'typing' | 'selection' | 'path';

export interface GameConfigOption {
  key: string;
  label: string;
  type: 'boolean' | 'number' | 'string' | 'select';
  defaultValue: boolean | number | string;
  options?: string[];
}

export interface Round {
  id: string;
  question: string;
  metadata: Record<string, unknown>;
}

export interface Answer {
  value: string | string[];
  timestamp: number;
}

export interface Result {
  correct: boolean;
  score: number;
  details: string;
  metadata?: Record<string, unknown>;
}

export interface Score {
  total: number;
  rounds: number;
  correct: number;
  percentage: number;
  streak: number;
  bestStreak: number;
}

export interface GameDefinition<
  TRound extends Round = Round,
  TAnswer extends Answer = Answer,
  TResult extends Result = Result,
> {
  id: string;
  name: string;
  description: string;
  category: GameCategory;
  inputMode: InputMode;
  configOptions: GameConfigOption[];
  generateRound(config: Record<string, unknown>): Promise<TRound>;
  validateAnswer(round: TRound, answer: TAnswer): TResult;
  scoreRound(result: TResult, timeMs: number): number;
  formatResult(result: TResult): string;
}

export function createInitialScore(): Score {
  return {
    total: 0,
    rounds: 0,
    correct: 0,
    percentage: 0,
    streak: 0,
    bestStreak: 0,
  };
}

export function updateScore(score: Score, result: Result): Score {
  const correct = result.correct ? score.correct + 1 : score.correct;
  const rounds = score.rounds + 1;
  const streak = result.correct ? score.streak + 1 : 0;
  const bestStreak = Math.max(score.bestStreak, streak);
  const total = score.total + result.score;
  return {
    total,
    rounds,
    correct,
    percentage: Math.round((correct / rounds) * 100),
    streak,
    bestStreak,
  };
}
