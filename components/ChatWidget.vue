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

const apiReadyMessages = computed(() => {
  return messages.value.map((message) => {
    return {
      role: message.userId,
      content: message.text,
    };
  });
});

const { chat } = useChatAi({ training: "customerSupport" });
async function handleNewMessage(message: Message) {
  messages.value.push(message);
  usersTyping.value.push(bot.value);

  const res = await chat({ messages: apiReadyMessages.value });

  if (res) {
    messages.value.push({
      userId: bot.value.id,
      createdAt: new Date(),
      text: res.choices.at(0)?.message?.content || "",
      id: res.id,
    });
  }

  usersTyping.value = [];
}
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
