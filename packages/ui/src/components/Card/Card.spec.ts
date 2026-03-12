import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from './Card.vue';

describe('Card', () => {
  it('renders with title', () => {
    const wrapper = mount(Card, { props: { title: 'Test Card' } });
    expect(wrapper.text()).toContain('Test Card');
  });

  it('renders default slot content', () => {
    const wrapper = mount(Card, { slots: { default: '<p>Content</p>' } });
    expect(wrapper.find('p').exists()).toBe(true);
  });
});
