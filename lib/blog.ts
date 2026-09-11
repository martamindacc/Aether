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
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

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

  const fileName = fs
    .readdirSync(BLOG_DIR)
    .find((name) => name.endsWith(".mdx") && name.replace(/\.mdx$/, "") === slug);

  if (!fileName) return null;

  return readPostFile(fileName);
}
