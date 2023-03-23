import { getOpenAI } from "@/server/utils";
import { AxiosError } from "axios";
export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);

  const openai = getOpenAI();
  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "you are an illustrator looking for to get ideas for a social sharing image from an article",
        },
        {
          role: "user",
          content: `Create a detailed description of 1 thing to include in an image for the following article: ${url}. Avoid humans. Don't respond with a complete sentence, just the description. Do not include words in the decription`,
        },
      ],
      temperature: 1,
      max_tokens: 50,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message);
    return null;
  }
});
