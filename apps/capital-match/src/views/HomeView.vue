<template>
  <Container max="small" class="capital-home">
    <Section>
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
.capital-home {
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
