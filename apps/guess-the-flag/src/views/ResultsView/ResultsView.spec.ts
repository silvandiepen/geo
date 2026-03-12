import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import ResultsView from './ResultsView.vue';

vi.mock('@geo/i18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('../../composables/useGuessTheFlag', () => ({
  useGuessTheFlag: () => ({
    score: ref({ total: 0, correct: 0, rounds: 0, streak: 0 }),
  }),
}));

describe('ResultsView', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(ResultsView, {
      global: {
        stubs: { Button: true, Icon: true, ScoreDisplay: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
