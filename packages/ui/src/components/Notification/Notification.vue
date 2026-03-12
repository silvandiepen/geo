<template>
  <div v-if="visible" :class="notificationClasses" role="alert">
    <Icon v-if="iconName" :name="iconName" class="sil-notification__icon" />
    <span class="sil-notification__message">{{ message }}</span>
    <button
      v-if="dismissible"
      class="sil-notification__close"
      type="button"
      :aria-label="dismissLabel"
      @click="dismiss"
    >
      <Icon name="action/close" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useBemm } from 'bemm';
import { Icons } from '../../types';
import Icon from '../Icon/Icon.vue';
import type { NotificationType } from './Notification.model';

defineOptions({ name: 'SilNotification' });

const props = withDefaults(
  defineProps<{
    message: string;
    type?: NotificationType;
    dismissible?: boolean;
    dismissLabel?: string;
  }>(),
  {
    type: 'info',
    dismissible: false,
    dismissLabel: 'Dismiss',
  }
);

const emit = defineEmits<{
  dismiss: [];
}>();

const visible = ref(true);

const bemm = useBemm('sil-notification', { return: 'string', includeBaseClass: true });

const iconMap: Record<string, string> = {
  success: Icons.CHECK,
  error: Icons.EXCLAMATION,
  warning: Icons.EXCLAMATION,
  info: 'action/info',
};

const iconName = computed(() => iconMap[props.type ?? 'info']);

const notificationClasses = computed(() =>
  bemm('', { [`type-${props.type}`]: true, dismissible: props.dismissible })
);

function dismiss() {
  visible.value = false;
  emit('dismiss');
}
</script>

<style>
.sil-notification {
  display: flex;
  align-items: center;
  gap: var(--space-s, 8px);
  padding: var(--space-s, 12px) var(--space-m, 16px);
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-s, 0.875rem);
  line-height: 1.5;
}

.sil-notification--type-success {
  background: color-mix(in srgb, var(--color-success, #22c55e), transparent 85%);
  color: var(--color-success, #22c55e);
  border: 1px solid color-mix(in srgb, var(--color-success, #22c55e), transparent 60%);
}

.sil-notification--type-error {
  background: color-mix(in srgb, var(--color-error, #ef4444), transparent 85%);
  color: var(--color-error, #ef4444);
  border: 1px solid color-mix(in srgb, var(--color-error, #ef4444), transparent 60%);
}

.sil-notification--type-warning {
  background: color-mix(in srgb, var(--color-warning, #f59e0b), transparent 85%);
  color: var(--color-warning, #f59e0b);
  border: 1px solid color-mix(in srgb, var(--color-warning, #f59e0b), transparent 60%);
}

.sil-notification--type-info {
  background: color-mix(in srgb, var(--color-info, #3b82f6), transparent 85%);
  color: var(--color-info, #3b82f6);
  border: 1px solid color-mix(in srgb, var(--color-info, #3b82f6), transparent 60%);
}

.sil-notification__message {
  flex: 1;
  font-weight: 500;
}

.sil-notification__icon {
  flex-shrink: 0;
}

.sil-notification__close {
  background: none;
  border: none;
  cursor: pointer;
  color: currentColor;
  padding: var(--space-xs);
  border-radius: var(--border-radius-s, 4px);
  display: flex;
  align-items: center;
  opacity: 0.7;
}

.sil-notification__close:hover {
  opacity: 1;
}
</style>
