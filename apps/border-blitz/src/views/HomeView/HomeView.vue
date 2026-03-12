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

.blitz-home {
  $b: &;

  &__hero {
    text-align: center;
    padding: var(--space-xl) 0 var(--space-l);
  }

  &__icon {
    font-size: var(--font-size-4xl);
    color: var(--color-primary);
    display: block;
    margin: 0 auto var(--space-m);
  }

  h1 {
    font-size: var(--font-size-3xl);
    font-weight: 800;
    margin-bottom: var(--space-m);
  }

  p {
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
