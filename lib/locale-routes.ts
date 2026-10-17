import type { LanguageCode } from "@/lib/service-content";
import type { BlogPostMeta } from "@/lib/blog";

/**
 * Every page exists as a real URL in both English and Norwegian. The URL is
 * the single source of truth for the language a page renders in, so search
 * engines index each language separately and the server HTML is already in
 * the right language. English lives at the root, Norwegian under /no.
 */
export type LocalizedPageKey =
  | "home"
  | "couples"
  | "intensive"
  | "individual"
  | "family"
  | "executive"
  | "about"
  | "contact"
  | "privacy"
  | "bookingConfirmed"
  | "blog"
  | "guides";

export const localizedPaths: Record<LocalizedPageKey, Record<LanguageCode, string>> = {
  home: { en: "/", no: "/no" },
  couples: { en: "/couples-therapy", no: "/no/parterapi" },
  intensive: { en: "/couples-intensive", no: "/no/parintensiv" },
  individual: { en: "/individual-therapy", no: "/no/individuell-terapi" },
  family: { en: "/family-support", no: "/no/familieterapi" },
  executive: { en: "/executive-founder-work", no: "/no/ledere-og-grundere" },
  about: { en: "/about", no: "/no/om-oss" },
  contact: { en: "/contact", no: "/no/kontakt" },
  privacy: { en: "/privacy", no: "/no/personvern" },
  bookingConfirmed: { en: "/booking-confirmed", no: "/no/bestilling-bekreftet" },
  blog: { en: "/blog", no: "/no/blog" },
  guides: { en: "/guides", no: "/no/guides" },
};

/** A link target per language, for the language menu. */
export type LanguageLink = { code: LanguageCode; href: string };

/** Language-menu links for a page that exists in both languages. */
export function languageLinksFor(page: LocalizedPageKey): LanguageLink[] {
  return (["en", "no"] as const).map((code) => ({ code, href: localizedPaths[page][code] }));
}

/** Where the logo and "home" links point for a given language. */
export function homePath(lang: LanguageCode): string {
  return localizedPaths.home[lang];
}

/** hreflang alternates for `pageMetadata({ languages })`, with English as x-default. */
export function hreflangFor(page: LocalizedPageKey): Record<string, string> {
  const { en, no } = localizedPaths[page];
  return { en, no, "x-default": en };
}

/** True when `href` is any language version of `page` (hides the current page from related-service lists). */
export function isPathOf(page: LocalizedPageKey, href: string): boolean {
  return href === localizedPaths[page].en || href === localizedPaths[page].no;
}

/** True for URLs that belong to the Norwegian section of the site. */
export function isNorwegianPath(pathname: string): boolean {
  return pathname === "/no" || pathname.startsWith("/no/") || pathname === "/online-therapy-norway";
}

/** The blog index that lists a post: the Norwegian hub for market "norway", the English hub for "us". */
export function blogIndexPathFor(post: Pick<BlogPostMeta, "market">): string {
  return localizedPaths.blog[post.market === "norway" ? "no" : "en"];
}

/** URL path of a post: English posts live under /blog (guides under /guides), Norwegian under /no/blog (/no/guides). */
export function postPath(post: Pick<BlogPostMeta, "slug" | "lang" | "kind">): string {
  return `${localizedPaths[post.kind === "guide" ? "guides" : "blog"][post.lang]}/${post.slug}`;
}
