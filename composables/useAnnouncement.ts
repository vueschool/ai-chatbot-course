import { useFetch } from "@vueuse/core";
/**
 * This composables is a base composable
 * meant to be extended by specific soical platform composables
 */
import type { AsyncState, SocialPlatforms } from "@/types";
import type { CreateChatCompletionResponse } from "openai";

interface ComposableOptions {
  platform: SocialPlatforms;
}

export const useAnnouncement = ({ platform }: ComposableOptions) => {
  const state = ref<AsyncState>(null);
  const text = ref("");

  /**
   * Make the request to the backend
   * to generate the soical media announcement
   */
  async function generate(options: { url: string; temperature: number }) {
    try {
      state.value = "loading";

      const res = await fetchWithTimeout<CreateChatCompletionResponse>(
        `/api/announcement`,
        {
          method: "POST",
          body: {
            ...options,
            platform,
          },
        }
      );
      const announcement = res?.choices.at(0)?.message?.content;
      if (announcement) {
        text.value = announcement;
        state.value = "complete";
      } else {
        state.value = "error";
      }
    } catch (err) {
      state.value = "error";
    }
  }

  return {
    text,
    state,
    generate,
  };
};
