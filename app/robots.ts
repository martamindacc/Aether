import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Make the intended policy explicit for AI/search crawlers that support
      // named user agents. The booking-confirmation pages are noindex rather than
      // disallowed, so crawlers can see that directive.
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
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://aetherpractice.com/sitemap.xml",
  }
}
