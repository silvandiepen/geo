<template>
  <div class="game-timer" :class="{ 'game-timer--warning': timeLeft <= (warningThreshold ?? 10) }">
    <Icon name="timer-m" class="game-timer__icon" />
    <span class="game-timer__value">{{ formattedTime }}</span>
    <Progress :value="percentage" class="game-timer__bar" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { Icon, Progress } from '@sil/ui';

const props = defineProps<{
  totalSeconds: number;
  running: boolean;
  warningThreshold?: number;
}>();

const emit = defineEmits<{
  tick: [timeLeft: number];
  expire: [];
}>();

const timeLeft = ref(props.totalSeconds);
let interval: ReturnType<typeof setInterval> | null = null;

const percentage = computed(() =>
  Math.round((timeLeft.value / props.totalSeconds) * 100)
);

const formattedTime = computed(() => {
  const mins = Math.floor(timeLeft.value / 60);
  const secs = timeLeft.value % 60;
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
});

function start(): void {
  interval = setInterval(() => {
    timeLeft.value--;
    emit('tick', timeLeft.value);
    if (timeLeft.value <= 0) {
      stop();
      emit('expire');
    }
  }, 1000);
}

function stop(): void {
  if (interval) clearInterval(interval);
  interval = null;
}

watch(() => props.running, (val) => {
  if (val) start();
  else stop();
}, { immediate: true });

onUnmounted(stop);
</script>

<style scoped lang="scss">
.game-timer {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &__icon {
    color: var(--color-primary, #3b82f6);
  }

  &__value {
    font-size: 1.5rem;
    font-weight: 700;
    min-width: 3ch;
    text-align: right;
  }

  &__bar {
    width: 120px;
  }

  &--warning {
    .game-timer__icon,
    .game-timer__value {
      color: var(--color-danger, #ef4444);
    }
  }
}
</style>
