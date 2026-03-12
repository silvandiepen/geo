import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Icon from './Icon.vue';

describe('Icon', () => {
  it('renders a span with icon class', () => {
    const wrapper = mount(Icon, { props: { name: 'action/check' } });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.classes().join(' ')).toContain('sil-icon');
  });

  it('sets aria-label from name prop', () => {
    const wrapper = mount(Icon, { props: { name: 'maps/globe' } });
    expect(wrapper.attributes('aria-label')).toBe('maps/globe');
  });
});
