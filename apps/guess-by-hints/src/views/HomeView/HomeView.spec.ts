import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import HomeView from './HomeView.vue';

vi.mock('@geo/i18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('HomeView', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        stubs: { Button: true, Icon: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
