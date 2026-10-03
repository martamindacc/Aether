import type { BlogPost } from "@/lib/blog";

export type FaqItem = { question: string; answer: string };

const FAQ_HEADING = /^## .*(FAQ|frequently asked|common questions|vanlige spørsmål|spørsmål)/i;

/** Markdown → plain text for schema answers (links keep their text; emphasis markers drop). */
function plain(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Reads the FAQ section of a post (an H2 that names it, followed by H3
 * questions with their answer paragraphs) so FAQPage schema is derived from
 * the visible content and can never drift from it. Returns [] when a post
 * has no such section or the section has no H3 questions.
 */
export function extractFaq(post: Pick<BlogPost, "content">): FaqItem[] {
  const lines = post.content.split("\n");
  const start = lines.findIndex((line) => FAQ_HEADING.test(line));
  if (start === -1) return [];

  const items: FaqItem[] = [];
  let current: { question: string; answer: string[] } | null = null;
  const flush = () => {
    if (current && current.answer.length) {
      items.push({ question: plain(current.question), answer: plain(current.answer.join(" ")) });
    }
    current = null;
  };

  for (const line of lines.slice(start + 1)) {
    if (/^## /.test(line)) break;
    if (/^### /.test(line)) {
      flush();
      current = { question: line.replace(/^### /, ""), answer: [] };
      continue;
    }
    if (current && line.trim()) current.answer.push(line);
  }
  flush();
  return items;
}
