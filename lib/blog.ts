import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  relatedService: string;
  lang: "en" | "no" | "pl";
  keywords?: string[];
  seoTitle?: string;
  seoDescription?: string;
  author?: string;
  modifiedDate?: string;
  wordCount: number;
  /**
   * Shared identifier linking genuine translations of the same article across
   * languages (e.g. all three language versions of "8 signs you need couples
   * therapy" share one translationKey). Omit it on a standalone article that
   * has no translated counterpart.
   */
  translationKey?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function countWords(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~]/g, " ");

  return text.match(/[\p{L}\p{N}]+(?:['’–-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function readPostFile(fileName: string): BlogPost {
  const filePath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) ?? fileName.replace(/\.mdx$/, "");

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    relatedService: data.relatedService as string,
    lang: (data.lang as "en" | "no" | "pl") ?? "en",
    keywords: (data.keywords as string[]) ?? [],
    seoTitle: data.seoTitle as string | undefined,
    seoDescription: data.seoDescription as string | undefined,
    author: (data.author as string) ?? "Aether Practice",
    modifiedDate: (data.modifiedDate as string) ?? (data.date as string),
    wordCount: countWords(content),
    translationKey: data.translationKey as string | undefined,
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const { content, ...meta } = readPostFile(fileName);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  for (const name of fs.readdirSync(BLOG_DIR)) {
    if (name.endsWith(".mdx")) {
      const post = readPostFile(name);
      if (post.slug === slug) return post;
    }
  }

  return null;
}

/**
 * Returns the genuine translated versions of a post, including the post
 * itself. Posts are only linked when they share a `translationKey` — a post
 * without one (no real translation exists) resolves to just itself.
 */
export function getTranslationsForPost(post: BlogPostMeta): BlogPostMeta[] {
  if (!post.translationKey) return [post];
  return getAllPosts().filter((p) => p.translationKey === post.translationKey);
}

/** The site's html-lang convention for a post's language (Norwegian uses "nb", per the project's existing convention). */
export function htmlLangFor(lang: BlogPostMeta["lang"]): string {
  if (lang === "no") return "nb";
  if (lang === "pl") return "pl";
  return "en";
}
