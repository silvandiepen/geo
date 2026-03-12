import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PopupWrapper from './PopupWrapper.vue';

describe('PopupWrapper', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(PopupWrapper, {
      slots: { trigger: '<button>Open</button>' },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the trigger slot', () => {
    const wrapper = shallowMount(PopupWrapper, {
      slots: { trigger: '<button>Open</button>' },
    });
    expect(wrapper.find('.popup-trigger').exists()).toBe(true);
  });
});
