import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import HomeView from './HomeView.vue';

vi.mock('@geo/i18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}));

vi.mock('@geo/auth', () => ({
  useAuth: () => ({
    user: ref(null),
    isLoggedIn: ref(false),
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    error: ref(null),
    loading: ref(false),
  }),
}));

vi.mock('../../models/game-entry', () => ({
  GAMES: [],
}));

describe('HomeView', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        stubs: { Icon: true, AuthModal: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
