<template>
  <button
    :class="['geo-btn', `geo-btn--${variant}`, `geo-btn--${size}`, { 'geo-btn--disabled': disabled }]"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<style scoped lang="scss">
.geo-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, transform 0.1s;

  &:active {
    transform: scale(0.97);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--sm { padding: 6px 12px; font-size: 0.875rem; }
  &--md { padding: 10px 20px; font-size: 1rem; }
  &--lg { padding: 14px 28px; font-size: 1.125rem; }

  &--primary { background: #3b82f6; color: white; &:hover { background: #2563eb; } }
  &--secondary { background: #6b7280; color: white; &:hover { background: #4b5563; } }
  &--danger { background: #ef4444; color: white; &:hover { background: #dc2626; } }
  &--ghost { background: transparent; color: #3b82f6; border: 2px solid #3b82f6; &:hover { background: #eff6ff; } }
}
</style>
