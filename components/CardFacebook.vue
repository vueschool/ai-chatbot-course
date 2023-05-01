<script setup lang="ts">
import type { AsyncState } from "~~/types";
const announcement = ref("My generated post!");
const state = ref<AsyncState>("complete");
</script>
<template>
  <CardGeneric title="Facebook" :state="state" :body="announcement">
    <button class="btn btn-neutral">Regenerate</button>
    <a class="btn btn-primary"> Post </a>
  </CardGeneric>
</template>
