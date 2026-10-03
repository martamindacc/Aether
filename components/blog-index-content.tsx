import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import type { LanguageCode } from "@/lib/service-content";
import { postPath } from "@/lib/locale-routes";
import { formatReadingTime } from "@/lib/reading-time";

const copy = {
  en: {
    heading: "Blog",
    intro: "Notes on relationships, individual growth, family life, and working well under pressure — from the Aether Practice team.",
    empty: "New posts are on the way — check back soon.",
  },
  no: {
    heading: "Blogg",
    intro: "Artikler om relasjoner, personlig utvikling, familieliv og hvordan du kan fungere godt under press — fra teamet i Aether Practice.",
    empty: "Nye artikler kommer snart — følg med.",
  },
} as const;

function formatDate(date: string, language: LanguageCode) {
  const localeMap: Record<string, string> = {
    no: "nb-NO",
    en: "en-US",
  };
  return new Date(date).toLocaleDateString(localeMap[language] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatWordCount(wordCount: number, language: LanguageCode) {
  const localeMap: Record<string, string> = {
    no: "nb-NO",
    en: "en-US",
  };
  const labelMap: Record<string, string> = {
    no: "ord",
    en: "words",
  };
  return `${new Intl.NumberFormat(localeMap[language] || "en-US").format(wordCount)} ${labelMap[language] || "words"}`;
}

export function BlogIndexContent({
  posts,
  language,
}: {
  posts: BlogPostMeta[];
  language: LanguageCode;
}) {
  const t = copy[language] ?? copy.en;

  return (
    <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
      <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
        {t.heading}
      </h1>
      <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
        {t.intro}
      </p>
      <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.length === 0 && (
          <p className="font-[Roboto,Arial,sans-serif] text-lg text-[#383838]">{t.empty}</p>
        )}
        {posts.map((post) => (
          <Link key={post.slug} href={postPath(post)} className="group overflow-hidden rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 transition-colors hover:from-[#eee2db]/60 hover:to-[#eee2db]/30">
            {post.image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                />
              </div>
            )}
            <div className="p-8 sm:p-10">
              <p className="font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-zinc-500">
                {formatDate(post.date, post.lang)} <span aria-hidden="true">·</span> {formatReadingTime(post.wordCount, post.lang)}
              </p>
              <h2 className="mt-3 break-words origin-left font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium tracking-tight text-zinc-900 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:scale-x-105 sm:text-3xl">
                {post.title}
              </h2>
              <p className="mt-4 max-w-3xl font-[Roboto,Arial,sans-serif] text-[14.5px] leading-[1.45] text-[#383838]">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
