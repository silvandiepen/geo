<template>
  <div :class="['result-panel', result.correct ? 'result-panel--success' : 'result-panel--error']">
    <div class="result-panel__content">
      <Icon :name="result.correct ? 'check-m' : 'close-m'" class="result-panel__icon" />
      <span class="result-panel__details">{{ result.details }}</span>
      <span class="result-panel__score">+{{ result.score }} pts</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@geo/ui';
import type { Result } from '@geo/types';

defineProps<{
  result: Result;
}>();
</script>

<style scoped lang="scss">
.result-panel {
  padding: var(--space-m) var(--space-l);
  border-radius: var(--border-radius);
  font-weight: 500;

  &--success {
    background: #f0fdf4;
    color: #15803d;
    border: 1px solid #bbf7d0;
  }

  &--error {
    background: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: calc(var(--space-s) * 1.5);
  }

  &__icon {
    flex-shrink: 0;
    font-size: var(--font-size-l);
  }

  &__details {
    flex: 1;
    font-weight: 500;
  }

  &__score {
    flex-shrink: 0;
    font-weight: 700;
    font-size: var(--font-size-s);
    padding: var(--space-xs) var(--space-s);
    border-radius: var(--border-radius-s);
    background: color-mix(in srgb, currentColor 15%, transparent);
  }
}
</style>
