import type { CreateChatCompletionRequest } from "openai";
export default function createTraining(
  training: (
    context: Record<string, any>
  ) => Partial<CreateChatCompletionRequest>
) {
  return training;
}
