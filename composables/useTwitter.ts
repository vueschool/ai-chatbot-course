import type { AnnouncementComposable } from "@/types";
export const useTwitter = (): AnnouncementComposable => {
  const announcement = useAnnouncement({ platform: "twitter" });

  function post() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        announcement.text.value
      )}`,
      "_blank"
    );
  }
  return {
    ...announcement,
    post,
  };
};
