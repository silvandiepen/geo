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
import { Icon } from '@sil/ui';
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
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__icon {
    font-size: 1.5rem;
    &--gold { color: #f59e0b; }
    &--green { color: #22c55e; }
    &--orange { color: #f97316; }
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-muted, #6b7280);
    font-weight: 600;
  }

  &__value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text, #111827);
  }
}
</style>
