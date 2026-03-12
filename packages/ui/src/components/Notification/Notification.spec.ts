import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Notification from './Notification.vue';

describe('Notification', () => {
  it('renders message', () => {
    const wrapper = mount(Notification, { props: { message: 'Hello', type: 'info' } });
    expect(wrapper.text()).toContain('Hello');
  });
});
