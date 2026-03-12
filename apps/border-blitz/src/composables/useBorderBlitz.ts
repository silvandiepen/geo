import { ref, computed } from 'vue';
import { getAllCountries, getNeighbors } from '@geo/geo-data';
import { pickRandom, stringsMatch } from '@geo/utils';
import { createInitialScore, updateScore } from '@geo/types';
import type { Country, Score } from '@geo/types';

export function useBorderBlitz() {
  const countries = ref<Country[]>([]);
  const targetCountry = ref<Country | null>(null);
  const neighbors = ref<Country[]>([]);
  const foundNeighbors = ref<string[]>([]);
  const wrongGuesses = ref<string[]>([]);
  const inputValue = ref('');
  const score = ref<Score>(createInitialScore());
  const loading = ref(false);
  const timerRunning = ref(false);
  const gameState = ref<'idle' | 'playing' | 'ended'>('idle');

  const allFound = computed(() =>
    foundNeighbors.value.length === neighbors.value.length && neighbors.value.length > 0
  );

  const progressText = computed(() =>
    `${foundNeighbors.value.length}/${neighbors.value.length}`
  );

  async function init() {
    loading.value = true;
    countries.value = await getAllCountries();
    loading.value = false;
  }

  async function newRound() {
    if (countries.value.length === 0) await init();

    const withBorders = countries.value.filter(c => c.borders.length >= 3);
    const target = pickRandom(withBorders);
    targetCountry.value = target;
    neighbors.value = await getNeighbors(target.code);
    foundNeighbors.value = [];
    wrongGuesses.value = [];
    inputValue.value = '';
    gameState.value = 'playing';
    timerRunning.value = true;
  }

  function submitGuess(text: string) {
    if (!targetCountry.value || gameState.value !== 'playing') return;
    const trimmed = text.trim();
    if (!trimmed) return;

    const match = neighbors.value.find(n => stringsMatch(n.name, trimmed));
    if (match && !foundNeighbors.value.includes(match.code)) {
      foundNeighbors.value = [...foundNeighbors.value, match.code];
    } else if (!match) {
      wrongGuesses.value = [...wrongGuesses.value, trimmed];
    }
    inputValue.value = '';

    if (allFound.value) endRound();
  }

  function endRound() {
    timerRunning.value = false;
    gameState.value = 'ended';

    const foundCount = foundNeighbors.value.length;
    const total = neighbors.value.length;
    const roundScore = Math.round((foundCount / total) * 100) - wrongGuesses.value.length * 5;

    score.value = updateScore(score.value, {
      correct: foundCount === total,
      score: Math.max(0, roundScore),
      details: `Found ${foundCount}/${total} neighbors`,
    });
  }

  return {
    targetCountry, neighbors, foundNeighbors, wrongGuesses, inputValue,
    score, loading, timerRunning, gameState, allFound, progressText,
    init, newRound, submitGuess, endRound,
  };
}
