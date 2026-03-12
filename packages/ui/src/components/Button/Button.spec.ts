import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: { common: { loading: { default: 'Loading...' } } } } });

describe('Button', () => {
  it('renders a button element by default', () => {
    const wrapper = mount(Button, { global: { plugins: [i18n] }, slots: { default: 'Click me' } });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('applies variant class', () => {
    const wrapper = mount(Button, { global: { plugins: [i18n] }, props: { variant: 'ghost' }, slots: { default: 'Click' } });
    expect(wrapper.classes().join(' ')).toContain('ghost');
  });

  it('emits click event', async () => {
    const wrapper = mount(Button, { global: { plugins: [i18n] }, slots: { default: 'Click' } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
