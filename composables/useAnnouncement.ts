import type {
  AsyncState,
  SocialPlatforms,
  AnnouncementComposable,
} from "@/types";
import type { NitroFetchOptions } from "nitropack";
import type { CreateChatCompletionResponse } from "openai";
export const useAnnouncement = ({
  platform,
}: {
  platform: SocialPlatforms;
}): AnnouncementComposable => {
  const state = ref<AsyncState>(null);
  const text = ref("");

  async function generate(options: { url: string; temperature: number }) {
    try {
      state.value = "loading";
      const res = await fetchWithTimeout<CreateChatCompletionResponse>(
        `/api/${platform}`,
        {
          method: "POST",
          body: options,
        }
      );
      const announcement = res?.choices.at(0)?.message?.content;
      if (announcement) text.value = announcement;
      state.value = "complete";
    } catch (err) {
      state.value = "error";
    }
  }

  async function fetchWithTimeout<T>(
    url: string,
    fetchOptions: NitroFetchOptions<any, any> = {}
  ): Promise<T> {
    const controller = new AbortController();
    const id = setTimeout(() => {
      controller.abort();
      throw new Error("Requet timed out");
    }, 10_000);
    const res = await $fetch<T>(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(id);
    return res;
  }

  return {
    text,
    state,
    generate,
    post() {},
  };
};
