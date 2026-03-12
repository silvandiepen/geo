import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';

describe('Tooltip', () => {
  it('renders tooltip text', () => {
    const wrapper = mount(Tooltip, { props: { text: 'Hello', open: true } });
    expect(wrapper.text()).toContain('Hello');
  });

  it('is hidden when disabled', () => {
    const wrapper = mount(Tooltip, { props: { text: 'Hello', disabled: true } });
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
  });
});
