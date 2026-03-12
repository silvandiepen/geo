import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import PlayView from './PlayView.vue';

vi.mock('@geo/i18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}));

vi.mock('../../composables/useGuessTheFlag', () => ({
  useGuessTheFlag: () => ({
    currentRound: ref(null),
    answered: ref(false),
    score: ref({ total: 0, correct: 0, rounds: 0, streak: 0 }),
    loading: ref(false),
    continentFilter: ref('All'),
    newRound: vi.fn(),
    submitAnswer: vi.fn(),
  }),
}));

describe('PlayView', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(PlayView, {
      global: {
        stubs: { Button: true, Icon: true, Card: true, MultipleChoice: true, ScoreDisplay: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
