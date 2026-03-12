import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './Input.vue';

describe('Input', () => {
  it('renders an input element', () => {
    const wrapper = mount(Input, { props: { modelValue: '' } });
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input, { props: { modelValue: '' } });
    await wrapper.find('input').setValue('hello');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello']);
  });

  it('is disabled when disabled prop is set', () => {
    const wrapper = mount(Input, { props: { modelValue: '', disabled: true } });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });
});
