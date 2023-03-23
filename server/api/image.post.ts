import { getOpenAI } from "@/server/utils";
import { AxiosError } from "axios";
export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event);

  const openai = getOpenAI();
  try {
    const { data } = await openai.createImage({
      prompt,
      n: 4,
      size: "1024x1024",
    });
    return data;
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.message);
    return null;
  }
});
