<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();

const { generate: g, post, state, text } = useTwitter();
const generate = () => g(props);
defineExpose({ generate });
</script>
<template>
  <AppCard title="Twitter" :state="state" :body="text.trim()" class="mb-10">
    <div class="flex w-full justify-between items-center">
      <div class="text-xs">
        Character Count:
        <strong>{{ text.length }}</strong>
      </div>
      <div>
        <button class="btn btn-neutral" @click="generate()">Regenerate</button>
        <button class="btn btn-primary" @click="post()">Post</button>
      </div>
    </div>
  </AppCard>
</template>
