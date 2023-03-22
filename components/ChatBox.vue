<script setup lang="ts">
import { nanoid } from "nanoid";
import Markdown from "vue3-markdown-it";
interface User {
  id: string;
  avatar: string;
  name: string;
}
interface Message {
  id: string;
  userId: string;
  createdAt: string;
  text: string;
}
const props = defineProps<{
  messages: Message[];
  users: User[];
  me: User;
}>();

defineEmits<{
  (e: "newMessage", payload: Message): void;
}>();

const open = ref(false);

function getUser(id: string) {
  return props.users.find((user) => user.id === id);
}
</script>
<template>
  <div class="fixed bottom-[10px] right-[10px] max-h-[95vh] overflow-y-scroll">
    <button v-show="!open" @click="open = true" class="bg-blue-500 p-3 rounded">
      <IconChat class="h-8 w-8 text-white" />
    </button>
    <div
      v-if="open"
      class="box bg-gray-300 dark:bg-gray-800 rounded w-[400px] overflow-hidden"
    >
      <!-- Header -->
      <header
        class="dark:bg-gray-900 bg-gray-200 px-4 flex justify-between items-center"
      >
        Customer Support Chat
        <button class="p-4 pr-0" @click="open = false">ⅹ</button>
      </header>
      <!-- Messages -->
      <div class="messages p-4">
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat"
          :class="{
            'chat-end': message.userId === me.id,
            'chat-start': message.userId !== me.id,
          }"
        >
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img :src="getUser(message.userId)?.avatar" />
            </div>
          </div>
          <div class="chat-header mb-2">
            {{ getUser(message.userId)?.name }}
            <time class="text-xs opacity-50">{{
              useTimeAgo(message.createdAt).value
            }}</time>
          </div>
          <div
            class="chat-bubble py-0 prose prose-sm bg-white dark:bg-gray-900"
          >
            <Markdown :source="message.text" />
          </div>
          <!-- <div class="chat-footer opacity-50">Delivered</div> -->
        </div>
      </div>
      <!-- Footer -->
      <footer class="p-2">
        <input
          class="input w-full"
          type="text"
          placeholder="Type your message"
          @keypress.enter="
            $emit('newMessage', {
              id: nanoid(),
              userId: me.id,
              createdAt: new Date(),
              text: ($event.target as HTMLInputElement).value,
            });
            ($event.target as HTMLInputElement).value = '';
          "
        />
      </footer>
    </div>
  </div>
</template>
<style scoped>
:deep(code) {
  background: none;
}
:deep(pre) {
  @apply dark:bg-[rgba(0,0,0,.3)];
}
</style>
