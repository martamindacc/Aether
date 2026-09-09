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
    "/couples-therapy-new-york-city",
    "/family-support",
    "/executive-founder-work",
    "/online-therapy-norway",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
