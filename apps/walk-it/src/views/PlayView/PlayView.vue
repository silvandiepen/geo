<template>
  <div class="container walk-play">
    <div v-if="loading" class="walk-play__loading">
      <Icon name="refresh-m" class="walk-play__spin" />
      <p>{{ t('common.loading.default') }}</p>
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
          <div class="alert alert--success">🎉 You reached {{ currentRound.metadata.targetCountryName }}!</div>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card } from '@geo/ui';
import { ScoreDisplay, ResultPanel } from '@geo/game-ui';
import { useWalkIt } from '../../composables/useWalkIt';

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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.walk-play {
  $b: &;

  padding: var(--space-l);

  &__loading {
    text-align: center;
    padding: var(--space-xl);
  }

  &__spin {
    animation: spin 1s linear infinite;
    font-size: 2rem;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-l);
  }

  &__card { margin-bottom: var(--space-l); }

  &__mission {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-l);
    margin-bottom: var(--space-l);
    flex-wrap: wrap;
  }

  &__country {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: var(--border-radius-s);

    &--start  { background: color-mix(in srgb, var(--color-success), transparent 85%); color: var(--color-primary); }
    &--target { background: color-mix(in srgb, var(--color-info), transparent 85%); color: var(--color-info); }
  }

  &__arrow { color: var(--color-muted); font-size: 1.5rem; }

  &__progress {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--space-m);
    font-size: 0.95rem;
  }

  &__current {
    display: flex;
    align-items: center;
    gap: 6px;

    strong { color: var(--color-primary); }
  }

  &__steps { font-weight: 600; }

  &__reached {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    align-items: flex-start;
  }

  &__neighbors-label {
    font-size: 0.9rem;
    color: var(--color-muted);
    margin-bottom: var(--space-m);
  }

  &__neighbors {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__result { margin-top: var(--space-m); }
}

.alert {
  padding: var(--space-m) var(--space-l);
  border-radius: var(--border-radius);
  font-weight: 500;

  &--success {
    background: color-mix(in srgb, var(--color-success), transparent 85%);
    color: color-mix(in srgb, var(--color-success), var(--color-foreground) 50%);
    border: 1px solid color-mix(in srgb, var(--color-success), transparent 60%);
  }

  &--error {
    background: color-mix(in srgb, var(--color-error), transparent 85%);
    color: color-mix(in srgb, var(--color-error), var(--color-foreground) 50%);
    border: 1px solid color-mix(in srgb, var(--color-error), transparent 60%);
  }

  &--warning {
    background: color-mix(in srgb, var(--color-warning), transparent 85%);
    color: color-mix(in srgb, var(--color-warning), var(--color-foreground) 50%);
    border: 1px solid color-mix(in srgb, var(--color-warning), transparent 60%);
  }
}
</style>
