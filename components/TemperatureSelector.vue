<script setup lang="ts">
defineProps<{
  modelValue: number;
}>();
defineEmits<{
  (e: "update:modelValue", payload: number): void;
}>();
const level = ref(1);
</script>
<template>
  <input
    :value="modelValue"
    @input="
      $emit(
        'update:modelValue',
        Number(($event.target as HTMLInputElement).value)
      )
    "
    max="1"
    min="0"
    step=".1"
    type="range"
    class="w-full range range-secondary"
  />
  Temperature:
  <span class="font-bold" v-if="modelValue === 1">Hot</span>
  <span class="font-bold" v-if="modelValue < 1 && modelValue > 0">{{
    modelValue
  }}</span>
  <span class="font-bold" v-if="modelValue === 0">Cold</span>
</template>
