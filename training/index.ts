// register all training files here
export * from "./trainCustomerSupport";
export * from "./trainFacebook";
export * from "./trainTwitter";

// and register types here
export type Training = "facebook" | "twitter" | "customerSupport";

// util function for creating trainings with proper typing
import type { CreateChatCompletionRequest } from "openai";
export default function createTraining(
  training: (
    context: Record<string, any>
  ) => Partial<CreateChatCompletionRequest>
) {
  return training;
}
