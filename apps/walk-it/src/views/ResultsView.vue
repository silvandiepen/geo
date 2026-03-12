<template>
  <Container max="small" class="walk-results">
    <Section>
      <div class="walk-results__hero">
        <Icon name="trophy" class="walk-results__icon" />
        <h1>{{ t('common.gameOver') }}</h1>
      </div>
      <ScoreDisplay :score="score" :label="{ score: t('common.score'), correct: t('common.correct_count'), streak: t('common.streak') }" />
      <div class="walk-results__actions">
        <Button variant="primary" @click="router.push('/play')">
          <Icon name="refresh-m" />
          {{ t('common.playAgain') }}
        </Button>
        <Button variant="ghost" @click="router.push('/')">
          <Icon name="home-m" />
          {{ t('common.backToHome') }}
        </Button>
      </div>
    </Section>
  </Container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Container, Section } from '@sil/ui';
import { ScoreDisplay } from '@geo/game-ui';
import { useWalkIt } from '../composables/useWalkIt';

const router = useRouter();
const { t } = useI18n();
const { score } = useWalkIt();
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;
.walk-results {
  &__hero { text-align: center; padding: $spacing-xl 0 $spacing-lg; }
  &__icon { font-size: 4rem; color: #f59e0b; display: block; margin: 0 auto $spacing-md; }
  h1 { font-size: 2rem; font-weight: 800; }
  &__actions { display: flex; gap: $spacing-md; flex-wrap: wrap; margin-top: $spacing-xl; }
}
</style>
