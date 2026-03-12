import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PopupSlot from './PopupSlot.vue';

describe('PopupSlot', () => {
  it('mounts without errors', () => {
    const wrapper = mount(PopupSlot, {
      slots: { default: '<span>Content</span>' },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders slotted content', () => {
    const wrapper = mount(PopupSlot, {
      slots: { default: '<span>Hello</span>' },
    });
    expect(wrapper.text()).toContain('Hello');
  });
});
