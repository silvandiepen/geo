<template>
  <div class="platform-home">
    <AppHeader :nav="[]" :brand="{ name: t('platform.title') }" />
    <Container max="large" class="platform-home__content">
      <Section>
        <div class="platform-home__hero">
          <Icon name="globe-m" class="platform-home__globe" />
          <h1 class="platform-home__title">{{ t('platform.title') }}</h1>
          <p class="platform-home__subtitle">{{ t('platform.subtitle') }}</p>
        </div>
        <h2 class="platform-home__section-title">{{ t('platform.chooseGame') }}</h2>
        <div class="games-grid">
          <a
            v-for="game in GAMES"
            :key="game.id"
            :href="game.path"
            class="game-card"
            :style="{ '--game-color': game.color }"
          >
            <div class="game-card__emoji">{{ game.emoji }}</div>
            <div class="game-card__content">
              <h3 class="game-card__name">{{ game.name }}</h3>
              <p class="game-card__description">{{ game.description }}</p>
              <Badge class="game-card__badge">{{ t(`platform.categories.${game.category}`) }}</Badge>
            </div>
            <Icon name="arrow-right-m" class="game-card__arrow" />
          </a>
        </div>
      </Section>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@geo/i18n';
import { Container, Section, AppHeader, Icon, Badge } from '@sil/ui';
import { GAMES } from '../models/game-entry';

const { t } = useI18n();
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;

.platform-home {
  &__content { padding-top: $spacing-xl; }
  &__hero { text-align: center; margin-bottom: $spacing-xl; }
  &__globe { font-size: 4rem; color: $color-primary; display: block; margin: 0 auto $spacing-md; }
  &__title { font-size: 2.5rem; font-weight: 800; margin-bottom: $spacing-md; color: $color-text; }
  &__subtitle { color: $color-text-muted; font-size: 1.125rem; margin-bottom: 0; }
  &__section-title { font-size: 1.5rem; font-weight: 700; margin-bottom: $spacing-lg; }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: $spacing-lg;
}

.game-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-lg;
  background: $color-surface;
  border-radius: $radius-lg;
  border-left: 6px solid var(--game-color);
  box-shadow: $shadow-sm;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;

  &:hover { box-shadow: $shadow-md; transform: translateY(-2px); }
  &__emoji { font-size: 2.5rem; flex-shrink: 0; }
  &__content { flex: 1; min-width: 0; }
  &__name { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
  &__description { font-size: 0.875rem; color: $color-text-muted; margin-bottom: 8px; line-height: 1.4; }
  &__badge { font-size: 0.75rem; }
  &__arrow { color: $color-text-muted; flex-shrink: 0; }
}
</style>
