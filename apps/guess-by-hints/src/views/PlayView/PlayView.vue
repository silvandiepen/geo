<template>
  <div class="container hints-play">
    <div v-if="loading">
      <Icon name="refresh-m" class="hints-play__spin" />
    </div>

    <template v-else-if="currentRound">
      <div class="hints-play__header">
        <ScoreDisplay :score="score" :label="{ score: t('common.score'), correct: t('common.correct_count'), streak: t('common.streak') }" />
        <span :class="['badge', isOver && !won ? 'badge--danger' : 'badge--default']">
          {{ t('games.guessByHints.guessesLeft', { n: guessesLeft }) }}
        </span>
      </div>

      <div class="hints-play__hints">
        <Card
          v-for="(hint, i) in revealedHints"
          :key="i"
          class="hints-play__hint"
        >
          <div class="hints-play__hint-inner">
            <Icon name="lightbulb-m" class="hints-play__hint-icon" />
            <div>
              <p class="hints-play__hint-label">{{ hint.label }}</p>
              <p class="hints-play__hint-value">{{ hint.value }}</p>
            </div>
          </div>
        </Card>
      </div>

      <div v-if="won" class="hints-play__won">
        <div class="alert alert--success">🎉 Correct! It was {{ currentRound.targetCountry.name }}!</div>
        <Button variant="primary" @click="newRound">{{ t('common.next') }}</Button>
      </div>

      <div v-else-if="isOver" class="hints-play__lost">
        <div class="alert alert--error">❌ The answer was {{ currentRound.targetCountry.name }}</div>
        <Button variant="primary" @click="newRound">{{ t('common.next') }}</Button>
      </div>

      <div v-else class="hints-play__input">
        <Input
          v-model="guessInput"
          :placeholder="t('games.guessByHints.guess')"
          @keydown.enter="submitGuess(guessInput)"
        />
        <Button variant="primary" :disabled="!guessInput.trim()" @click="submitGuess(guessInput)">
          {{ t('common.submit') }}
        </Button>

        <div class="hints-play__guesses">
          <span v-for="g in guesses" :key="g" class="badge badge--danger">{{ g }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Input } from '@geo/ui';
import { ScoreDisplay } from '@geo/game-ui';
import { useGuessByHints } from '../../composables/useGuessByHints';

const { t } = useI18n();
const {
  currentRound, guesses, won, score, loading, guessInput,
  revealedHints, guessesLeft, isOver, newRound, submitGuess,
} = useGuessByHints();

onMounted(newRound);
</script>

<style scoped lang="scss">
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.hints-play {
  $b: &;

  padding: var(--space-l);

  &__spin {
    animation: spin 1s linear infinite;
    font-size: var(--font-size-2xl);
    display: block;
    margin: var(--space-xl) auto;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-l);
  }

  &__hints {
    display: flex;
    flex-direction: column;
    gap: calc(var(--space-s) * 1.25);
    margin-bottom: var(--space-l);
  }

  &__hint-inner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-m);
  }

  &__hint-icon {
    color: var(--color-primary);
    flex-shrink: 0;
    font-size: var(--font-size-l);
    margin-top: 2px;
  }

  &__hint-label {
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: color-mix(in srgb, var(--color-foreground), transparent 50%);
    margin-bottom: 2px;
  }

  &__hint-value {
    font-size: var(--font-size-l);
    font-weight: 700;
  }

  &__won,
  &__lost {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  &__input {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  &__guesses {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-s);
  }
}

.alert {
  padding: var(--space-m) var(--space-l);
  border-radius: var(--border-radius);
  font-weight: 500;

  &--success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  &--error   { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
}

.badge {
  display: inline-block;
  padding: 2px var(--space-s);
  border-radius: var(--border-radius-s);
  font-size: var(--font-size-xs);
  font-weight: 600;

  &--default { background: color-mix(in srgb, var(--color-background), var(--color-foreground) 4%); color: var(--color-foreground); border: 1px solid var(--color-border); }
  &--danger  { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
}
</style>
