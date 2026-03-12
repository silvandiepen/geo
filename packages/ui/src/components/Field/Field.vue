<template>
  <div :class="fieldClasses">
    <label v-if="label" :for="fieldId" class="sil-field__label">
      {{ label }}
      <span v-if="required" class="sil-field__required" aria-hidden="true">*</span>
    </label>
    <div class="sil-field__control">
      <slot />
    </div>
    <p v-if="hint" class="sil-field__hint">{{ hint }}</p>
    <p v-if="error" class="sil-field__error" role="alert">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBemm } from 'bemm';

defineOptions({ name: 'SilField' });

const props = withDefaults(
  defineProps<{
    label?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    label: undefined,
    hint: undefined,
    error: undefined,
    required: false,
    disabled: false,
    id: undefined,
  }
);

const fieldId = computed(() => props.id ?? `field-${Math.random().toString(36).slice(2, 8)}`);

const bemm = useBemm('sil-field', { return: 'string', includeBaseClass: true });

const fieldClasses = computed(() =>
  bemm('', {
    'has-error': Boolean(props.error),
    'is-disabled': props.disabled,
    'is-required': props.required,
  })
);
</script>

<style>
.sil-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs, 4px);
}

.sil-field__label {
  font-size: var(--font-size-s, 0.875rem);
  font-weight: 600;
  color: var(--color-foreground);
}

.sil-field__required {
  color: var(--color-error, #ef4444);
  margin-inline-start: 2px;
}

.sil-field__control {
  display: flex;
  flex-direction: column;
}

.sil-field__hint {
  font-size: var(--font-size-xs, 0.75rem);
  color: color-mix(in srgb, var(--color-foreground), transparent 40%);
}

.sil-field__error {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--color-error, #ef4444);
}

.sil-field--is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
