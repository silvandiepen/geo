import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Field from './Field.vue';

describe('Field', () => {
  it('renders label', () => {
    const wrapper = mount(Field, { props: { label: 'Name' } });
    expect(wrapper.text()).toContain('Name');
  });

  it('shows error message', () => {
    const wrapper = mount(Field, { props: { error: 'Required field' } });
    expect(wrapper.text()).toContain('Required field');
  });
});
