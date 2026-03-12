<template>
  <div class="container capital-home">
    <section>
      <div class="capital-home__hero">
        <Icon name="map-pin-m" class="capital-home__icon" />
        <h1>{{ t('games.capitalMatch.name') }}</h1>
        <p>{{ t('games.capitalMatch.description') }}</p>
      </div>
      <Card class="capital-home__rules">
        <h2>How to Play</h2>
        <ul>
          <li>Match countries to their capitals (or vice versa)</li>
          <li>Choose from 4 multiple choice options</li>
          <li>Switch between Country → Capital and Capital → Country modes</li>
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

.capital-home {
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

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: var(--space-m);
  }

  p {
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
