<template>
  <div class="container blitz-play">
    <div v-if="loading">
      <Icon name="refresh-m" class="blitz-play__spin" />
    </div>

    <template v-else-if="targetCountry && gameState !== 'idle'">
      <div class="blitz-play__header">
        <ScoreDisplay :score="score" :label="{ score: t('common.score'), correct: t('common.correct_count'), streak: t('common.streak') }" />
        <GameTimer
          :total-seconds="60"
          :running="timerRunning"
          :warning-threshold="15"
          @expire="endRound"
        />
      </div>

      <Card class="blitz-play__card">
        <h2 class="blitz-play__question">
          {{ t('games.borderBlitz.question', { country: targetCountry.name }) }}
        </h2>
        <p class="blitz-play__progress">{{ t('games.borderBlitz.found', { n: foundNeighbors.length, total: neighbors.length }) }}</p>

        <div class="blitz-play__found">
          <span
            v-for="code in foundNeighbors"
            :key="code"
            class="badge badge--success"
          >
            {{ neighbors.find(n => n.code === code)?.name }}
            <Icon name="check-m" />
          </span>
          <span
            v-for="i in (neighbors.length - foundNeighbors.length)"
            :key="`empty-${i}`"
            class="badge badge--default"
          >
            ?
          </span>
        </div>

        <div v-if="gameState === 'playing'" class="blitz-play__input">
          <Input
            v-model="inputValue"
            :placeholder="t('games.borderBlitz.typeNeighbor')"
            @keydown.enter="submitGuess(inputValue)"
          />
          <Button variant="primary" @click="submitGuess(inputValue)">
            {{ t('common.submit') }}
          </Button>
        </div>

        <div v-if="wrongGuesses.length > 0" class="blitz-play__wrong">
          <span v-for="w in wrongGuesses" :key="w" class="badge badge--danger">{{ w }}</span>
        </div>
      </Card>

      <div v-if="gameState === 'ended'" :class="['alert', allFound ? 'alert--success' : 'alert--warning']">
        {{ allFound ? t('games.borderBlitz.allFound') : t('games.borderBlitz.timeUp') }}
      </div>
      <Button v-if="gameState === 'ended'" variant="primary" @click="newRound">
        {{ t('common.next') }}
      </Button>
    </template>

    <div v-else class="blitz-play__start">
      <Button variant="primary" size="lg" @click="newRound">
        <Icon name="play-m" />{{ t('common.play') }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Input } from '@geo/ui';
import { ScoreDisplay, GameTimer } from '@geo/game-ui';
import { useBorderBlitz } from '../../composables/useBorderBlitz';

const { t } = useI18n();
const {
  targetCountry, neighbors, foundNeighbors, wrongGuesses, inputValue,
  score, loading, timerRunning, gameState, allFound,
  newRound, submitGuess, endRound,
} = useBorderBlitz();
</script>

<style scoped lang="scss">
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.blitz-play {
  $b: &;

  padding: var(--space-l);

  &__spin {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    display: block;
    margin: var(--space-xl) auto;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-l);
    flex-wrap: wrap;
    gap: var(--space-m);
  }

  &__card { margin-bottom: var(--space-l); }

  &__question {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  &__progress {
    color: var(--color-muted);
    margin-bottom: var(--space-m);
  }

  &__found {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: var(--space-m);
  }

  &__input {
    display: flex;
    gap: 10px;
    margin-bottom: var(--space-m);
    align-items: flex-end;
  }

  &__wrong {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &__start {
    display: flex;
    justify-content: center;
    margin-top: var(--space-xl);
  }
}

.alert {
  padding: var(--space-m) var(--space-l);
  border-radius: var(--border-radius);
  font-weight: 500;
  margin-bottom: var(--space-m);

  &--success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  &--warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: var(--border-radius-s);
  font-size: 0.8rem;
  font-weight: 600;

  &--default { background: var(--color-surface); color: var(--color-foreground); border: 1px solid var(--color-border); }
  &--success { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  &--danger  { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
}
</style>
