import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import PlayView from './PlayView.vue';

vi.mock('@geo/i18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}));

vi.mock('../../composables/useBorderBlitz', () => ({
  useBorderBlitz: () => ({
    targetCountry: ref(null),
    neighbors: ref([]),
    foundNeighbors: ref([]),
    wrongGuesses: ref([]),
    inputValue: ref(''),
    score: ref({ total: 0, correct: 0, rounds: 0, streak: 0 }),
    loading: ref(false),
    timerRunning: ref(false),
    gameState: ref('idle'),
    allFound: ref(false),
    newRound: vi.fn(),
    submitGuess: vi.fn(),
    endRound: vi.fn(),
  }),
}));

describe('PlayView', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(PlayView, {
      global: {
        stubs: { Button: true, Icon: true, Card: true, Input: true, ScoreDisplay: true, GameTimer: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
