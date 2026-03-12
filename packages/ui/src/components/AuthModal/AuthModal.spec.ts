import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import AuthModal from './AuthModal.vue';

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: {} } });

describe('AuthModal', () => {
  it('does not render when closed', () => {
    const wrapper = shallowMount(AuthModal, {
      props: { open: false },
      global: {
        plugins: [i18n],
        stubs: { Icon: true, Button: true, Field: true, Input: true },
      },
    });
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('renders when open', () => {
    const wrapper = shallowMount(AuthModal, {
      props: { open: true },
      global: {
        plugins: [i18n],
        stubs: { Icon: true, Button: true, Field: true, Input: true },
      },
    });
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
  });
});
