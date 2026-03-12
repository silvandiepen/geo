<template>
  <Container max="medium" class="blitz-play">
    <div v-if="loading"><Icon name="refresh-m" class="blitz-play__spin" /></div>

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
          <Badge
            v-for="code in foundNeighbors"
            :key="code"
            variant="success"
          >
            {{ neighbors.find(n => n.code === code)?.name }}
            <Icon name="check-m" />
          </Badge>
          <Badge
            v-for="i in (neighbors.length - foundNeighbors.length)"
            :key="`empty-${i}`"
            variant="default"
          >
            ?
          </Badge>
        </div>

        <div v-if="gameState === 'playing'" class="blitz-play__input">
          <SearchInput
            v-model="inputValue"
            :placeholder="t('games.borderBlitz.typeNeighbor')"
            @keydown.enter="submitGuess(inputValue)"
          />
          <Button variant="primary" @click="submitGuess(inputValue)">
            {{ t('common.submit') }}
          </Button>
        </div>

        <div v-if="wrongGuesses.length > 0" class="blitz-play__wrong">
          <Badge v-for="w in wrongGuesses" :key="w" variant="danger">{{ w }}</Badge>
        </div>
      </Card>

      <Alert v-if="gameState === 'ended'" :variant="allFound ? 'success' : 'warning'">
        {{ allFound ? t('games.borderBlitz.allFound') : t('games.borderBlitz.timeUp') }}
      </Alert>
      <Button v-if="gameState === 'ended'" variant="primary" @click="newRound">
        {{ t('common.next') }}
      </Button>
    </template>

    <div v-else class="blitz-play__start">
      <Button variant="primary" size="lg" @click="newRound">
        <Icon name="play-m" />{{ t('common.play') }}
      </Button>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Container, Badge, Alert, SearchInput } from '@sil/ui';
import { ScoreDisplay, GameTimer } from '@geo/game-ui';
import { useBorderBlitz } from '../composables/useBorderBlitz';

const { t } = useI18n();
const {
  targetCountry, neighbors, foundNeighbors, wrongGuesses, inputValue,
  score, loading, timerRunning, gameState, allFound,
  newRound, submitGuess, endRound,
} = useBorderBlitz();
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;
.blitz-play {
  padding: $spacing-lg;
  &__spin { animation: spin 1s linear infinite; font-size: 2rem; display: block; margin: $spacing-xl auto; }
  @keyframes spin { to { transform: rotate(360deg); } }
  &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: $spacing-lg; flex-wrap: wrap; gap: $spacing-md; }
  &__card { margin-bottom: $spacing-lg; }
  &__question { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
  &__progress { color: $color-text-muted; margin-bottom: $spacing-md; }
  &__found { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: $spacing-md; }
  &__input { display: flex; gap: 10px; margin-bottom: $spacing-md; align-items: flex-end; }
  &__wrong { display: flex; flex-wrap: wrap; gap: 6px; }
  &__start { display: flex; justify-content: center; margin-top: $spacing-xl; }
}
</style>
