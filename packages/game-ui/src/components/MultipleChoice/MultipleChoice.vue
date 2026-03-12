<template>
  <div class="mc">
    <button
      v-for="option in options"
      :key="option.value"
      :class="['mc__option', optionClass(option.value)]"
      :disabled="answered"
      @click="select(option.value)"
    >
      <Icon v-if="option.icon" :name="option.icon" class="mc__option-icon" />
      <span>{{ option.label }}</span>
      <Icon v-if="answered && option.value === correctValue" name="check-m" class="mc__option-check" />
      <Icon v-if="answered && option.value === selected && option.value !== correctValue" name="close-m" class="mc__option-close" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@geo/ui';

interface Option {
  value: string;
  label: string;
  icon?: string;
}

const props = defineProps<{
  options: Option[];
  correctValue?: string;
  answered?: boolean;
}>();

const emit = defineEmits<{
  select: [value: string];
}>();

const selected = ref<string | null>(null);

function select(value: string): void {
  if (props.answered) return;
  selected.value = value;
  emit('select', value);
}

function optionClass(value: string): string {
  if (!props.answered) {
    return selected.value === value ? 'mc__option--selected' : '';
  }
  if (value === props.correctValue) return 'mc__option--correct';
  if (selected.value === value) return 'mc__option--wrong';
  return '';
}
</script>

<style scoped lang="scss">
.mc {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  &__option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    border: 2px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: var(--transition-fast);
    text-align: left;

    &:hover:not(:disabled) {
      border-color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
    }

    &--selected {
      border-color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
    }

    &--correct {
      border-color: var(--color-success);
      background: #f0fdf4;
      color: #15803d;
    }

    &--wrong {
      border-color: var(--color-error);
      background: #fef2f2;
      color: #b91c1c;
    }

    &-icon,
    &-check,
    &-close {
      flex-shrink: 0;
    }
  }
}
</style>
