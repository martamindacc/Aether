import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const HUBS_DIR = path.join(process.cwd(), "content/hubs");

/**
 * A hub is a service-style landing page written in MDX, one per file under
 * content/hubs. It sits at a top-level URL (not under /blog), carries Service
 * schema rather than BlogPosting, and is the parent the posts in its cluster
 * point their CTA at via `relatedService`. English hubs live at the root,
 * Norwegian ones under /no; a shared `translationKey` pairs them for hreflang.
 */
export type HubPage = {
  slug: string;
  /** Top-level path the hub is served at, e.g. "/couples-therapy-for-founders". */
  path: string;
  lang: "en" | "no";
  translationKey?: string;
  /** Alternate-language page paths when the twin is not a hub, e.g. { no: "/no/parintensiv" }. */
  alternates?: Partial<Record<"en" | "no", string>>;
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

function readHubFile(fileName: string): HubPage {
  const slug = fileName.replace(/\.mdx$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(HUBS_DIR, fileName), "utf8"));
  return {
    slug,
    path: (data.path as string) ?? `/${slug}`,
    lang: (data.lang as "en" | "no") ?? "en",
    translationKey: data.translationKey as string | undefined,
    alternates: data.alternates as HubPage["alternates"],
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
}

export const getAllHubs = cache((): HubPage[] => {
  if (!fs.existsSync(HUBS_DIR)) return [];
  return fs
    .readdirSync(HUBS_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map(readHubFile);
});

export const getHubBySlug = cache((slug: string): HubPage | null => {
  return getAllHubs().find((hub) => hub.slug === slug) ?? null;
});

/** The hub itself plus its genuine translations (those sharing its translationKey). */
export function getHubTranslations(hub: HubPage): HubPage[] {
  if (!hub.translationKey) return [hub];
  return getAllHubs().filter((h) => h.translationKey === hub.translationKey);
}
