import { getOpenAI } from "@/server/utils";
import { AxiosError } from "axios";
export default defineEventHandler(async (event) => {
  const { url, temperature } = await readBody(event);

  console.log(temperature);

  const openai = getOpenAI();
  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an exciting social media influencer sharing a new blog post",
        },
        {
          role: "user",
          content: `Create a tweet about the following article:  ${url}. Use line breaks for easy reading. MUST be shorter than 280 characters! MUST include URL`,
        },
      ],
      temperature,
      max_tokens: 280,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message);
    return null;
  }
});
