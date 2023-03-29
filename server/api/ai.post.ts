import * as agents from "@/agents";
import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Setup open AI
  const { OPENAI_API_KEY } = useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // send request to Chat Model
  try {
    if (!Object.keys(agents).includes(`${body.agent}Agent`)) {
      throw new Error(`${body.agent} Agent does not exist`);
    }

    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: body.temperature || 1,
      messages: body.messages || [],
      // @ts-expect-error checking above if agent exists
      ...agents[`${body.agent}Agent`](body),
    });
    return data;
  } catch (error) {
    setResponseStatus(500);
    return {
      errors: [(error as Error).message],
    };
  }
});
