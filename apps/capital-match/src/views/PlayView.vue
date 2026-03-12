<template>
  <Container max="medium" class="capital-play">
    <div v-if="loading"><Icon name="refresh-m" class="capital-play__spin" /></div>

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
  </Container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Container } from '@sil/ui';
import { MultipleChoice, ScoreDisplay, ResultPanel } from '@geo/game-ui';
import { useCapitalMatch } from '../composables/useCapitalMatch';

const { t } = useI18n();
const {
  currentRound, answered, selectedAnswer, score, loading, mode,
  newRound, submitAnswer,
} = useCapitalMatch();

onMounted(newRound);
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;
.capital-play {
  padding: $spacing-lg;
  &__spin { animation: spin 1s linear infinite; font-size: 2rem; display: block; margin: $spacing-xl auto; }
  @keyframes spin { to { transform: rotate(360deg); } }
  &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: $spacing-lg; flex-wrap: wrap; gap: $spacing-md; }
  &__mode { display: flex; gap: 8px; }
  &__card { margin-bottom: $spacing-lg; }
  &__question { font-size: 1.2rem; font-weight: 700; text-align: center; margin-bottom: $spacing-lg; }
  &__next { display: flex; justify-content: center; margin-top: $spacing-md; }
}
</style>
