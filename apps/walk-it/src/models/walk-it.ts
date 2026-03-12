import type { Round, Answer, Result } from '@geo/types';

export interface WalkItRound extends Round {
  startCountry: string;
  targetCountry: string;
  optimalSteps: number;
  metadata: {
    startCountryName: string;
    targetCountryName: string;
    optimalPath: string[];
  };
}

export interface WalkItAnswer extends Answer {
  value: string;
  path: string[];
}

export interface WalkItResult extends Result {
  path: string[];
  optimalSteps: number;
  actualSteps: number;
  metadata: {
    path: string[];
    optimalPath: string[];
  };
}
