import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GameTimer from './GameTimer.vue';

describe('GameTimer', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(GameTimer, {
      props: { totalSeconds: 60, running: false },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('displays seconds when under a minute', () => {
    const wrapper = shallowMount(GameTimer, {
      props: { totalSeconds: 30, running: false },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.find('.game-timer__value').text()).toBe('30s');
  });
});
