<script setup lang="ts">
const form = ref({
  url: "",
  temperature: 1,
});

const twitterCard = ref();
const facebookCard = ref();

async function handleImport(e: typeof form.value) {
  form.value = { ...e };
  if (!form.value.url) return;
  twitterCard.value.generate();
  facebookCard.value.generate();
}
</script>
<template>
  <div class="max-w-full w-[900px] m-auto">
    <h1 class="text-4xl my-10">Social Media Post Generator</h1>
    <UrlForm v-bind="form" @submit="handleImport"></UrlForm>
    <div>
      <CardTwitter ref="twitterCard" v-bind="form" />
      <CardFacebook ref="facebookCard" v-bind="form" />
    </div>

    <ChatWidget />
  </div>
</template>
