<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();

const { generate: g, state, text } = useAnnouncement({ platform: "twitter" });
const generate = () => g(props);
defineExpose({ generate });

const postURL = computed(
  () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.value)}`
);
</script>
<template>
  <CardGeneric title="Twitter" :state="state" :body="text.trim()" class="mb-10">
    <div class="flex w-full justify-between items-center">
      <div class="text-xs">
        Character Count:
        <strong>{{ text.length }}</strong>
      </div>
      <div>
        <button class="btn btn-neutral" @click="generate()">Regenerate</button>
        <a class="btn btn-primary" :href="postURL" target="_blank">Post</a>
      </div>
    </div>
  </CardGeneric>
</template>
