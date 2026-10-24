import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import type { LanguageCode } from "@/lib/service-content";
import { localizedPaths, postPath } from "@/lib/locale-routes";

const copy: Record<LanguageCode, { eyebrow: string; allLink: string }> = {
  en: { eyebrow: "FROM THE BLOG", allLink: "All articles →" },
  no: { eyebrow: "FRA BLOGGEN", allLink: "Alle artikler →" },
};

function formatBlogDate(date: string, lang: string): string {
  const localeMap: Record<string, string> = { no: "nb-NO", en: "en-US" };
  return new Date(date)
    .toLocaleDateString(localeMap[lang] ?? "en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    .toUpperCase();
}

/**
 * The home page's "From the blog" band, for a service page: the same tinted
 * band, eyebrow, link and cards, with the posts the page picks. The home page
 * keeps its own copy inline (components/home-client.tsx is frozen); keep the
 * two in step.
 */
export function BlogBand({ posts, language }: { posts: BlogPostMeta[]; language: LanguageCode }) {
  if (posts.length === 0) return null;
  const t = copy[language];

  return (
    <section className="w-full bg-[#F1EAE2] py-28 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col px-6 sm:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-px w-8 bg-[#C9AB88]" />
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">{t.eyebrow}</p>
          </div>
          <Link
            href={localizedPaths.blog[language]}
            className="text-xs uppercase tracking-[0.1em] text-zinc-600 transition-colors hover:text-zinc-900"
          >
            {t.allLink}
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={postPath(post)}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#FBF8F5] shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
            >
              <div className="flex flex-col px-6 pb-8 pt-8">
                <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-600">
                  {post.tags[0] ? `${post.tags[0]} · ` : ""}{formatBlogDate(post.date, language)}
                </p>
                <h3 className="mt-3 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-[20px] font-medium leading-[1.25] tracking-tight text-zinc-900">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
