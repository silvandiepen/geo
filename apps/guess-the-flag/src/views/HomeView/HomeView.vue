<template>
  <div class="container flag-home">
    <section>
      <div class="flag-home__hero">
        <Icon name="flag-m" class="flag-home__icon" />
        <h1>{{ t('games.guessTheFlag.name') }}</h1>
        <p>{{ t('games.guessTheFlag.description') }}</p>
      </div>
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
import { Button, Icon, Size } from '@geo/ui';

const router = useRouter();
const { t } = useI18n();
</script>

<style scoped lang="scss">
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.flag-home {
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
}
</style>
