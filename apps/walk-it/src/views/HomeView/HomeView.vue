<template>
  <div class="container walk-home">
    <section>
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
      <Button variant="primary" :size="Size.LARGE" @click="router.push('/play')">
        <Icon name="play-m" />
        {{ t('common.play') }}
      </Button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card, Size } from '@geo/ui';

const router = useRouter();
const { t } = useI18n();
</script>

<style scoped lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.walk-home {
  $b: &;

  &__hero {
    text-align: center;
    padding: var(--space-xl) 0 var(--space-l);
  }

  &__icon {
    font-size: calc(var(--font-size-xxl) * 2);
    color: var(--color-primary);
    display: block;
    margin: 0 auto var(--space-m);
  }

  &__title {
    font-size: calc(var(--font-size-xxl) * 1.25);
    font-weight: 800;
    margin-bottom: var(--space-m);
  }

  &__subtitle {
    color: color-mix(in srgb, var(--color-foreground), transparent 50%);
    font-size: var(--font-size-l);
    margin-bottom: var(--space-xl);
  }

  &__rules {
    margin-bottom: var(--space-l);

    h2 {
      font-size: var(--font-size-l);
      font-weight: 700;
      margin-bottom: var(--space-m);
    }

    ul {
      padding-left: calc(var(--space-m) * 1.5);

      li { margin-bottom: var(--space-s); }
    }
  }
}
</style>
