import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Popup from './Popup.vue';

describe('Popup', () => {
  it('renders', () => {
    const wrapper = mount(Popup);
    expect(wrapper.exists()).toBe(true);
  });
});
