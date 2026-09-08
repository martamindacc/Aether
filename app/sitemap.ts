import type { MetadataRoute } from "next"

const baseUrl = "https://aetherpractice.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/individual-therapy",
    "/couples-therapy",
    "/family-support",
    "/executive-founder-work",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
