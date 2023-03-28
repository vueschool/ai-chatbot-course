<script setup lang="ts">
const props = defineProps<{
  url: string;
  temperature: number;
}>();

const { generate: g, state, text } = useAnnouncement({ platform: "facebook" });
const generate = () => nextTick(() => g(props));
defineExpose({ generate });

const announcement = useAnnouncement({ platform: "facebook" });
const { copy } = useClipboard();

const postURL = computed(
  () =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      props.url
    )}`
);

/**
 * We cannot pass the text to the facebook post
 * Thus we'll open the facebook share tab
 * and copy the text to the clipboard to make it easy to add to the post
 */
function post() {
  copy(announcement.text.value);
  setTimeout(() => {
    window.open(postURL.value, "_blank");
  }, 500);
}
</script>
<template>
  <CardGeneric :state="state" title="Facebook" :body="text.trim()">
    <button class="btn btn-neutral" @click="generate()">Regenerate</button>
    <a :href="postURL" class="btn btn-primary" @click.prevent="post()">
      Copy Text and Open Facebook
    </a>
  </CardGeneric>
</template>
