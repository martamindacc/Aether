import type { BlogPost } from "@/lib/blog";

/** The H2 that opens a post's reference list, in either language. */
const CITATION_HEADING =
  /^## (Research (and|&) further reading|Sources and further reading|Further reading|Forskning og videre les(n)?ing|Videre lesning)\s*$/i;
/** The in-list pointer to other pages on this site, which is navigation rather than a source. */
const ALSO_READ = /^(also read|les også|se også)\b/i;

/** Markdown → plain text for schema (links keep their text; emphasis markers drop). */
function plain(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Reads the reference list at the end of a post (the "Research and further
 * reading" H2 and its bullets) so BlogPosting `citation` is derived from the
 * visible sources and can never say more than the page does. Returns [] when
 * a post has no such section.
 */
export function extractCitations(post: Pick<BlogPost, "content">): string[] {
  const lines = post.content.split("\n");
  const start = lines.findIndex((line) => CITATION_HEADING.test(line));
  if (start === -1) return [];

  const citations: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (/^## /.test(line)) break;
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (!bullet) continue;
    const text = plain(bullet[1]);
    if (!text || ALSO_READ.test(text)) continue;
    citations.push(text);
  }
  return citations;
}
