<template>
  <div class="platform-home">
    <header class="app-header">
      <div class="app-header__inner">
        <div class="app-header__brand">
          <Icon name="maps/globe" class="app-header__logo" />
          {{ t('platform.title') }}
        </div>
        <div class="app-header__actions">
          <template v-if="isLoggedIn">
            <span class="app-header__username">{{ user?.username }}</span>
            <button class="app-header__btn" type="button" @click="handleLogout">
              {{ t('auth.logout') }}
            </button>
          </template>
          <template v-else>
            <button class="app-header__btn app-header__btn--primary" type="button" @click="showAuth = true">
              {{ t('auth.loginButton') }}
            </button>
          </template>
        </div>
      </div>
    </header>

    <div class="container platform-home__content">
      <section>
        <div class="platform-home__hero">
          <Icon name="maps/globe" class="platform-home__globe" />
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
              <span class="badge">{{ t(`platform.categories.${game.category}`) }}</span>
            </div>
            <Icon name="navigation/chevron-right" class="game-card__arrow" />
          </a>
        </div>
      </section>
    </div>

    <AuthModal
      :open="showAuth"
      :loading="authLoading"
      :auth-error="authError"
      @close="showAuth = false"
      @login="handleLogin"
      @register="handleRegister"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '@geo/i18n';
import { Icon, AuthModal } from '@geo/ui';
import { useAuth } from '@geo/auth';
import { GAMES } from '../../models/game-entry';

const { t } = useI18n();
const { user, isLoggedIn, login, register, logout, error: authStoreError, loading: authStoreLoading } = useAuth();

const showAuth = ref(false);
const authLoading = ref(false);
const authError = ref<string | null>(null);

async function handleLogin(payload: { email: string; password: string }) {
  authLoading.value = true;
  authError.value = null;
  const ok = await login(payload);
  authLoading.value = false;
  if (ok) {
    showAuth.value = false;
  } else {
    authError.value = authStoreError.value;
  }
}

async function handleRegister(payload: { username: string; email: string; password: string }) {
  authLoading.value = true;
  authError.value = null;
  const ok = await register(payload);
  authLoading.value = false;
  if (ok) {
    showAuth.value = false;
  } else {
    authError.value = authStoreError.value;
  }
}

function handleLogout() {
  logout();
}
</script>

<style scoped lang="scss">
.app-header {
  background: color-mix(in srgb, var(--color-background), var(--color-foreground) 4%);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;

  &__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: var(--space-m) var(--space-l);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-m);
  }

  &__brand {
    font-size: var(--font-size-l);
    font-weight: 700;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: var(--space-s);
  }

  &__logo {
    font-size: var(--font-size-xl);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-s);
  }

  &__username {
    font-weight: 600;
    font-size: var(--font-size-s);
    color: var(--color-foreground);
  }

  &__btn {
    padding: var(--space-xs) var(--space-m);
    border-radius: var(--border-radius-xl);
    border: 1px solid var(--color-border);
    background: transparent;
    cursor: pointer;
    font-size: var(--font-size-s);
    font-weight: 500;
    color: var(--color-foreground);
    transition: var(--transition-fast);

    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }

    &--primary {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: #fff;

      &:hover {
        background: var(--color-primary-hover);
        border-color: var(--color-primary-hover);
        color: #fff;
      }
    }
  }
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-l);
}

.platform-home {
  $b: &;

  &__content { padding-top: var(--space-xl); padding-bottom: var(--space-xl); }

  &__hero {
    text-align: center;
    margin-bottom: var(--space-xl);
  }

  &__globe {
    font-size: calc(var(--font-size-xxl) * 2);
    color: var(--color-primary);
    display: block;
    margin: 0 auto var(--space-m);
  }

  &__title {
    font-size: calc(var(--font-size-xxl) * 1.25);
    font-weight: 800;
    margin-bottom: var(--space-m);
    color: var(--color-foreground);
  }

  &__subtitle {
    color: color-mix(in srgb, var(--color-foreground), transparent 50%);
    font-size: var(--font-size-l);
    margin-bottom: 0;
  }

  &__section-title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--space-l);
    color: var(--color-foreground);
  }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-l);
  margin-bottom: var(--space-xl);
}

.game-card {
  $b: &;

  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-l);
  background: color-mix(in srgb, var(--color-background), var(--color-foreground) 4%);
  border-radius: var(--border-radius-l);
  border-left: 6px solid var(--game-color);
  box-shadow: var(--shadow-s);
  text-decoration: none;
  color: inherit;
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-m);
    transform: translateY(-2px);
    text-decoration: none;
  }

  &__emoji { font-size: calc(var(--font-size-xxl) * 1.25); flex-shrink: 0; }
  &__content { flex: 1; min-width: 0; }
  &__name { font-size: var(--font-size-l); font-weight: 700; margin-bottom: var(--space-xs); }

  &__description {
    font-size: var(--font-size-s);
    color: color-mix(in srgb, var(--color-foreground), transparent 50%);
    margin-bottom: var(--space-s);
    line-height: 1.4;
  }

  &__arrow { color: color-mix(in srgb, var(--color-foreground), transparent 50%); flex-shrink: 0; }
}

.badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--border-radius-s);
  background: color-mix(in srgb, var(--color-primary), transparent 85%);
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  font-weight: 600;
}
</style>
