import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const HUBS_DIR = path.join(process.cwd(), "content/hubs");

/**
 * A hub is a service-style landing page written in MDX, one per file under
 * content/hubs. It sits at a top-level URL (not under /blog), carries Service
 * schema rather than BlogPosting, and is the parent the posts in its cluster
 * point their CTA at via `relatedService`.
 */
export type HubPage = {
  slug: string;
  /** Top-level path the hub is served at, e.g. "/couples-therapy-for-founders". */
  path: string;
  title: string;
  seoTitle?: string;
  description: string;
  lede?: string;
  date: string;
  modifiedDate: string;
  keywords: string[];
  /** Places named in the Service schema. */
  areaServed: string[];
  content: string;
};

export const getHubBySlug = cache((slug: string): HubPage | null => {
  const filePath = path.join(HUBS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug,
    path: (data.path as string) ?? `/${slug}`,
    title: data.title as string,
    seoTitle: data.seoTitle as string | undefined,
    description: data.description as string,
    lede: data.lede as string | undefined,
    date: data.date as string,
    modifiedDate: (data.modifiedDate as string) ?? (data.date as string),
    keywords: (data.keywords as string[]) ?? [],
    areaServed: (data.areaServed as string[]) ?? ["New York City", "California", "Norway"],
    content,
  };
});
