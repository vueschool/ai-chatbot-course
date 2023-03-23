export interface User {
  id: string;
  avatar: string;
  name: string;
}
export interface Message {
  id: string;
  userId: string;
  createdAt: string;
  text: string;
}
export interface AnnouncementComposable {
  text: Ref<string>;
  state: Ref<AsyncState>;
  generate(options: { url: string; temperature: number }): void;
  post(url?: string): void;
}
export type AsyncState = null | "loading" | "error" | "complete";
export type SocialPlatforms = "twitter" | "facebook";
