import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CardGroup from './CardGroup.vue';

describe('CardGroup', () => {
  it('mounts without errors', () => {
    const wrapper = mount(CardGroup, {
      slots: { default: '<div>Card</div>' },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('applies layout class', () => {
    const wrapper = mount(CardGroup, {
      props: { layout: 'horizontal' },
      slots: { default: '<div>Card</div>' },
    });
    expect(wrapper.classes().join(' ')).toContain('horizontal');
  });
});
