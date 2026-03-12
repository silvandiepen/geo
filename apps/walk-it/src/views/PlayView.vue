<template>
  <Container max="medium" class="walk-play">
    <div v-if="loading" class="walk-play__loading">
      <Icon name="refresh-m" class="walk-play__spin" />
      <p>{{ t('common.loading') }}</p>
    </div>

    <template v-else-if="currentRound">
      <div class="walk-play__header">
        <ScoreDisplay :score="score" :label="{ score: t('common.score'), correct: t('common.correct_count'), streak: t('common.streak') }" />
        <Button variant="ghost" size="sm" @click="router.push('/')">
          <Icon name="home-m" />
        </Button>
      </div>

      <Card class="walk-play__card">
        <div class="walk-play__mission">
          <div class="walk-play__country walk-play__country--start">
            <Icon name="map-pin-m" />
            <span>{{ currentRound.metadata.startCountryName }}</span>
          </div>
          <Icon name="arrow-right-m" class="walk-play__arrow" />
          <div class="walk-play__country walk-play__country--target">
            <Icon name="flag-m" />
            <span>{{ currentRound.metadata.targetCountryName }}</span>
          </div>
        </div>

        <div class="walk-play__progress">
          <p class="walk-play__current">
            <Icon name="map-m" />
            You are in: <strong>{{ getCountryName(currentCountry) }}</strong>
          </p>
          <p class="walk-play__steps">Steps: {{ currentPath.length - 1 }}</p>
        </div>

        <div v-if="isAtTarget" class="walk-play__reached">
          <Alert variant="success">🎉 You reached {{ currentRound.metadata.targetCountryName }}!</Alert>
          <Button variant="primary" @click="handleFinish">
            {{ t('common.next') }}
          </Button>
        </div>

        <template v-else>
          <p class="walk-play__neighbors-label">{{ t('games.walkIt.selectNeighbor') }}</p>
          <div class="walk-play__neighbors">
            <Button
              v-for="neighbor in neighbors"
              :key="neighbor.code"
              variant="secondary"
              @click="handleStep(neighbor.code)"
            >
              {{ neighbor.name }}
            </Button>
          </div>
        </template>
      </Card>

      <ResultPanel v-if="lastResult" :result="lastResult" class="walk-play__result" />
    </template>
  </Container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Container, Alert } from '@sil/ui';
import { ScoreDisplay, ResultPanel } from '@geo/game-ui';
import { useWalkIt } from '../composables/useWalkIt';

const router = useRouter();
const { t } = useI18n();
const {
  currentRound, currentPath, currentCountry, neighbors, score, lastResult,
  loading, isAtTarget, getCountryName, newRound, step, finishRound,
} = useWalkIt();

onMounted(newRound);

async function handleStep(code: string) {
  await step(code);
}

function handleFinish() {
  finishRound();
  setTimeout(() => newRound(), 1500);
}
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;
.walk-play {
  padding: $spacing-lg;

  &__loading { text-align: center; padding: $spacing-xl; }
  &__spin { animation: spin 1s linear infinite; font-size: 2rem; }
  @keyframes spin { to { transform: rotate(360deg); } }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;
  }

  &__card { margin-bottom: $spacing-lg; }

  &__mission {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-bottom: $spacing-lg;
    flex-wrap: wrap;
  }

  &__country {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;

    &--start { background: #ecfdf5; color: $color-primary; }
    &--target { background: #eff6ff; color: #3b82f6; }
  }

  &__arrow { color: $color-text-muted; font-size: 1.5rem; }

  &__progress {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-md;
    font-size: 0.95rem;
  }

  &__current {
    display: flex;
    align-items: center;
    gap: 6px;
    strong { color: $color-primary; }
  }

  &__steps { font-weight: 600; }

  &__reached { display: flex; flex-direction: column; gap: $spacing-md; align-items: flex-start; }

  &__neighbors-label { font-size: 0.9rem; color: $color-text-muted; margin-bottom: $spacing-md; }

  &__neighbors {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__result { margin-top: $spacing-md; }
}
</style>
