import { getOpenAI } from "@/server/utils";
import twitter from "@/training/twitter";
import facebook from "@/training/facebook";
import type { SocialPlatforms } from "~~/types";
export default defineEventHandler(async (event) => {
  const { url, temperature, platform } = await readBody(event);

  const openai = getOpenAI();

  const trainings = { twitter, facebook };

  try {
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature,
      messages: [],
      ...trainings[platform as SocialPlatforms]({ url }),
    });
    return data;
  } catch (error) {
    setResponseStatus(500);
    return {
      errors: [error],
    };
  }
});
