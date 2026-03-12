<template>
  <div class="container flag-play">
    <div v-if="loading" class="flag-play__loading">
      <Icon name="refresh-m" class="flag-play__spin" />
    </div>

    <template v-else-if="currentRound">
      <div class="flag-play__header">
        <ScoreDisplay :score="score" :label="{ score: t('common.score'), correct: t('common.correct_count'), streak: t('common.streak') }" />
        <div class="flag-play__filters">
          <label class="flag-play__filter-label">{{ t('games.guessTheFlag.filterByContinent') }}</label>
          <select v-model="continentFilter" class="flag-play__select" @change="newRound">
            <option v-for="opt in continentOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card } from '@geo/ui';
import { MultipleChoice, ScoreDisplay } from '@geo/game-ui';
import { useGuessTheFlag } from '../../composables/useGuessTheFlag';

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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.flag-play {
  $b: &;

  padding: var(--space-l);

  &__loading {
    text-align: center;
    padding: var(--space-xl);
  }

  &__spin {
    animation: spin 1s linear infinite;
    font-size: var(--font-size-xxl);
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-l);
    flex-wrap: wrap;
    gap: var(--space-m);
  }

  &__filters {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &__filter-label {
    font-size: var(--font-size-xs);
    color: color-mix(in srgb, var(--color-foreground), transparent 50%);
    font-weight: 600;
  }

  &__select {
    padding: calc(var(--space-xs) * 1.5) calc(var(--space-s) * 1.25);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: color-mix(in srgb, var(--color-background), var(--color-foreground) 4%);
    font-size: var(--font-size-s);
    cursor: pointer;

    &:focus { outline: 2px solid var(--color-primary); }
  }

  &__card { margin-bottom: var(--space-l); }

  &__question {
    text-align: center;
    font-size: var(--font-size-l);
    font-weight: 600;
    margin-bottom: var(--space-l);
    color: color-mix(in srgb, var(--color-foreground), transparent 50%);
  }

  &__flag {
    display: flex;
    justify-content: center;
    margin-bottom: var(--space-l);

    &-img {
      width: 240px;
      height: 160px;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: var(--shadow-m);
      border: 1px solid var(--color-border);
    }

    &-empty {
      width: 240px;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: color-mix(in srgb, var(--color-foreground), transparent 95%);
      border-radius: 8px;
      font-size: calc(var(--font-size-xxl) * 1.25);
      color: color-mix(in srgb, var(--color-foreground), transparent 50%);
    }
  }

  &__next {
    display: flex;
    justify-content: center;
  }
}
</style>
