<template>
  <div v-if="open" class="auth-modal" role="dialog" aria-modal="true" :aria-label="t('auth.title')">
    <div class="auth-modal__backdrop" @click="$emit('close')" />
    <div class="auth-modal__panel">
      <button class="auth-modal__close" type="button" @click="$emit('close')" :aria-label="t('common.close')">
        <Icon name="action/close" />
      </button>

      <h2 class="auth-modal__title">
        {{ mode === 'login' ? t('auth.loginTitle') : t('auth.registerTitle') }}
      </h2>

      <form class="auth-modal__form" @submit.prevent="submit">
        <Field v-if="mode === 'register'" :label="t('auth.username')" :error="fieldErrors.username">
          <Input
            v-model="form.username"
            :placeholder="t('auth.usernamePlaceholder')"
            autocomplete="username"
            required
          />
        </Field>

        <Field :label="t('auth.email')" :error="fieldErrors.email">
          <Input
            v-model="form.email"
            type="email"
            :placeholder="t('auth.emailPlaceholder')"
            autocomplete="email"
            required
          />
        </Field>

        <Field :label="t('auth.password')" :error="fieldErrors.password">
          <Input
            v-model="form.password"
            type="password"
            :placeholder="t('auth.passwordPlaceholder')"
            :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
            required
          />
        </Field>

        <p v-if="authError" class="auth-modal__error" role="alert">{{ authError }}</p>

        <Button
          type="submit"
          :disabled="loading"
          :status="loading ? 'loading' : null"
          class="auth-modal__submit"
        >
          {{ mode === 'login' ? t('auth.loginButton') : t('auth.registerButton') }}
        </Button>
      </form>

      <p class="auth-modal__switch">
        {{ mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount') }}
        <button type="button" class="auth-modal__switch-btn" @click="toggleMode">
          {{ mode === 'login' ? t('auth.switchToRegister') : t('auth.switchToLogin') }}
        </button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Icon from '../Icon/Icon.vue';
import Button from '../Button/Button.vue';
import Field from '../Field/Field.vue';
import Input from '../Input/Input.vue';

defineOptions({ name: 'AuthModal' });

const props = defineProps<{
  open: boolean;
  loading?: boolean;
  authError?: string | null;
}>();

const emit = defineEmits<{
  close: [];
  login: [payload: { email: string; password: string }];
  register: [payload: { username: string; email: string; password: string }];
}>();

const { t } = useI18n();

const mode = ref<'login' | 'register'>('login');

const form = reactive({
  username: '',
  email: '',
  password: '',
});

const fieldErrors = reactive<Record<string, string>>({});

function toggleMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login';
  Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k]);
}

function validate(): boolean {
  Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k]);

  if (mode.value === 'register' && form.username.length < 3) {
    fieldErrors.username = t('auth.validation.usernameMin');
  }

  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    fieldErrors.email = t('auth.validation.emailInvalid');
  }

  if (form.password.length < 8) {
    fieldErrors.password = t('auth.validation.passwordMin');
  }

  return Object.keys(fieldErrors).length === 0;
}

function submit() {
  if (!validate()) return;

  if (mode.value === 'login') {
    emit('login', { email: form.email, password: form.password });
  } else {
    emit('register', { username: form.username, email: form.email, password: form.password });
  }
}
</script>

<style lang="scss">
.auth-modal {
  $b: &;

  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-m);

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  &__panel {
    position: relative;
    z-index: 1;
    background: var(--color-surface);
    border-radius: var(--border-radius-l);
    padding: var(--space-xl);
    width: 100%;
    max-width: 420px;
    box-shadow: var(--shadow-l);
  }

  &__close {
    position: absolute;
    top: var(--space-m);
    right: var(--space-m);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-muted);
    padding: var(--space-xs);
    border-radius: var(--border-radius-s);
    display: flex;
    align-items: center;
    font-size: 1.25rem;

    &:hover {
      color: var(--color-foreground);
      background: color-mix(in srgb, var(--color-foreground), transparent 90%);
    }
  }

  &__title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--space-l);
    color: var(--color-foreground);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  &__error {
    color: var(--color-error);
    font-size: var(--font-size-s);
    padding: var(--space-s) var(--space-m);
    background: color-mix(in srgb, var(--color-error), transparent 90%);
    border-radius: var(--border-radius);
  }

  &__submit {
    width: 100%;
    margin-top: var(--space-s);
  }

  &__switch {
    margin-top: var(--space-m);
    font-size: var(--font-size-s);
    color: var(--color-muted);
    text-align: center;
  }

  &__switch-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-primary);
    font-size: inherit;
    font-weight: 600;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
