import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

/**
 * Permanent redirects for blog URLs that moved.
 *
 * Norwegian posts used to live under /blog alongside English ones; they now
 * live under /no/blog so each language has its own section. Each Norwegian
 * post's old URL redirects to its new one. The two Polish posts were removed
 * and redirect to their English translations.
 */
function blogRedirects() {
  const dir = path.join(process.cwd(), "content/blog")
  if (!fs.existsSync(dir)) return []

  const moved = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const { data } = matter(fs.readFileSync(path.join(dir, name), "utf8"))
      return { slug: data.slug ?? name.replace(/\.mdx$/, ""), lang: data.lang ?? "en" }
    })
    .filter((post) => post.lang === "no")
    .map((post) => ({
      source: `/blog/${post.slug}`,
      destination: `/no/blog/${post.slug}`,
      permanent: true,
    }))

  const removedPolish = [
    { source: "/blog/8-znakow-potrzeba-terapii-par", destination: "/blog/8-signs-need-couples-therapy", permanent: true },
    { source: "/blog/terapia-par-dla-founderow-dyrektorow", destination: "/blog/couples-therapy-founders-executives", permanent: true },
  ]

  return [...moved, ...removedPolish]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // One 404 page for the whole site; needed because each language has its own root layout.
    globalNotFound: true,
  },
  async redirects() {
    return blogRedirects()
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
