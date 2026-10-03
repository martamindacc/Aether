import type { MetadataRoute } from "next"
import { getAllPosts, getTranslationsForPost } from "@/lib/blog"
import { localizedPaths, postPath } from "@/lib/locale-routes"

const baseUrl = "https://aetherpractice.com"

// Update a route's date here when that page's content is materially edited.
const routes: { path: string; lastModified: string }[] = [
  { path: "", lastModified: "2026-09-11" },
  { path: "/about", lastModified: "2026-09-06" },
  { path: "/blog", lastModified: "2026-09-11" },
  { path: "/no/blog", lastModified: "2026-09-11" },
  { path: "/contact", lastModified: "2026-09-07" },
  { path: "/privacy", lastModified: "2026-09-11" },
  { path: "/individual-therapy", lastModified: "2026-09-08" },
  { path: "/couples-therapy", lastModified: "2026-09-08" },
  { path: "/couples-therapy-new-york-city", lastModified: "2026-09-11" },
  { path: "/family-support", lastModified: "2026-09-08" },
  { path: "/executive-founder-work", lastModified: "2026-09-08" },
  { path: "/online-therapy-norway", lastModified: "2026-09-11" },
  // Norwegian versions of the home, service, about and contact pages.
  { path: "/no", lastModified: "2026-10-03" },
  { path: "/no/parterapi", lastModified: "2026-10-03" },
  { path: "/no/individuell-terapi", lastModified: "2026-10-03" },
  { path: "/no/familieterapi", lastModified: "2026-10-03" },
  { path: "/no/ledere-og-grundere", lastModified: "2026-10-03" },
  { path: "/no/om-oss", lastModified: "2026-10-03" },
  { path: "/no/kontakt", lastModified: "2026-10-03" },
  { path: "/no/personvern", lastModified: "2026-10-03" },
]

/** hreflang alternates for a static route that exists in both languages. */
function routeAlternates(path: string) {
  const pair = Object.values(localizedPaths).find((p) => p.en === path || p.no === path)
  if (!pair) return undefined
  return { languages: { en: `${baseUrl}${pair.en}`, no: `${baseUrl}${pair.no}`, "x-default": `${baseUrl}${pair.en}` } }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  // Listing pages change whenever a post does, so they take the newest post date.
  const newestPost = posts.map((post) => post.modifiedDate).sort().at(-1)
  const listingPaths = new Set(["", "/blog", "/no", "/no/blog"])
  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified:
      listingPaths.has(route.path) && newestPost && newestPost > route.lastModified ? newestPost : route.lastModified,
    alternates: routeAlternates(route.path === "" ? "/" : route.path),
  }))

  const postEntries = posts.map((post) => {
    const translations = getTranslationsForPost(post)
    const en = translations.find((t) => t.lang === "en")
    return {
      url: `${baseUrl}${postPath(post)}`,
      lastModified: post.modifiedDate,
      ...(translations.length > 1 && en
        ? {
            alternates: {
              languages: {
                ...Object.fromEntries(translations.map((t) => [t.lang, `${baseUrl}${postPath(t)}`])),
                "x-default": `${baseUrl}${postPath(en)}`,
              },
            },
          }
        : {}),
    }
  })

  return [...staticEntries, ...postEntries]
}
