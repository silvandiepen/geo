<template>
  <div :class="['result-panel', result.correct ? 'result-panel--correct' : 'result-panel--wrong']">
    <div class="result-panel__icon">{{ result.correct ? '✅' : '❌' }}</div>
    <div class="result-panel__details">{{ result.details }}</div>
    <div class="result-panel__score">+{{ result.score }} pts</div>
  </div>
</template>

<script setup lang="ts">
import type { Result } from '@geo/types';

defineProps<{
  result: Result;
}>();
</script>

<style scoped lang="scss">
.result-panel {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 10px;
  font-weight: 500;

  &--correct {
    background: #f0fdf4;
    border: 2px solid #22c55e;
    color: #15803d;
  }

  &--wrong {
    background: #fef2f2;
    border: 2px solid #ef4444;
    color: #b91c1c;
  }

  &__icon { font-size: 1.5rem; }
  &__details { flex: 1; }
  &__score { font-weight: 700; font-size: 1.1rem; }
}
</style>
