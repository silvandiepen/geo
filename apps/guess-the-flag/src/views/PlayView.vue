<template>
  <Container max="medium" class="flag-play">
    <div v-if="loading" class="flag-play__loading">
      <Icon name="refresh-m" class="flag-play__spin" />
    </div>

    <template v-else-if="currentRound">
      <div class="flag-play__header">
        <ScoreDisplay :score="score" :label="{ score: t('common.score'), correct: t('common.correct_count'), streak: t('common.streak') }" />
        <div class="flag-play__filters">
          <SelectInput
            v-model="continentFilter"
            :options="continentOptions"
            :label="t('games.guessTheFlag.filterByContinent')"
            @change="newRound"
          />
        </div>
      </div>

      <Card class="flag-play__card">
        <p class="flag-play__question">{{ t('games.guessTheFlag.question') }}</p>
        <div class="flag-play__flag">
          <img v-if="currentRound.flagUrl" :src="currentRound.flagUrl" alt="Flag" class="flag-play__flag-img" />
          <div v-else class="flag-play__flag-empty">
            <Icon name="flag-m" />
          </div>
        </div>

        <MultipleChoice
          :options="currentRound.options.map(c => ({ value: c.code, label: c.name }))"
          :correct-value="currentRound.targetCountry.code"
          :answered="answered"
          @select="submitAnswer"
        />
      </Card>

      <div v-if="answered" class="flag-play__next">
        <Button variant="primary" @click="newRound">
          {{ t('common.next') }}
          <Icon name="arrow-right-m" />
        </Button>
      </div>
    </template>
  </Container>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Container, SelectInput } from '@sil/ui';
import { MultipleChoice, ScoreDisplay } from '@geo/game-ui';
import { useGuessTheFlag } from '../composables/useGuessTheFlag';

const { t } = useI18n();
const {
  currentRound, answered, score, loading, continentFilter,
  newRound, submitAnswer,
} = useGuessTheFlag();

const CONTINENTS = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica'];
const continentOptions = computed(() => CONTINENTS.map(c => ({ value: c, label: c })));

onMounted(newRound);
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;
.flag-play {
  padding: $spacing-lg;

  &__loading { text-align: center; padding: $spacing-xl; }
  &__spin { animation: spin 1s linear infinite; font-size: 2rem; }
  @keyframes spin { to { transform: rotate(360deg); } }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $spacing-lg;
    flex-wrap: wrap;
    gap: $spacing-md;
  }

  &__card { margin-bottom: $spacing-lg; }

  &__question {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: $spacing-lg;
    color: $color-text-muted;
  }

  &__flag {
    display: flex;
    justify-content: center;
    margin-bottom: $spacing-lg;

    &-img {
      width: 240px;
      height: 160px;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: $shadow-md;
      border: 1px solid $color-border;
    }

    &-empty {
      width: 240px;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f5f9;
      border-radius: 8px;
      font-size: 3rem;
      color: $color-text-muted;
    }
  }

  &__next {
    display: flex;
    justify-content: center;
  }
}
</style>
