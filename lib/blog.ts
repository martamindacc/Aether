import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  relatedService: string;
  lang: "en" | "no";
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
  /** Path to a hero/thumbnail image, e.g. "/images/my-post.jpg". */
  image?: string;
  /** CSS object-position for the thumbnail crop, e.g. "bottom", "top", "center". Defaults to "center". */
  imagePosition?: string;
  /** Short standfirst shown under the title, before the table of contents. */
  lede?: string;
  /** Extra introductory paragraphs shown after the table of contents, before the body. */
  intro?: string[];
  /** Table of contents: the label to show and the exact H2 text it links to. */
  toc?: { label: string; heading: string }[];
  /**
   * Hand-written FAQ for the FAQPage schema. Only needed when the schema should
   * differ from the post's own FAQ section, which is otherwise read automatically.
   */
  faq?: { question: string; answer: string }[];
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
    lang: (data.lang as "en" | "no") ?? "en",
    keywords: (data.keywords as string[]) ?? [],
    seoTitle: data.seoTitle as string | undefined,
    seoDescription: data.seoDescription as string | undefined,
    author: (data.author as string) ?? "Aether Practice",
    modifiedDate: (data.modifiedDate as string) ?? (data.date as string),
    wordCount: countWords(content),
    translationKey: data.translationKey as string | undefined,
    image: data.image as string | undefined,
    imagePosition: data.imagePosition as string | undefined,
    lede: data.lede as string | undefined,
    intro: data.intro as string[] | undefined,
    toc: data.toc as { label: string; heading: string }[] | undefined,
    faq: data.faq as { question: string; answer: string }[] | undefined,
    content,
  };
}

/**
 * All posts, newest first. Cached per request so layouts, metadata and pages
 * that run for the same render share one read of the content directory.
 */
export const getAllPosts = cache((): BlogPostMeta[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const { content, ...meta } = readPostFile(fileName);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPostBySlug = cache((slug: string): BlogPost | null => {
  if (!fs.existsSync(BLOG_DIR)) return null;

  for (const name of fs.readdirSync(BLOG_DIR)) {
    if (name.endsWith(".mdx")) {
      const post = readPostFile(name);
      if (post.slug === slug) return post;
    }
  }

  return null;
});

/**
 * Returns the genuine translated versions of a post, including the post
 * itself. Posts are only linked when they share a `translationKey` — a post
 * without one (no real translation exists) resolves to just itself.
 */
export function getTranslationsForPost(post: BlogPostMeta): BlogPostMeta[] {
  if (!post.translationKey) return [post];
  return getAllPosts().filter((p) => p.translationKey === post.translationKey);
}

/** The html-lang value for a post language (Norwegian uses "nb", per the project convention). */
export function htmlLangFor(lang: BlogPostMeta["lang"]): string {
  return lang === "no" ? "nb" : "en";
}
