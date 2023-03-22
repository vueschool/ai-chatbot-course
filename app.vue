<script setup>
import { nanoid } from "nanoid";
const me = ref({
  id: nanoid(),
  avatar:
    "https://pbs.twimg.com/profile_images/1543113237415215104/6MUa5Tta_400x400.jpg",
  name: "Daniel",
});
const bot = ref({
  id: nanoid(),
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SGq5ryvPkabjn_1Zd0W8cqpOQsH2kzrO61_nyOa_pyzpYcUA7FrrbMixbVBDdsSEX50&usqp=CAU",
  name: "Botty",
});

const users = ref([me.value, bot.value]);

const messages = ref([
  {
    id: nanoid(),
    userId: me.value.id,
    createdAt: new Date("11/11/22"),
    text: "Hello Botty",
  },
  {
    id: nanoid(),
    userId: bot.value.id,
    createdAt: new Date("12/12/22"),
    text: "Hello Daniel",
  },
]);

const apiReadyMessages = computed(() => {
  return messages.value.map((message) => {
    return {
      role: message.userId === me.value.id ? "user" : "assistant",
      content: message.text,
    };
  });
});

async function handleNewMessage(e) {
  messages.value.push(e);
  const res = await $fetch("/api/ai", {
    method: "POST",
    body: {
      messages: apiReadyMessages.value,
    },
  });
  messages.value.push({
    userId: bot.value.id,
    createdAt: new Date(),
    text: res.choices.at(0).message.content,
    id: res.id,
  });
  console.log();
}
</script>
<template>
  <ChatBox
    :me="me"
    :users="users"
    :messages="messages"
    @new-message="handleNewMessage"
  />
</template>
