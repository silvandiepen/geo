<template>
  <Container max="small" class="walk-home">
    <Section>
      <div class="walk-home__hero">
        <Icon name="map-m" class="walk-home__icon" />
        <h1 class="walk-home__title">{{ t('games.walkIt.name') }}</h1>
        <p class="walk-home__subtitle">{{ t('games.walkIt.description') }}</p>
      </div>
      <Card class="walk-home__rules">
        <h2>How to Play</h2>
        <ul>
          <li>You are given a start country and a destination country</li>
          <li>Click neighboring countries to walk your path</li>
          <li>Reach the destination in as few steps as possible</li>
          <li>Fewer steps = higher score</li>
        </ul>
      </Card>
      <Button variant="primary" size="lg" @click="router.push('/play')">
        <Icon name="play-m" />
        {{ t('common.play') }}
      </Button>
    </Section>
  </Container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Container, Section } from '@sil/ui';

const router = useRouter();
const { t } = useI18n();
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;
.walk-home {
  &__hero { text-align: center; padding: $spacing-xl 0 $spacing-lg; }
  &__icon { font-size: 4rem; color: $color-primary; display: block; margin: 0 auto $spacing-md; }
  &__title { font-size: 2.5rem; font-weight: 800; margin-bottom: $spacing-md; }
  &__subtitle { color: $color-text-muted; font-size: 1.1rem; margin-bottom: $spacing-xl; }
  &__rules { margin-bottom: $spacing-lg;
    h2 { font-size: 1.2rem; font-weight: 700; margin-bottom: $spacing-md; }
    ul { padding-left: 1.5rem; li { margin-bottom: 8px; } }
  }
}
</style>
