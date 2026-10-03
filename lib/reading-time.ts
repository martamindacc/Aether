import type { LanguageCode } from "@/lib/service-content";

/** Reading time at about 220 words per minute, never below one minute. */
export function formatReadingTime(wordCount: number, lang: LanguageCode): string {
  const minutes = Math.max(1, Math.round(wordCount / 220));
  return lang === "no" ? `${minutes} min lesetid` : `${minutes} min read`;
}
