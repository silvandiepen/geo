<template>
  <div class="container blitz-home">
    <section>
      <div class="blitz-home__hero">
        <Icon name="border-all-m" class="blitz-home__icon" />
        <h1>{{ t('games.borderBlitz.name') }}</h1>
        <p>{{ t('games.borderBlitz.description') }}</p>
      </div>
      <Card class="blitz-home__rules">
        <h2>How to Play</h2>
        <ul>
          <li>A country is shown — name all its neighbors</li>
          <li>Type each neighbor country before time runs out</li>
          <li>60 seconds on the clock</li>
          <li>Wrong guesses cost you points</li>
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

.blitz-home {
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
