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
      <Button variant="primary" size="lg" @click="router.push('/play')">
        <Icon name="play-m" />
        {{ t('common.play') }}
      </Button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Card } from '@geo/ui';

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
    font-size: 4rem;
    color: var(--color-primary);
    display: block;
    margin: 0 auto var(--space-m);
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: var(--space-m);
  }

  &__subtitle {
    color: var(--color-muted);
    font-size: 1.1rem;
    margin-bottom: var(--space-xl);
  }

  &__rules {
    margin-bottom: var(--space-l);

    h2 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: var(--space-m);
    }

    ul {
      padding-left: 1.5rem;

      li { margin-bottom: 8px; }
    }
  }
}
</style>
