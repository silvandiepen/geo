<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="geo-modal-overlay" @click.self="emit('update:modelValue', false)">
        <div class="geo-modal">
          <div class="geo-modal__header">
            <h2 v-if="title" class="geo-modal__title">{{ title }}</h2>
            <button class="geo-modal__close" @click="emit('update:modelValue', false)">✕</button>
          </div>
          <div class="geo-modal__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<style scoped lang="scss">
.geo-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.geo-modal {
  background: white;
  border-radius: 16px;
  min-width: 320px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 48px rgba(0,0,0,0.2);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 0;
  }

  &__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    color: #6b7280;
    &:hover { color: #111827; }
  }

  &__body {
    padding: 20px 24px 24px;
  }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
