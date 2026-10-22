import type { MetadataRoute } from "next"
import { getAllPosts, getTranslationsForPost } from "@/lib/blog"
import { getAllHubs } from "@/lib/hubs"
import { hubLanguages } from "@/components/hub-page"
import { localizedPaths, postPath } from "@/lib/locale-routes"
import routeDates from "@/lib/route-dates.json"

const baseUrl = "https://aetherpractice.com"

// Dates come from git (scripts/route-dates.mjs writes lib/route-dates.json
// before each local build): the last commit that touched the files behind each
// page. Add a route here and in scripts/route-files.mjs together.
const routePaths = [
  "",
  "/about",
  "/blog",
  "/no/blog",
  "/contact",
  "/privacy",
  "/individual-therapy",
  "/couples-therapy",
  "/couples-intensive",
  "/family-support",
  "/co-founder-coaching",
  "/executive-founder-work",
  "/online-therapy-norway",
  "/instruments",
  "/instruments/conflict",
  // /instruments/conflict/privacy and /support are noindex placeholders until
  // the policy and support address exist; a noindex page does not belong in the
  // sitemap. Add them back when they go live.
  // Norwegian versions of the home, service, about and contact pages.
  "/no",
  "/no/parterapi",
  "/no/parintensiv",
  "/no/individuell-terapi",
  "/no/familieterapi",
  "/no/ledere-og-grundere",
  "/no/om-oss",
  "/no/kontakt",
  "/no/personvern",
] as const

const routes = routePaths.map((path) => {
  const lastModified = (routeDates as Record<string, string>)[path]
  if (!lastModified) throw new Error(`sitemap: no date for ${path || "/"} in lib/route-dates.json; run npm run routes:dates`)
  return { path, lastModified }
})

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
      ...(post.image ? { images: [`${baseUrl}${post.image}`] } : {}),
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

  const hubEntries = getAllHubs().map((hub) => {
    const languages = hubLanguages(hub)
    return {
      url: `${baseUrl}${hub.path}`,
      lastModified: hub.modifiedDate,
      ...(languages ? { alternates: { languages: Object.fromEntries(Object.entries(languages).map(([k, v]) => [k, `${baseUrl}${v}`])) } } : {}),
    }
  })

  return [...staticEntries, ...hubEntries, ...postEntries]
}
