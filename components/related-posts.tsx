import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { postPath } from "@/lib/locale-routes";
import type { LanguageCode } from "@/lib/service-content";
import { formatReadingTime } from "@/lib/reading-time";

const heading: Record<LanguageCode, string> = { en: "Keep reading", no: "Les videre" };

/** Up to three more articles in the same language, the ones sharing the most tags first. */
export function pickRelatedPosts(current: Pick<BlogPostMeta, "slug" | "lang" | "tags">, all: BlogPostMeta[], count = 3): BlogPostMeta[] {
  return all
    .filter((post) => post.lang === current.lang && post.slug !== current.slug)
    .map((post) => ({ post, shared: post.tags.filter((tag) => current.tags.includes(tag)).length }))
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
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
            className="group overflow-hidden rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 transition-colors hover:from-[#eee2db]/60 hover:to-[#eee2db]/30"
          >
            {post.image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 240px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                />
              </div>
            )}
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
