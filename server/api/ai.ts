import { Configuration, OpenAIApi } from "openai";
export default defineEventHandler(async (event) => {
  const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const { data } = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 7,
  });
  return data;
});
