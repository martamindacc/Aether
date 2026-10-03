import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { postPath } from "@/lib/locale-routes"

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
  }))

  const postEntries = getAllPosts().map((post) => ({
    url: `${baseUrl}${postPath(post)}`,
    lastModified: post.modifiedDate,
  }))

  return [...staticEntries, ...postEntries]
}
