<template>
  <Container max="small" class="hints-home">
    <Section>
      <div class="hints-home__hero">
        <Icon name="lightbulb-m" class="hints-home__icon" />
        <h1>{{ t('games.guessByHints.name') }}</h1>
        <p>{{ t('games.guessByHints.description') }}</p>
      </div>
      <Button variant="primary" size="lg" @click="router.push('/play')">
        <Icon name="play-m" />{{ t('common.play') }}
      </Button>
    </Section>
  </Container>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from '@geo/i18n';
import { Button, Icon, Container, Section } from '@sil/ui';
const router = useRouter();
const { t } = useI18n();
</script>
<style scoped lang="scss">
@use "../styles/variables" as *;
.hints-home {
  &__hero { text-align: center; padding: $spacing-xl 0 $spacing-lg; }
  &__icon { font-size: 4rem; color: $color-primary; display: block; margin: 0 auto $spacing-md; }
  h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: $spacing-md; }
  p { color: $color-text-muted; font-size: 1.1rem; margin-bottom: $spacing-xl; }
}
</style>
