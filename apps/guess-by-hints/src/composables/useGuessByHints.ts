import { ref, computed } from 'vue';
import { getAllCountries, getDistanceBetweenCountries } from '@geo/geo-data';
import { pickRandom, generateId, stringsMatch } from '@geo/utils';
import { createInitialScore, updateScore } from '@geo/types';
import type { Country, Score } from '@geo/types';

export interface Hint {
  type: 'distance' | 'direction' | 'continent' | 'population' | 'borders';
  label: string;
  value: string;
}

export interface HintsRound {
  id: string;
  targetCountry: Country;
  hints: Hint[];
  revealedCount: number;
}

export function useGuessByHints() {
  const countries = ref<Country[]>([]);
  const currentRound = ref<HintsRound | null>(null);
  const guesses = ref<string[]>([]);
  const won = ref(false);
  const score = ref<Score>(createInitialScore());
  const loading = ref(false);
  const guessInput = ref('');
  const MAX_GUESSES = 6;

  const revealedHints = computed(() =>
    currentRound.value?.hints.slice(0, currentRound.value.revealedCount) ?? []
  );
  const guessesLeft = computed(() => MAX_GUESSES - guesses.value.length);
  const isOver = computed(() => won.value || guesses.value.length >= MAX_GUESSES);

  async function init() {
    loading.value = true;
    countries.value = await getAllCountries();
    loading.value = false;
  }

  async function newRound() {
    if (countries.value.length === 0) await init();

    const target = pickRandom(countries.value);
    const reference = pickRandom(countries.value.filter(c => c.code !== target.code));
    const geoData = await getDistanceBetweenCountries(reference.code, target.code);

    const hints: Hint[] = [
      { type: 'continent', label: 'Continent', value: target.continent },
      {
        type: 'distance',
        label: `Distance from ${reference.name}`,
        value: geoData ? `${geoData.distanceKm.toLocaleString()} km` : 'Unknown',
      },
      {
        type: 'direction',
        label: `Direction from ${reference.name}`,
        value: geoData?.direction ?? 'Unknown',
      },
      { type: 'borders', label: 'Number of neighbors', value: String(target.borders.length) },
      {
        type: 'population',
        label: 'Population',
        value:
          target.population > 1_000_000
            ? `~${(target.population / 1_000_000).toFixed(0)} million`
            : `~${(target.population / 1_000).toFixed(0)} thousand`,
      },
      { type: 'continent', label: 'First letter of capital', value: target.capital?.[0] ?? '?' },
    ];

    currentRound.value = { id: generateId(), targetCountry: target, hints, revealedCount: 1 };
    guesses.value = [];
    won.value = false;
    guessInput.value = '';
  }

  function revealNextHint() {
    if (!currentRound.value) return;
    if (currentRound.value.revealedCount < currentRound.value.hints.length) {
      currentRound.value = { ...currentRound.value, revealedCount: currentRound.value.revealedCount + 1 };
    }
  }

  function submitGuess(text: string) {
    if (!currentRound.value || isOver.value) return;
    guesses.value = [...guesses.value, text];

    if (stringsMatch(text, currentRound.value.targetCountry.name)) {
      won.value = true;
      const roundScore = Math.max(10, 100 - (guesses.value.length - 1) * 15);
      score.value = updateScore(score.value, { correct: true, score: roundScore, details: `Found in ${guesses.value.length} guesses` });
    } else {
      revealNextHint();
      if (guesses.value.length >= MAX_GUESSES) {
        score.value = updateScore(score.value, { correct: false, score: 0, details: `Missed: ${currentRound.value.targetCountry.name}` });
      }
    }
    guessInput.value = '';
  }

  return {
    currentRound, guesses, won, score, loading, guessInput,
    revealedHints, guessesLeft, isOver, MAX_GUESSES,
    init, newRound, submitGuess,
  };
}
