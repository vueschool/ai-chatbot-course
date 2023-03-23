<script setup lang="ts">
const form = reactive({
  url: "",
  temperature: 1,
});

const twitterCard = ref();
const facebookCard = ref();

async function handleImport() {
  if (!form.url) return;
  twitterCard.value.generate();
  facebookCard.value.generate();
}
</script>
<template>
  <div class="max-w-full w-[900px] m-auto">
    <h1 class="text-4xl my-10">Social Media Post Generator</h1>
    <div></div>
    <form @submit.prevent="handleImport" class="mb-10">
      <div class="flex">
        <input
          placeholder="Full Article URL"
          v-model="form.url"
          class="input input-bordered rounded-r-none w-full max-w-full"
          type="text"
        />
        <button class="btn rounded-l-none">Generate Announcements</button>
      </div>
      <TemperatureSelector v-model="form.temperature" />
    </form>

    <div>
      <TwitterCard ref="twitterCard" v-bind="form" />
      <FacebookCard ref="facebookCard" v-bind="form" />
    </div>
  </div>
</template>
