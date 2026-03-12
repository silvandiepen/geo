import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ResultPanel from './ResultPanel.vue';

describe('ResultPanel', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(ResultPanel, {
      props: { result: { correct: true, score: 100, details: 'Correct!' } },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('applies success class when correct', () => {
    const wrapper = shallowMount(ResultPanel, {
      props: { result: { correct: true, score: 100, details: 'Correct!' } },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.classes()).toContain('result-panel--success');
  });

  it('applies error class when incorrect', () => {
    const wrapper = shallowMount(ResultPanel, {
      props: { result: { correct: false, score: 0, details: 'Wrong!' } },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.classes()).toContain('result-panel--error');
  });
});
