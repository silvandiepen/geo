<template>
  <div class="geo-input-wrapper">
    <label v-if="label" :for="id" class="geo-input-label">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      class="geo-input"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="emit('input', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [value: string];
}>();

const model = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
});
</script>

<style scoped lang="scss">
.geo-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.geo-input-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.geo-input {
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
}
</style>
