<template>
  <input
    v-bind="$attrs"
    :id="id"
    :class="inputClasses"
    :value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :type="type"
    @input="onInput"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBemm } from 'bemm';

defineOptions({ name: 'SilInput', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: undefined,
    disabled: false,
    id: undefined,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
}>();

const bemm = useBemm('sil-input', { return: 'string', includeBaseClass: true });

const inputClasses = computed(() =>
  bemm('', { 'is-disabled': props.disabled })
);

const onInput = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value);
const onChange = (e: Event) => emit('change', (e.target as HTMLInputElement).value);
</script>

<style>
.sil-input {
  width: 100%;
  padding: var(--space-s, 8px) var(--space-m, 16px);
  border: 1px solid color-mix(in srgb, var(--color-foreground), transparent 75%);
  border-radius: var(--border-radius, 8px);
  background: var(--color-background);
  color: var(--color-foreground);
  font-size: var(--font-size-m, 1rem);
  line-height: 1.5;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
  appearance: none;
}

.sil-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary), transparent 80%);
}

.sil-input--is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sil-input::placeholder {
  color: color-mix(in srgb, var(--color-foreground), transparent 50%);
}
</style>
