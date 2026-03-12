<template>
  <Alert :variant="result.correct ? 'success' : 'error'" class="result-panel">
    <div class="result-panel__content">
      <Icon :name="result.correct ? 'check-m' : 'close-m'" class="result-panel__icon" />
      <span class="result-panel__details">{{ result.details }}</span>
      <Badge :variant="result.correct ? 'success' : 'danger'" class="result-panel__score">
        +{{ result.score }} pts
      </Badge>
    </div>
  </Alert>
</template>

<script setup lang="ts">
import { Icon, Alert, Badge } from '@sil/ui';
import type { Result } from '@geo/types';

defineProps<{
  result: Result;
}>();
</script>

<style scoped lang="scss">
.result-panel {
  &__content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__icon {
    flex-shrink: 0;
    font-size: 1.25rem;
  }

  &__details {
    flex: 1;
    font-weight: 500;
  }

  &__score {
    flex-shrink: 0;
    font-weight: 700;
  }
}
</style>
