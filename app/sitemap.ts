import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"

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
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
  }))

  const postEntries = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.modifiedDate,
  }))

  return [...staticEntries, ...postEntries]
}
