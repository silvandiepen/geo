<template>
  <div class="score-display">
    <div class="score-display__item">
      <span class="score-display__label">Score</span>
      <span class="score-display__value">{{ score.total }}</span>
    </div>
    <div class="score-display__item">
      <span class="score-display__label">Correct</span>
      <span class="score-display__value score-display__value--green">{{ score.correct }}/{{ score.rounds }}</span>
    </div>
    <div class="score-display__item">
      <span class="score-display__label">Streak</span>
      <span class="score-display__value score-display__value--orange">🔥 {{ score.streak }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Score } from '@geo/types';

defineProps<{
  score: Score;
}>();
</script>

<style scoped lang="scss">
.score-display {
  display: flex;
  gap: 24px;
  align-items: center;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  &__label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    font-weight: 600;
  }

  &__value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;

    &--green { color: #22c55e; }
    &--orange { color: #f97316; }
  }
}
</style>
