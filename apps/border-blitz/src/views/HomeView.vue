<template>
  <Container max="small" class="blitz-home">
    <Section>
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
.blitz-home {
  &__hero { text-align: center; padding: $spacing-xl 0 $spacing-lg; }
  &__icon { font-size: 4rem; color: $color-primary; display: block; margin: 0 auto $spacing-md; }
  h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: $spacing-md; }
  p { color: $color-text-muted; font-size: 1.1rem; margin-bottom: $spacing-xl; }
  &__rules { margin-bottom: $spacing-lg;
    h2 { font-size: 1.2rem; font-weight: 700; margin-bottom: $spacing-md; }
    ul { padding-left: 1.5rem; li { margin-bottom: 8px; } }
  }
}
</style>
