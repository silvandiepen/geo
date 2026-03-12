import { ref } from 'vue';
import { getAllCountries, getSimilarFlags } from '@geo/geo-data';
import { pickRandom, shuffle, generateId, stringsMatch } from '@geo/utils';
import { createInitialScore, updateScore } from '@geo/types';
import type { Country, Score } from '@geo/types';

export interface FlagRound {
  id: string;
  targetCountry: Country;
  options: Country[];
  flagUrl: string;
}

export function useGuessTheFlag() {
  const countries = ref<Country[]>([]);
  const currentRound = ref<FlagRound | null>(null);
  const answered = ref(false);
  const selectedAnswer = ref<string | null>(null);
  const score = ref<Score>(createInitialScore());
  const loading = ref(false);
  const continentFilter = ref<string>('All');

  async function init() {
    loading.value = true;
    countries.value = await getAllCountries();
    loading.value = false;
  }

  async function newRound() {
    if (countries.value.length === 0) await init();

    const pool = continentFilter.value === 'All'
      ? countries.value.filter(c => c.flag)
      : countries.value.filter(c => c.flag && c.continent === continentFilter.value);

    if (pool.length < 4) return;

    const target = pickRandom(pool);
    const distractors = await getSimilarFlags(target.code, 3);
    const options = shuffle([target, ...distractors.slice(0, 3)]);

    currentRound.value = {
      id: generateId(),
      targetCountry: target,
      options,
      flagUrl: target.flag,
    };
    answered.value = false;
    selectedAnswer.value = null;
  }

  function submitAnswer(countryCode: string) {
    if (!currentRound.value || answered.value) return;
    selectedAnswer.value = countryCode;
    answered.value = true;

    const correct = countryCode === currentRound.value.targetCountry.code;
    const result = {
      correct,
      score: correct ? 100 : 0,
      details: correct
        ? `Correct! It was ${currentRound.value.targetCountry.name}`
        : `Wrong! It was ${currentRound.value.targetCountry.name}`,
    };
    score.value = updateScore(score.value, result);
  }

  function submitTypedAnswer(text: string) {
    if (!currentRound.value) return;
    const correct = stringsMatch(text, currentRound.value.targetCountry.name);
    const code = correct ? currentRound.value.targetCountry.code : '';
    submitAnswer(code || text);
  }

  return {
    countries, currentRound, answered, selectedAnswer, score, loading,
    continentFilter, init, newRound, submitAnswer, submitTypedAnswer,
  };
}
