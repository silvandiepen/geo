<template>
  <Container max="medium" class="hints-play">
    <div v-if="loading"><Icon name="refresh-m" class="hints-play__spin" /></div>

    <template v-else-if="currentRound">
      <div class="hints-play__header">
        <ScoreDisplay :score="score" :label="{ score: t('common.score'), correct: t('common.correct_count'), streak: t('common.streak') }" />
        <Badge :variant="isOver && !won ? 'danger' : 'default'">
          {{ t('games.guessByHints.guessesLeft', { n: guessesLeft }) }}
        </Badge>
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
        <Alert variant="success">🎉 Correct! It was {{ currentRound.targetCountry.name }}!</Alert>
        <Button variant="primary" @click="newRound">{{ t('common.next') }}</Button>
      </div>

      <div v-else-if="isOver" class="hints-play__lost">
        <Alert variant="error">❌ The answer was {{ currentRound.targetCountry.name }}</Alert>
        <Button variant="primary" @click="newRound">{{ t('common.next') }}</Button>
      </div>

      <div v-else class="hints-play__input">
        <SearchInput
          v-model="guessInput"
          :placeholder="t('games.guessByHints.guess')"
          @keydown.enter="submitGuess(guessInput)"
        />
        <Button variant="primary" :disabled="!guessInput.trim()" @click="submitGuess(guessInput)">
          {{ t('common.submit') }}
        </Button>

        <div class="hints-play__guesses">
          <Badge v-for="g in guesses" :key="g" variant="danger">{{ g }}</Badge>
        </div>
      </div>
    </template>
  </Container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Container, Badge, Alert, SearchInput } from '@sil/ui';
import { ScoreDisplay } from '@geo/game-ui';
import { useGuessByHints } from '../composables/useGuessByHints';

const { t } = useI18n();
const {
  currentRound, guesses, won, score, loading, guessInput,
  revealedHints, guessesLeft, isOver, newRound, submitGuess,
} = useGuessByHints();

onMounted(newRound);
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;
.hints-play {
  padding: $spacing-lg;
  &__spin { animation: spin 1s linear infinite; font-size: 2rem; display: block; margin: $spacing-xl auto; }
  @keyframes spin { to { transform: rotate(360deg); } }
  &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: $spacing-lg; }
  &__hints { display: flex; flex-direction: column; gap: 10px; margin-bottom: $spacing-lg; }
  &__hint-inner { display: flex; align-items: flex-start; gap: $spacing-md; }
  &__hint-icon { color: $color-primary; flex-shrink: 0; font-size: 1.25rem; margin-top: 2px; }
  &__hint-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; color: $color-text-muted; margin-bottom: 2px; }
  &__hint-value { font-size: 1.1rem; font-weight: 700; }
  &__won, &__lost { display: flex; flex-direction: column; gap: $spacing-md; }
  &__input { display: flex; flex-direction: column; gap: $spacing-md; }
  &__guesses { display: flex; flex-wrap: wrap; gap: 8px; }
}
</style>
