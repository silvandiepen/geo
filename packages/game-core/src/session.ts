import type { Round, Answer, Result, Score, GameDefinition } from '@geo/types';
import { createInitialScore, updateScore } from '@geo/types';

export interface GameSessionState<
  TRound extends Round,
  TAnswer extends Answer,
  TResult extends Result,
> {
  currentRound: TRound | null;
  history: Array<{ round: TRound; answer: TAnswer; result: TResult }>;
  score: Score;
  roundStartTime: number | null;
  gameOver: boolean;
}

export function createSessionState<
  TRound extends Round,
  TAnswer extends Answer,
  TResult extends Result,
>(): GameSessionState<TRound, TAnswer, TResult> {
  return {
    currentRound: null,
    history: [],
    score: createInitialScore(),
    roundStartTime: null,
    gameOver: false,
  };
}

export async function startRound<
  TRound extends Round,
  TAnswer extends Answer,
  TResult extends Result,
>(
  state: GameSessionState<TRound, TAnswer, TResult>,
  game: GameDefinition<TRound, TAnswer, TResult>,
  config: Record<string, unknown>
): Promise<GameSessionState<TRound, TAnswer, TResult>> {
  const round = await game.generateRound(config);
  return {
    ...state,
    currentRound: round,
    roundStartTime: Date.now(),
    gameOver: false,
  };
}

export function submitAnswer<
  TRound extends Round,
  TAnswer extends Answer,
  TResult extends Result,
>(
  state: GameSessionState<TRound, TAnswer, TResult>,
  game: GameDefinition<TRound, TAnswer, TResult>,
  answer: TAnswer
): GameSessionState<TRound, TAnswer, TResult> {
  if (!state.currentRound || !state.roundStartTime) return state;

  const result = game.validateAnswer(state.currentRound, answer);
  const timeMs = Date.now() - state.roundStartTime;
  const roundScore = game.scoreRound(result, timeMs);

  const scoredResult = { ...result, score: roundScore };
  const newScore = updateScore(state.score, scoredResult);

  return {
    ...state,
    score: newScore,
    history: [
      ...state.history,
      { round: state.currentRound, answer, result: scoredResult },
    ],
    currentRound: null,
    roundStartTime: null,
  };
}
