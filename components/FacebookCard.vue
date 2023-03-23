<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();

const { generate: g, post, state, text } = useFacebook();
const generate = () => g(props);
defineExpose({ generate });
</script>
<template>
  <AppCard :state="state" title="Facebook" :body="text.trim()">
    <button class="btn btn-neutral" @click="generate()">Regenerate</button>
    <button class="btn btn-primary" @click="post(url)">
      Copy Text and Open Facebook
    </button>
  </AppCard>
</template>
