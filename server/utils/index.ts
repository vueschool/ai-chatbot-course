import { Configuration, OpenAIApi } from "openai";
export function getOpenAI() {
  const { OPENAI_API_KEY } = useRuntimeConfig();
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  return new OpenAIApi(configuration);
}
