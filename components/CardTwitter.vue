<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();

const { chat, state, firstMessage } = useChatAi({ training: "facebook" });
const generate = () => nextTick(() => chat(props));
defineExpose({ generate });

const postURL = computed(
  () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      firstMessage.value?.content || ""
    )}`
);
</script>
<template>
  <CardGeneric
    title="Twitter"
    :state="state"
    :body="firstMessage?.content.trim()"
    class="mb-10"
  >
    <div class="flex w-full justify-between items-center">
      <div class="text-xs">
        Character Count:
        <strong>{{ firstMessage?.content.length }}</strong>
      </div>
      <div>
        <button class="btn btn-neutral" @click="generate()">Regenerate</button>
        <a class="btn btn-primary" :href="postURL" target="_blank">Post</a>
      </div>
    </div>
  </CardGeneric>
</template>
