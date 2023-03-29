import { getOpenAI } from "@/server/utils";
import * as trainings from "@/training";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const openai = getOpenAI();

  try {
    if (!Object.keys(trainings).includes(`${body.training}Training`)) {
      throw new Error(`Training ${body.training} does not exist`);
    }

    const { data } = await openai.createChatCompletion({
      model: body.model || "gpt-3.5-turbo",
      temperature: body.temperature || 1,
      messages: body.messages || [],
      // @ts-expect-error checking above if training exists
      ...trainings[`${body.training}Training`](body),
    });
    return data;
  } catch (error) {
    setResponseStatus(500);
    return {
      errors: [(error as Error).message],
    };
  }
});
