<script setup lang="ts">
import { Message, User } from "~~/types";

const me = ref({
  id: "user",
  avatar: "/avatar.jpg",
  name: "You",
});
const bot = ref({
  id: "assistant",
  avatar: "/bot.jpg",
  name: "Botman",
});

const users = computed(() => [me.value, bot.value]);

const messages = ref<Message[]>([]);

const usersTyping = ref<User[]>([]);

// send messages to Chat API here
// and in the empty function below

function handleNewMessage(message: Message) {}
</script>
<template>
  <ChatBox
    :me="me"
    :users="users"
    :messages="messages"
    @new-message="handleNewMessage"
    :usersTyping="usersTyping"
  />
</template>
