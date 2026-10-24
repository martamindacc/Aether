import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { postPath } from "@/lib/locale-routes";
import type { LanguageCode } from "@/lib/service-content";
import { formatReadingTime } from "@/lib/reading-time";

const heading: Record<LanguageCode, string> = { en: "Keep reading", no: "Les videre" };

/**
 * Up to three more articles in the same language: same market first, then the
 * ones sharing the most cluster tags, then the same hub (posts whose CTA points
 * at the same service page, so a general post does not fall back to a niche
 * cluster's newest articles), then newest.
 */
export function pickRelatedPosts(current: Pick<BlogPostMeta, "slug" | "lang" | "market" | "tags" | "relatedService">, all: BlogPostMeta[], count = 3): BlogPostMeta[] {
  return all
    .filter((post) => post.lang === current.lang && post.slug !== current.slug)
    .map((post) => ({
      post,
      sameMarket: post.market === current.market ? 1 : 0,
      shared: post.tags.filter((tag) => current.tags.includes(tag)).length,
      sameHub: post.relatedService === current.relatedService ? 1 : 0,
    }))
    .sort((a, b) => b.sameMarket - a.sameMarket || b.shared - a.shared || b.sameHub - a.sameHub || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, count)
    .map(({ post }) => post);
}

export function RelatedPosts({ posts, language }: { posts: BlogPostMeta[]; language: LanguageCode }) {
  if (posts.length === 0) return null;
  return (
    <aside aria-labelledby="related-posts" className="mt-20 border-t border-zinc-300/80 pt-12">
      <h2 id="related-posts" className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium tracking-tight text-zinc-900">
        {heading[language]}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={postPath(post)}
            className="group overflow-hidden rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#EEE5DB]/40 to-[#EEE5DB]/20 transition-colors hover:from-[#EEE5DB]/60 hover:to-[#EEE5DB]/30"
          >
            <div className="p-6">
              <p className="font-[Roboto,Arial,sans-serif] text-xs uppercase tracking-wide text-zinc-600">
                {formatReadingTime(post.wordCount, language)}
              </p>
              <h3 className="mt-2 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-lg font-medium leading-[1.25] tracking-tight text-zinc-900">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
