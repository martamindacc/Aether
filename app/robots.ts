import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Make the intended policy explicit for AI/search crawlers that support
      // named user agents. Keep private/non-public routes blocked for each
      // named group as well as the catch-all group.
      {
        userAgent: [
          "OAI-SearchBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Google-Extended",
          "Googlebot",
          "Applebot",
          "Amazonbot",
          "Bytespider",
          "CCBot",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/booking-confirmed", "/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/booking-confirmed", "/api/"],
      },
    ],
    sitemap: "https://aetherpractice.com/sitemap.xml",
  }
}
