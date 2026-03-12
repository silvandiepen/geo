<template>
  <div class="container capital-play">
    <div v-if="loading">
      <Icon name="refresh-m" class="capital-play__spin" />
    </div>

    <template v-else-if="currentRound">
      <div class="capital-play__header">
        <ScoreDisplay :score="score" :label="{ score: t('common.score'), correct: t('common.correct_count'), streak: t('common.streak') }" />
        <div class="capital-play__mode">
          <Button
            :variant="mode === 'countryToCapital' ? 'primary' : 'ghost'"
            size="sm"
            @click="mode = 'countryToCapital'; newRound()"
          >Country → Capital</Button>
          <Button
            :variant="mode === 'capitalToCountry' ? 'primary' : 'ghost'"
            size="sm"
            @click="mode = 'capitalToCountry'; newRound()"
          >Capital → Country</Button>
        </div>
      </div>

      <Card class="capital-play__card">
        <p class="capital-play__question">{{ currentRound.question }}</p>

        <MultipleChoice
          :options="currentRound.options.map(o => ({ value: o, label: o }))"
          :correct-value="currentRound.correctAnswer"
          :answered="answered"
          @select="submitAnswer"
        />
      </Card>

      <ResultPanel v-if="answered" :result="{ correct: selectedAnswer === currentRound.correctAnswer, score: selectedAnswer === currentRound.correctAnswer ? 100 : 0, details: selectedAnswer === currentRound.correctAnswer ? `Correct! ${currentRound.correctAnswer}` : `Wrong! ${currentRound.correctAnswer}` }" />

      <div v-if="answered" class="capital-play__next">
        <Button variant="primary" @click="newRound">
          {{ t('common.next') }} <Icon name="arrow-right-m" />
        </Button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card } from '@geo/ui';
import { MultipleChoice, ScoreDisplay, ResultPanel } from '@geo/game-ui';
import { useCapitalMatch } from '../../composables/useCapitalMatch';

const { t } = useI18n();
const {
  currentRound, answered, selectedAnswer, score, loading, mode,
  newRound, submitAnswer,
} = useCapitalMatch();

onMounted(newRound);
</script>

<style scoped lang="scss">
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.capital-play {
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

  &__mode { display: flex; gap: 8px; }

  &__card { margin-bottom: var(--space-l); }

  &__question {
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: var(--space-l);
  }

  &__next {
    display: flex;
    justify-content: center;
    margin-top: var(--space-m);
  }
}
</style>
