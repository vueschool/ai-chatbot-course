<script setup lang="ts">
import type { AsyncState } from "~~/types";
const announcement = ref("My generated tweet!");
const state = ref<AsyncState>("complete");
</script>
<template>
  <CardGeneric
    title="Twitter"
    :state="state"
    :body="announcement"
    class="mb-10"
  >
    <div class="flex w-full justify-between items-center">
      <div class="text-xs">
        Character Count:
        <strong>{{ announcement.length }}</strong>
      </div>
      <div>
        <button class="btn btn-neutral">Regenerate</button>
        <a class="btn btn-primary" target="_blank">Post</a>
      </div>
    </div>
  </CardGeneric>
</template>
