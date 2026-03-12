import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Toast from './Toast.vue';

describe('Toast', () => {
  it('renders', () => {
    const wrapper = mount(Toast);
    expect(wrapper.exists()).toBe(true);
  });
});
