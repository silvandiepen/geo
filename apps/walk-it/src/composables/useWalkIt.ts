import { ref, computed } from 'vue';
import { getAllCountries, getNeighbors } from '@geo/geo-data';
import { findShortestPath } from '@geo/game-core';
import { pickRandom, generateId } from '@geo/utils';
import { createInitialScore, updateScore } from '@geo/types';
import type { Country, Score } from '@geo/types';
import type { WalkItRound, WalkItResult } from '../models/walk-it';

export function useWalkIt() {
  const countries = ref<Country[]>([]);
  const currentRound = ref<WalkItRound | null>(null);
  const currentPath = ref<string[]>([]);
  const currentCountry = ref<string>('');
  const neighbors = ref<Country[]>([]);
  const score = ref<Score>(createInitialScore());
  const lastResult = ref<WalkItResult | null>(null);
  const loading = ref(false);

  const getCountryName = (code: string) =>
    countries.value.find(c => c.code === code)?.name ?? code;

  const isAtTarget = computed(() =>
    currentRound.value !== null && currentCountry.value === currentRound.value.targetCountry
  );

  async function init() {
    loading.value = true;
    countries.value = await getAllCountries();
    loading.value = false;
  }

  async function newRound() {
    if (countries.value.length === 0) await init();

    const withBorders = countries.value.filter(c => c.borders.length >= 2);
    let start: Country;
    let target: Country;
    let path: string[] | null = null;

    do {
      start = pickRandom(withBorders);
      target = pickRandom(withBorders.filter(c => c.code !== start.code));
      path = findShortestPath(
        start.code,
        target.code,
        (code) => countries.value.find(c => c.code === code)?.borders ?? []
      );
    } while (!path || path.length < 4 || path.length > 10);

    const round: WalkItRound = {
      id: generateId(),
      question: `Get from ${start.name} to ${target.name}`,
      startCountry: start.code,
      targetCountry: target.code,
      optimalSteps: path.length - 1,
      metadata: {
        startCountryName: start.name,
        targetCountryName: target.name,
        optimalPath: path,
      },
    };

    currentRound.value = round;
    currentCountry.value = start.code;
    currentPath.value = [start.code];
    lastResult.value = null;
    neighbors.value = await getNeighbors(start.code);
  }

  async function step(countryCode: string) {
    if (!currentRound.value) return;
    currentCountry.value = countryCode;
    currentPath.value = [...currentPath.value, countryCode];
    neighbors.value = await getNeighbors(countryCode);
  }

  function finishRound(): WalkItResult {
    if (!currentRound.value) throw new Error('No active round');

    const actualSteps = currentPath.value.length - 1;
    const correct = currentCountry.value === currentRound.value.targetCountry;
    const base = 100;
    const penalty = Math.max(0, actualSteps - currentRound.value.optimalSteps) * 10;
    const roundScore = correct ? Math.max(0, base - penalty) : 0;

    const result: WalkItResult = {
      correct,
      score: roundScore,
      details: correct
        ? `Reached in ${actualSteps} steps (optimal: ${currentRound.value.optimalSteps})`
        : 'Did not reach the destination',
      path: currentPath.value,
      optimalSteps: currentRound.value.optimalSteps,
      actualSteps,
      metadata: {
        path: currentPath.value,
        optimalPath: currentRound.value.metadata.optimalPath,
      },
    };

    score.value = updateScore(score.value, result);
    lastResult.value = result;
    return result;
  }

  function resetScore() {
    score.value = createInitialScore();
  }

  return {
    countries,
    currentRound,
    currentPath,
    currentCountry,
    neighbors,
    score,
    lastResult,
    loading,
    isAtTarget,
    getCountryName,
    init,
    newRound,
    step,
    finishRound,
    resetScore,
  };
}
