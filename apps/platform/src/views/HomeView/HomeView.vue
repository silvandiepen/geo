<template>
  <div class="platform-home">
    <header class="app-header">
      <div class="app-header__brand">{{ t('platform.title') }}</div>
    </header>
    <div class="container platform-home__content">
      <section>
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
              <span class="badge game-card__badge">{{ t(`platform.categories.${game.category}`) }}</span>
            </div>
            <Icon name="arrow-right-m" class="game-card__arrow" />
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@geo/i18n';
import { Icon } from '@geo/ui';
import { GAMES } from '../../models/game-entry';

const { t } = useI18n();
</script>

<style scoped lang="scss">
.app-header {
  padding: var(--space-m) var(--space-l);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);

  &__brand {
    font-size: var(--font-size-l);
    font-weight: 700;
    color: var(--color-primary);
  }
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.platform-home {
  $b: &;

  &__content { padding-top: var(--space-xl); }

  &__hero {
    text-align: center;
    margin-bottom: var(--space-xl);
  }

  &__globe {
    font-size: 4rem;
    color: var(--color-primary);
    display: block;
    margin: 0 auto var(--space-m);
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: var(--space-m);
    color: var(--color-foreground);
  }

  &__subtitle {
    color: var(--color-muted);
    font-size: 1.125rem;
    margin-bottom: 0;
  }

  &__section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: var(--space-l);
  }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-l);
}

.game-card {
  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-l);
  background: var(--color-surface);
  border-radius: var(--border-radius-l);
  border-left: 6px solid var(--game-color);
  box-shadow: var(--shadow-s);
  text-decoration: none;
  color: inherit;
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-m);
    transform: translateY(-2px);
  }

  &__emoji { font-size: 2.5rem; flex-shrink: 0; }

  &__content { flex: 1; min-width: 0; }

  &__name { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }

  &__description {
    font-size: 0.875rem;
    color: var(--color-muted);
    margin-bottom: 8px;
    line-height: 1.4;
  }

  &__badge { font-size: 0.75rem; }

  &__arrow { color: var(--color-muted); flex-shrink: 0; }
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--border-radius-s);
  background: var(--color-primary);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
