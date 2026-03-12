<template>
  <div :class="['game-timer', { 'game-timer--warning': timeLeft <= warningThreshold }]">
    <span class="game-timer__value">{{ formattedTime }}</span>
    <div class="game-timer__bar">
      <div class="game-timer__fill" :style="{ width: `${percentage}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  &__value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
  }

  &__bar {
    width: 200px;
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: #22c55e;
    border-radius: 4px;
    transition: width 1s linear, background 0.5s;
  }

  &--warning {
    .game-timer__value { color: #ef4444; }
    .game-timer__fill { background: #ef4444; }
  }
}
</style>
