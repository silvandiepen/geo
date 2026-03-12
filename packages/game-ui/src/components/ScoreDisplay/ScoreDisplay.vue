<template>
  <div class="score-display">
    <div class="score-display__item">
      <Icon name="trophy" class="score-display__icon score-display__icon--gold" />
      <div class="score-display__info">
        <span class="score-display__label">{{ label.score }}</span>
        <span class="score-display__value">{{ score.total }}</span>
      </div>
    </div>
    <div class="score-display__item">
      <Icon name="check-m" class="score-display__icon score-display__icon--green" />
      <div class="score-display__info">
        <span class="score-display__label">{{ label.correct }}</span>
        <span class="score-display__value">{{ score.correct }}/{{ score.rounds }}</span>
      </div>
    </div>
    <div class="score-display__item">
      <Icon name="star-m" class="score-display__icon score-display__icon--orange" />
      <div class="score-display__info">
        <span class="score-display__label">{{ label.streak }}</span>
        <span class="score-display__value">{{ score.streak }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@geo/ui';
import type { Score } from '@geo/types';

const props = defineProps<{
  score: Score;
  label?: { score: string; correct: string; streak: string };
}>();

const label = props.label ?? { score: 'Score', correct: 'Correct', streak: 'Streak' };
</script>

<style scoped lang="scss">
.score-display {
  display: flex;
  gap: calc(var(--space-m) * 1.25);
  align-items: center;
  flex-wrap: wrap;

  &__item {
    display: flex;
    align-items: center;
    gap: var(--space-s);
  }

  &__icon {
    font-size: var(--font-size-xl);

    &--gold   { color: #f59e0b; }
    &--green  { color: #22c55e; }
    &--orange { color: #f97316; }
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: color-mix(in srgb, var(--color-foreground), transparent 50%);
    font-weight: 600;
  }

  &__value {
    font-size: var(--font-size-l);
    font-weight: 700;
    color: var(--color-foreground);
  }
}
</style>
