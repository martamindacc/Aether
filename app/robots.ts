import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/booking-confirmed", "/api/"],
    },
    sitemap: "https://aetherpractice.com/sitemap.xml",
  }
}
