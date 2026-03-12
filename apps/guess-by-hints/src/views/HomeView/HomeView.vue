<template>
  <div class="container hints-home">
    <section>
      <div class="hints-home__hero">
        <Icon name="lightbulb-m" class="hints-home__icon" />
        <h1>{{ t('games.guessByHints.name') }}</h1>
        <p>{{ t('games.guessByHints.description') }}</p>
      </div>
      <Button variant="primary" size="lg" @click="router.push('/play')">
        <Icon name="play-m" />{{ t('common.play') }}
      </Button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from '@geo/i18n';
import { Button, Icon } from '@geo/ui';

const router = useRouter();
const { t } = useI18n();
</script>

<style scoped lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.hints-home {
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
}
</style>
