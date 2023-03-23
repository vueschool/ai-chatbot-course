import type { AnnouncementComposable } from "@/types";
export const useFacebook = (): AnnouncementComposable => {
  const announcement = useAnnouncement({ platform: "facebook" });
  const { copy } = useClipboard();

  /**
   * We cannot pass the text to the facebook post
   * Thus we'll open the facebook share tab
   * and copy the text to the clipboard to make it easy to add to the post
   */
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
