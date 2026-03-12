import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ScoreDisplay from './ScoreDisplay.vue';

const score = { total: 300, correct: 3, rounds: 5, streak: 2 };

describe('ScoreDisplay', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(ScoreDisplay, {
      props: { score },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the total score', () => {
    const wrapper = shallowMount(ScoreDisplay, {
      props: { score },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.text()).toContain('300');
  });
});
