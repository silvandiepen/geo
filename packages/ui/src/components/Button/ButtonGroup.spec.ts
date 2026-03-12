import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ButtonGroup from './ButtonGroup.vue';

describe('ButtonGroup', () => {
  it('mounts without errors', () => {
    const wrapper = mount(ButtonGroup, {
      slots: { default: '<button>One</button>' },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('applies align class', () => {
    const wrapper = mount(ButtonGroup, {
      props: { align: 'center' },
      slots: { default: '<button>One</button>' },
    });
    expect(wrapper.classes().join(' ')).toContain('center');
  });
});
