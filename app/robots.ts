import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Make the intended policy explicit for AI/search crawlers that support
      // named user agents. The booking-confirmation pages are noindex rather than
      // disallowed, so crawlers can see that directive.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "DuckAssistBot",
          "meta-externalagent",
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
