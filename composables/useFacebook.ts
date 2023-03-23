import type { AnnouncementComposable } from "@/types";
export const useFacebook = (): AnnouncementComposable => {
  const announcement = useAnnouncement({ platform: "facebook" });
  const { copy } = useClipboard();

  function post(url: string) {
    copy(announcement.text.value);
    setTimeout(() => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    }, 500);
  }
  return {
    ...announcement,
    post,
  };
};
