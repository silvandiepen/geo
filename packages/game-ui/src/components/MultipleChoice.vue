<template>
  <div class="mc">
    <button
      v-for="option in options"
      :key="option.value"
      :class="['mc__option', optionClass(option.value)]"
      :disabled="answered"
      @click="select(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Option {
  value: string;
  label: string;
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
  if (!props.answered || selected.value !== value) {
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
    padding: 14px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    background: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.15s;
    text-align: left;

    &:hover:not(:disabled) {
      border-color: #3b82f6;
      background: #eff6ff;
    }

    &--selected {
      border-color: #3b82f6;
      background: #eff6ff;
    }

    &--correct {
      border-color: #22c55e;
      background: #f0fdf4;
      color: #15803d;
    }

    &--wrong {
      border-color: #ef4444;
      background: #fef2f2;
      color: #b91c1c;
    }
  }
}
</style>
