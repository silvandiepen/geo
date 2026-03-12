import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import MultipleChoice from './MultipleChoice.vue';

const options = [
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
];

describe('MultipleChoice', () => {
  it('mounts without errors', () => {
    const wrapper = shallowMount(MultipleChoice, {
      props: { options },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders all options', () => {
    const wrapper = shallowMount(MultipleChoice, {
      props: { options },
      global: {
        stubs: { Icon: true },
      },
    });
    expect(wrapper.findAll('.mc__option').length).toBe(options.length);
  });
});
