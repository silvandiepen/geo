<template>
  <div class="home">
    <header class="home__header">
      <div class="home__header-inner">
        <div class="home__logo">🌍</div>
        <div>
          <h1 class="home__title">Geo Platform</h1>
          <p class="home__subtitle">Geography games powered by world data</p>
        </div>
      </div>
    </header>

    <main class="home__main">
      <section class="home__section">
        <h2 class="home__section-title">Choose a Game</h2>
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
              <span class="game-card__category">{{ game.category }}</span>
            </div>
            <div class="game-card__arrow">→</div>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { GAMES } from '../models/game-entry';
</script>

<style scoped lang="scss">
@use "../styles/variables" as *;

.home {
  &__header {
    background: white;
    border-bottom: 1px solid $color-border;
    padding: $spacing-lg $spacing-xl;
  }

  &__header-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__logo {
    font-size: 3rem;
    line-height: 1;
  }

  &__title {
    font-size: 2rem;
    font-weight: 800;
    color: $color-text;
    margin-bottom: 4px;
  }

  &__subtitle {
    color: $color-text-muted;
    font-size: 1rem;
  }

  &__main {
    max-width: 1200px;
    margin: 0 auto;
    padding: $spacing-xl;
  }

  &__section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: $spacing-lg;
    color: $color-text;
  }
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
  background: white;
  border-radius: $radius-lg;
  border: 2px solid transparent;
  box-shadow: $shadow-sm;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  border-left: 6px solid var(--game-color);

  &:hover {
    box-shadow: $shadow-md;
    transform: translateY(-2px);
    border-color: var(--game-color);
  }

  &__emoji {
    font-size: 2.5rem;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__name {
    font-size: 1.1rem;
    font-weight: 700;
    color: $color-text;
    margin-bottom: 4px;
  }

  &__description {
    font-size: 0.875rem;
    color: $color-text-muted;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  &__category {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--game-color);
    background: color-mix(in srgb, var(--game-color) 12%, white);
    padding: 2px 8px;
    border-radius: 99px;
  }

  &__arrow {
    font-size: 1.25rem;
    color: $color-text-muted;
    flex-shrink: 0;
  }
}
</style>
