<script setup lang="ts">
type SocialPlatforms = "facebook" | "twitter";
const { copy } = useClipboard();

const url = ref("");
const temperature = ref(1);

const announcements = ref({
  twitter: {
    loading: false,
    text: "",
    error: false,
  },
  facebook: {
    loading: false,
    text: "",
    error: false,
  },
});

async function generateAnnouncement(platform: SocialPlatforms) {
  try {
    announcements.value[platform].error = false;
    announcements.value[platform].loading = true;
    const controller = new AbortController();
    const id = setTimeout(() => {
      controller.abort();
      announcements.value[platform].loading = false;
      announcements.value[platform].error = true;
    }, 10_000);
    const res = await $fetch(`/api/${platform}`, {
      method: "POST",
      body: {
        url: url.value,
        temperature: temperature.value,
      },
      signal: controller.signal,
    });
    clearTimeout(id);
    const announcement = res?.choices.at(0)?.message?.content;
    if (announcement) {
      announcements.value[platform].text = announcement;
    }
    announcements.value[platform].loading = false;
  } catch (err) {
    announcements.value[platform].loading = false;
    announcements.value[platform].error = true;
  }
}

const generateTweet = () => generateAnnouncement("twitter");
const generateFacebookPost = () => generateAnnouncement("facebook");

const timer = ref(0);
async function handleImport() {
  setInterval(() => timer.value++, 1_000);
  if (!url.value) return;
  generateTweet();
  generateFacebookPost();
}

function postTweet() {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      announcements.value.twitter.text
    )}`,
    "_blank"
  );
}

function postToFacebook() {
  copy(announcements.value.facebook.text);
  setTimeout(() => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url.value
      )}`,
      "_blank"
    );
  }, 500);
}
</script>
<template>
  <div class="max-w-full w-[900px] m-auto">
    <h1 class="text-4xl my-10">Social Media Post Generator {{ timer }}</h1>
    <div></div>
    <form @submit.prevent="handleImport" class="mb-10">
      <div class="flex">
        <input
          placeholder="Full Article URL"
          v-model="url"
          class="input input-bordered rounded-r-none w-full max-w-full"
          type="text"
        />
        <button class="btn rounded-l-none">Generate Announcements</button>
      </div>
      <TemperatureSelector v-model="temperature" />
    </form>

    <div>
      {{ announcements.twitter.error ? "❌" : "" }}
      <AppCard
        title="Twitter"
        :loading="announcements.twitter.loading"
        :body="announcements.twitter.text.trim()"
        class="mb-10"
      >
        <div class="flex w-full justify-between items-center">
          <div class="text-xs">
            Character Count:
            <strong>{{ announcements.twitter.text.length }}</strong>
          </div>
          <div>
            <button class="btn btn-neutral" @click="generateTweet()">
              Regenerate
            </button>
            <button class="btn btn-primary" @click="postTweet()">Post</button>
          </div>
        </div>
      </AppCard>

      {{ announcements.facebook.error ? "❌" : "" }}
      <AppCard
        :loading="announcements.facebook.loading"
        title="Facebook"
        :body="announcements.facebook.text.trim()"
        @post="postToFacebook()"
      >
        <button class="btn btn-neutral" @click="generateFacebookPost()">
          Regenerate
        </button>
        <button class="btn btn-primary" @click="postToFacebook()">
          Copy Text and Open Facebook
        </button>
      </AppCard>
    </div>
  </div>
</template>
