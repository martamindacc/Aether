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

  // The intensive article became the hub page; the service page stays at /couples-intensive.
  const intensiveHub = [
    { source: "/blog/intensive-couples-therapy", destination: "/intensive-couples-therapy", permanent: true },
    { source: "/blog/online-couples-therapy", destination: "/online-couples-therapy", permanent: true },
  ]

  // Blog images renamed to descriptive, language-consistent filenames; old URLs may be indexed in image search.
  const renamedImages = [
    { source: "/images/couple-separate-rooms-eft.jpg", destination: "/images/woman-dark-room-window-night.jpg", permanent: true },
    { source: "/images/couple-separate-rooms-two-careers.jpg", destination: "/images/two-women-hilltop-san-francisco-bay-bridge.jpg", permanent: true },
    { source: "/images/startup-stress-intimacy-night-city.jpg", destination: "/images/couple-walking-apart-street.jpg", permanent: true },
    { source: "/images/relationship-after-exit-woman-window-city.jpg", destination: "/images/woman-phone-table-window-shadows-city-skyline.jpg", permanent: true },
    { source: "/images/founder-partner-opposite-ends-long-table.jpg", destination: "/images/couple-opposite-ends-long-table-city-window.jpg", permanent: true },
    { source: "/images/startup-stress-couple-walking-apart-street.jpg", destination: "/images/couple-walking-apart-street.jpg", permanent: true },
    { source: "/images/two-careers-couple-overlooking-san-francisco-bay.jpg", destination: "/images/two-women-hilltop-san-francisco-bay-bridge.jpg", permanent: true },
    { source: "/images/founder-marriage-couple-dock-lake-sunset.jpg", destination: "/images/couple-wooden-dock-mountain-lake-dusk.jpg", permanent: true },
    { source: "/images/emotionally-focused-therapy-woman-window-dusk.jpg", destination: "/images/woman-dark-room-window-night.jpg", permanent: true },
    { source: "/images/discernment-counseling-should-we-separate.jpg", destination: "/images/man-alone-chair-empty-room-bright-window.jpg", permanent: true },
    { source: "/images/angular-sculpture-desert-lakebed-dusk.jpg", destination: "/images/concrete-sculpture-desert-lakebed-sunset.jpg", permanent: true },
    { source: "/images/couples-therapy-conversation-city-view.jpg", destination: "/images/couple-coffee-table-window-san-francisco-bay.jpg", permanent: true },
    { source: "/images/concrete-sculpture-desert-lakebed-dusk.jpg", destination: "/images/concrete-sculpture-desert-lakebed-sunset.jpg", permanent: true },
    { source: "/images/two-women-overlooking-san-francisco-bay.jpg", destination: "/images/two-women-hilltop-san-francisco-bay-bridge.jpg", permanent: true },
    { source: "/images/couple-dock-lake-sunset.jpg", destination: "/images/couple-wooden-dock-mountain-lake-dusk.jpg", permanent: true },
    { source: "/images/couple-opposite-ends-long-table.jpg", destination: "/images/couple-opposite-ends-long-table-city-window.jpg", permanent: true },
    { source: "/images/two-mugs-marble-table-morning-light.jpg", destination: "/images/two-coffee-mugs-marble-table-lake-window.jpg", permanent: true },
    { source: "/images/couple-wooden-dock-mountain-lake-sunset.jpg", destination: "/images/couple-wooden-dock-mountain-lake-dusk.jpg", permanent: true },
    { source: "/images/man-woman-walking-apart-sunlit-beige-wall.jpg", destination: "/images/man-woman-walking-apart-beige-wall-shadow.jpg", permanent: true },
    { source: "/images/woman-alone-window-city-skyline.jpg", destination: "/images/woman-phone-table-window-shadows-city-skyline.jpg", permanent: true },
    { source: "/images/woman-alone-table-phone-city-skyline.jpg", destination: "/images/woman-phone-table-window-shadows-city-skyline.jpg", permanent: true },
    { source: "/images/woman-table-phone-sunlit-skyline-window.jpg", destination: "/images/woman-phone-table-window-shadows-city-skyline.jpg", permanent: true },
    { source: "/images/man-alone-dinner-table-set-for-two-evening.jpg", destination: "/images/man-alone-table-for-two-empty-chair-sunlit-wall.jpg", permanent: true },
    { source: "/images/man-alone-dinner-table-empty-chair-evening.jpg", destination: "/images/man-alone-table-for-two-empty-chair-sunlit-wall.jpg", permanent: true },
    { source: "/images/man-alone-dinner-table-wine-glasses-evening.jpg", destination: "/images/man-alone-table-for-two-empty-chair-sunlit-wall.jpg", permanent: true },
    { source: "/images/lattice-figure-sculpture-desert-plain-dusk.jpg", destination: "/images/lattice-figure-sculpture-desert-plain-hazy-sky.jpg", permanent: true },
    { source: "/images/empty-desert-lakebed-mountain-ridge-dusk.jpg", destination: "/images/spired-sculpture-alone-desert-plain-pale-sky.jpg", permanent: true },
    { source: "/images/couples-therapy-after-infidelity.jpg", destination: "/images/two-people-apart-rooftop-pool-city-view.jpg", permanent: true },
    { source: "/images/camper-van-empty-chairs-fire-pit-desert-house.jpg", destination: "/images/camper-van-folding-chairs-fire-pit-white-house.jpg", permanent: true },
    { source: "/images/woman-sun-hat-alone-pool-white-wall-shadows.jpg", destination: "/images/figure-sun-hat-linen-suit-sunlit-wall-reflecting-pool.jpg", permanent: true },
    { source: "/images/woman-sun-hat-walking-alone-pool-pale-wall.jpg", destination: "/images/figure-sun-hat-linen-suit-sunlit-wall-reflecting-pool.jpg", permanent: true },
    { source: "/images/woman-sun-hat-linen-dress-alone-pool-edge.jpg", destination: "/images/figure-sun-hat-linen-suit-sunlit-wall-reflecting-pool.jpg", permanent: true },
    { source: "/images/couple-unpacking-boxes-empty-loft-san-francisco-bay.jpg", destination: "/images/couple-unpacking-boxes-tall-windows-san-francisco-bay.jpg", permanent: true },
  ]

  // The co-founder service is coaching, not therapy; its first URL said therapy.
  const cofounder = [
    { source: "/co-founder-therapy", destination: "/co-founder-coaching", permanent: true },
  ]

  // US targeting is city-level: the statewide California page competed with the San Francisco page.
  const cityFocus = [
    { source: "/couples-therapy-california", destination: "/couples-therapy-san-francisco", permanent: true },
    {
      source: "/guides/couples-therapy-cost-insurance-nyc-california",
      destination: "/guides/couples-therapy-cost-insurance-nyc-san-francisco",
      permanent: true,
    },
    {
      source: "/blog/couples-therapy-cost-insurance-nyc-california",
      destination: "/guides/couples-therapy-cost-insurance-nyc-san-francisco",
      permanent: true,
    },
  ]

  return [...moved, ...removedPolish, ...intensiveHub, ...renamedImages, ...cofounder, ...cityFocus]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve AVIF where supported, WebP otherwise; the JPEG originals stay as the social-preview source.
    formats: ["image/avif", "image/webp"],
    // 85 rather than the default 75: most heroes carry film grain, which turns to speckle at 75.
    qualities: [85],
    // Only blog images and the hero poster go through the optimizer.
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/hero-poster.webp" }],
  },
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
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js inline bootstrap scripts, Google Analytics and Vercel Analytics / Speed Insights.
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://va.vercel-scripts.com",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
              "img-src 'self' data: blob: https:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "media-src 'self'",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
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
