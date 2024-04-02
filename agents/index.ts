// register all agent files here
export * from "./customerSupportAgent";
export * from "./facebookAgent";
export * from "./twitterAgent";

// and register types here
export type Agent = "facebook" | "twitter" | "customerSupport";

// if using openai v4 use the following import instead:
// import type OpenAI from "openai";
import type { CreateChatCompletionRequest } from "openai";

// util function for creating trainings with proper typing
export default function createAgent(
  // if using openai v4 change the return type as so:
  // agent: (context: Record<string, any>) => Partial<OpenAI.Chat.ChatCompletionCreateParamsNonStreaming>
  agent: (context: Record<string, any>) => Partial<CreateChatCompletionRequest>
) {
  return agent;
}
