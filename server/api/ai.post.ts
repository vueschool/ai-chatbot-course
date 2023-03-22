import { Configuration, OpenAIApi } from "openai";
import { AxiosError } from "axios";
export default defineEventHandler(async (event) => {
  const { OPENAI_API_KEY } = useRuntimeConfig();

  const { messages } = await readBody(event);

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful customer support agent for a software as a service that takes a blog post and products announcements for social media outlets, like twitter, facebook, and reddit.",
        },
        { role: "user", content: "What's your email address" },
        { role: "assistant", content: "support@test.com" },
        { role: "user", content: "Is support available 24/7" },
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
      temperature: 0.2,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message);
    return null;
  }
});
