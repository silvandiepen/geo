<template>
  <div :class="['geo-card', { 'geo-card--hoverable': hoverable }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hoverable?: boolean;
}>();
</script>

<style scoped lang="scss">
.geo-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  transition: box-shadow 0.2s, transform 0.2s;

  &--hoverable {
    cursor: pointer;
    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }
  }
}
</style>
