import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import type { HubPage } from "@/lib/hubs";
import type { LanguageCode } from "@/lib/service-content";
import { postPath } from "@/lib/locale-routes";
import { formatReadingTime } from "@/lib/reading-time";

const copy = {
  en: {
    heading: "Blog",
    intro: "Guides and articles on couples therapy, organised by topic: start with the complete guide, go deep in a cluster, or jump to one of our specialised hubs.",
    hubs: "Specialised hubs",
    pillar: "Start here",
    guides: "Long-form guides",
    empty: "New posts are on the way — check back soon.",
  },
  no: {
    heading: "Blogg",
    intro: "Guider og artikler om parterapi, ordnet etter tema: start med den komplette guiden, gå i dybden i en klynge, eller hopp til en av våre spesialiserte huber.",
    hubs: "Spesialiserte huber",
    pillar: "Start her",
    guides: "Dyptgående guider",
    empty: "Nye artikler kommer snart — følg med.",
  },
} as const;

/** Display order of clusters on each index; anything not listed follows alphabetically. */
const clusterOrder: Record<LanguageCode, string[]> = {
  en: ["When to Seek Help", "Communication", "Infidelity & Trust", "Separation", "What to Expect", "Methods", "Careers & Pressure", "Founder Couples", "Couples Intensive", "Online Couples Therapy", "Oslo", "Guides"],
  no: ["Veileder", "Når søke hjelp", "Kommunikasjon", "Nærhet", "Utroskap og tillit", "Samlivsbrudd", "Hva du kan forvente", "Metoder", "Livsfaser", "Karriere og press", "Gründerpar", "Formater", "Pris"],
};

const pillarSlugs = new Set(["couples-therapy-guide", "parterapi-i-oslo"]);

function formatDate(date: string, language: LanguageCode) {
  const localeMap: Record<string, string> = { no: "nb-NO", en: "en-US" };
  return new Date(date).toLocaleDateString(localeMap[language] || "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function PostCard({ post, featured = false }: { post: BlogPostMeta; featured?: boolean }) {
  return (
    <Link
      href={postPath(post)}
      className={`group overflow-hidden rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 transition-colors hover:from-[#eee2db]/60 hover:to-[#eee2db]/30 ${featured ? "md:col-span-3 md:grid md:grid-cols-2" : ""}`}
    >
      {post.image && (
        <div className={`relative w-full overflow-hidden ${featured ? "aspect-[16/9] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"}`}>
          <Image
            src={post.image}
            alt=""
            fill
            sizes={featured ? "(min-width: 768px) 576px, 100vw" : "(min-width: 768px) 384px, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
          />
        </div>
      )}
      <div className="p-8 sm:p-10">
        <p className="font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-zinc-600">
          {formatDate(post.date, post.lang)} <span aria-hidden="true">·</span> {formatReadingTime(post.wordCount, post.lang)}
        </p>
        <h3 className={`mt-3 break-words origin-left font-[NeueHaasDisplayRoman,Arial,sans-serif] font-medium tracking-tight text-zinc-900 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:scale-x-105 ${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
          {post.title}
        </h3>
        <p className="mt-4 max-w-3xl font-[Roboto,Arial,sans-serif] text-[14.5px] leading-[1.45] text-[#383838]">{post.description}</p>
      </div>
    </Link>
  );
}

function SectionHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mt-20 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium tracking-tight text-[#74382f] sm:text-4xl">
      {children}
    </h2>
  );
}

const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Blog index organised as a content hub: the pillar first, then the
 * specialised hub pages, then every article grouped by its cluster tag
 * (tags[1]). Guides are their own group at the end.
 */
export function BlogIndexContent({ posts, hubs, language }: { posts: BlogPostMeta[]; hubs: HubPage[]; language: LanguageCode }) {
  const t = copy[language] ?? copy.en;
  const pillar = posts.find((p) => pillarSlugs.has(p.slug));
  const rest = posts.filter((p) => p !== pillar);
  const groups = new Map<string, BlogPostMeta[]>();
  for (const post of rest) {
    const key = post.kind === "guide" ? t.guides : post.tags[1] ?? "";
    groups.set(key, [...(groups.get(key) ?? []), post]);
  }
  const order = clusterOrder[language];
  const sortedGroups = [...groups.entries()].sort(([a], [b]) => {
    if (a === t.guides) return 1;
    if (b === t.guides) return -1;
    const ia = order.indexOf(a), ib = order.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) || a.localeCompare(b);
  });

  return (
    <section id="main-content" className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
      <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">{t.heading}</h1>
      <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">{t.intro}</p>

      {posts.length === 0 && <p className="mt-20 font-[Roboto,Arial,sans-serif] text-lg text-[#383838]">{t.empty}</p>}

      {pillar && (
        <>
          <SectionHeading id="start-here">{t.pillar}</SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <PostCard post={pillar} featured />
          </div>
        </>
      )}

      {hubs.length > 0 && (
        <>
          <SectionHeading id="hubs">{t.hubs}</SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {hubs.map((hub) => (
              <Link key={hub.path} href={hub.path} className="group rounded-2xl border border-[#c9a87d] bg-[#eee2db]/30 p-8 transition-colors hover:bg-[#eee2db]/60 sm:p-10">
                <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium tracking-tight text-zinc-900 transition-transform duration-300 ease-out group-hover:translate-x-2 sm:text-3xl">{hub.title}</h3>
                <p className="mt-4 font-[Roboto,Arial,sans-serif] text-[14.5px] leading-[1.45] text-[#383838]">{hub.description}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {sortedGroups.map(([name, items]) => (
        <div key={name}>
          <SectionHeading id={slugify(name)}>{name}</SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {items.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
