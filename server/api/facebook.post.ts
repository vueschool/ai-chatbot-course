import { getOpenAI } from "@/server/utils";
import { AxiosError } from "axios";
export default defineEventHandler(async (event) => {
  const { url, temperature } = await readBody(event);

  const openai = getOpenAI();
  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly social media influencer sharing a new blog post",
        },
        {
          role: "user",
          content: `Create a facebook post to hype the following article:  ${url}. Use line breaks for easy reading`,
        },
      ],
      temperature,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message);
    return null;
  }
});
