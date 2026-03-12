import { ref } from 'vue';
import { getAllCountries } from '@geo/geo-data';
import { pickRandom, pickRandomN, shuffle, generateId, stringsMatch } from '@geo/utils';
import { createInitialScore, updateScore } from '@geo/types';
import type { Country, Score } from '@geo/types';

export type QuestionMode = 'countryToCapital' | 'capitalToCountry';

export interface CapitalRound {
  id: string;
  mode: QuestionMode;
  targetCountry: Country;
  options: string[];
  correctAnswer: string;
  question: string;
}

export function useCapitalMatch() {
  const countries = ref<Country[]>([]);
  const currentRound = ref<CapitalRound | null>(null);
  const answered = ref(false);
  const selectedAnswer = ref<string | null>(null);
  const score = ref<Score>(createInitialScore());
  const loading = ref(false);
  const mode = ref<QuestionMode>('countryToCapital');

  async function init() {
    loading.value = true;
    countries.value = (await getAllCountries()).filter(c => c.capital);
    loading.value = false;
  }

  async function newRound() {
    if (countries.value.length === 0) await init();

    const target = pickRandom(countries.value);
    const distractors = pickRandomN(
      countries.value.filter(c => c.code !== target.code),
      3
    );

    const currentMode = mode.value;
    const options = shuffle(
      currentMode === 'countryToCapital'
        ? [target.capital, ...distractors.map(c => c.capital)]
        : [target.name, ...distractors.map(c => c.name)]
    );

    const question = currentMode === 'countryToCapital'
      ? `What is the capital of ${target.name}?`
      : `Which country has the capital ${target.capital}?`;

    currentRound.value = {
      id: generateId(),
      mode: currentMode,
      targetCountry: target,
      options,
      correctAnswer: currentMode === 'countryToCapital' ? target.capital : target.name,
      question,
    };
    answered.value = false;
    selectedAnswer.value = null;
  }

  function submitAnswer(answer: string) {
    if (!currentRound.value || answered.value) return;
    selectedAnswer.value = answer;
    answered.value = true;

    const correct = stringsMatch(answer, currentRound.value.correctAnswer);
    const result = {
      correct,
      score: correct ? 100 : 0,
      details: correct
        ? `Correct! ${currentRound.value.correctAnswer}`
        : `Wrong! The answer was ${currentRound.value.correctAnswer}`,
    };
    score.value = updateScore(score.value, result);
  }

  return {
    countries, currentRound, answered, selectedAnswer, score, loading, mode,
    init, newRound, submitAnswer,
  };
}
