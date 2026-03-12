import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import PlayView from './PlayView.vue';

vi.mock('@geo/i18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('../../composables/useWalkIt', () => ({
  useWalkIt: () => ({
    currentRound: ref(null),
    currentPath: ref([]),
    currentCountry: ref(''),
    neighbors: ref([]),
    score: ref({ total: 0, correct: 0, rounds: 0, streak: 0 }),
    lastResult: ref(null),
    loading: ref(false),
    isAtTarget: ref(false),
    getCountryName: vi.fn((code: string) => code),
    newRound: vi.fn(),
    step: vi.fn(),
    finishRound: vi.fn(),
  }),
}));

describe('PlayView', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(PlayView, {
      global: {
        stubs: { Button: true, Icon: true, Card: true, ScoreDisplay: true, ResultPanel: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
