import { AxiosError } from "axios";
import { getOpenAI } from "@/server/utils";
export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event);

  const openai = getOpenAI();
  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful customer support agent for the 'Social Media Post Generator'. This software takes an article URL and makes an announcement ",
        },
        { role: "user", content: "What's your email address" },
        { role: "assistant", content: "support@test.com" },
        { role: "user", content: "Is support available 24/7" },
        {
          role: "user",
          content: "How is 'Social Media Post Generator' built?",
        },
        { role: "assistant", content: "With GPT-3 and Vue.js! " },
        {
          role: "assistant",
          content:
            "No, but email us at support@test.com and we will respond within 1 business day",
        },
        { role: "user", content: "Can I import posts from a URL" },
        {
          role: "assistant",
          content:
            "Yes click the import from URL button at the top of the article page",
        },
        ...messages,
      ],
      temperature: 0,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message);
    return null;
  }
});
