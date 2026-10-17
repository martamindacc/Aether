import { getAllHubs } from "@/lib/hubs"
import { getAllPosts, getPostBySlug, type BlogPostMeta } from "@/lib/blog"
import {
  aboutContent,
  couplesIntensiveContent,
  couplesTherapyContent,
  executiveFounderContent,
  individualTherapyContent,
  type ServicePageContent,
} from "@/lib/service-content"

/**
 * The full-text companion to /llms.txt: every English page's content in one
 * plain-text file, for AI systems that read the whole site rather than the
 * index. Built from the same sources as the pages themselves, so it cannot
 * drift from them. English only; the Norwegian site is not included.
 */
export const dynamic = "force-static"

const BASE = "https://aetherpractice.com"

/** MDX → plain markdown: drop images and tags, make links absolute, tidy blank lines. */
function clean(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/^(import|export) .*$/gm, "")
    .replace(/\]\(\//g, `](${BASE}/`)
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function servicePage(path: string, title: string, c: ServicePageContent): string {
  const lines = [
    `# ${title}`,
    `URL: ${BASE}${path}`,
    "",
    ...(c.subtitle ? [c.subtitle, ""] : []),
    c.intro,
    "",
    ...c.panels.flatMap((p) => [`## ${p.title}`, "", p.description, ""]),
    `## ${c.processHeading}`,
    "",
    ...c.process.map((s) => `${s.number}. ${s.title}: ${s.description}`),
    "",
    `## ${c.outcomesHeading}`,
    "",
    ...c.outcomes.map((o) => `- ${o.title}: ${o.description}`),
    "",
    c.ctaHeading,
    c.ctaSubtext,
  ]
  return lines.join("\n")
}

function aboutPage(): string {
  const a = aboutContent.en
  return [
    `# ${a.title}`,
    `URL: ${BASE}/about`,
    "",
    a.intro,
    "",
    ...a.panels.flatMap((p) => [`## ${p.title}`, "", p.description, ""]),
    `## ${a.valuesHeading}`,
    "",
    ...a.values.map((v) => `- ${v.title}: ${v.description}`),
  ].join("\n")
}

const sectionByService: Record<string, string> = {
  "/co-founder-coaching": "Co-founder cluster (for founding teams)",
  "/couples-therapy-for-founders": "Founder couples",
  "/couples-therapy-executives": "Executives, careers and pressure",
  "/couples-therapy": "Couples therapy: methods, patterns and what to expect",
  "/online-couples-therapy": "Online, long-distance, expat and international couples",
  "/couples-therapy-oslo": "Online, long-distance, expat and international couples",
  "/intensive-couples-therapy": "Couples intensives",
}
const sectionOrder = [...new Set(Object.values(sectionByService))]

function postText(meta: BlogPostMeta): string {
  const post = getPostBySlug(meta.slug)
  if (!post) return ""
  const url = `${BASE}/${post.kind === "guide" ? "guides" : "blog"}/${post.slug}`
  return [
    `# ${post.title}`,
    `URL: ${url}`,
    `Published: ${post.date} · Updated: ${post.modifiedDate}`,
    "",
    ...(post.lede ? [post.lede, ""] : []),
    ...(post.intro?.length ? [...post.intro, ""] : []),
    clean(post.content),
  ].join("\n")
}

export function GET() {
  const posts = getAllPosts().filter((p) => p.lang === "en")
  const hubs = getAllHubs().filter((h) => h.lang === "en")
  const divider = "\n\n---\n\n"

  const services = [
    servicePage("/couples-therapy", "Couples Therapy", couplesTherapyContent.en),
    servicePage("/couples-intensive", "Couples Intensive", couplesIntensiveContent.en),
    servicePage("/individual-therapy", "Individual Therapy", individualTherapyContent.en),
    servicePage("/executive-founder-work", "Executive & Founder Work", executiveFounderContent.en),
    aboutPage(),
  ]

  const hubText = hubs.map((h) =>
    [`# ${h.title}`, `URL: ${BASE}${h.path}`, `Updated: ${h.modifiedDate}`, "", ...(h.lede ? [h.lede, ""] : []), clean(h.content)].join("\n"),
  )

  const guides = posts.filter((p) => p.kind === "guide").map(postText)
  const articles = sectionOrder.map((section) => {
    const inSection = posts.filter((p) => p.kind !== "guide" && sectionByService[p.relatedService] === section)
    return inSection.length ? [`# Section: ${section}`, ...inSection.map(postText)].join(divider) : ""
  }).filter(Boolean)

  const header = [
    "# Aether Practice: full text of the English site",
    "",
    `Index and facts to cite: ${BASE}/llms.txt`,
    "Aether Practice is an online therapy and coaching practice working with couples, individuals, families, founders and executives in New York City, California and Norway. Everything below is the published text of the English pages, in this order: service pages and about, couples therapy hubs, guides, then articles by cluster.",
  ].join("\n")

  const text = [header, "# Section: Services", ...services, "# Section: Couples therapy by place, format and audience", ...hubText, "# Section: Guides", ...guides, ...articles].join(divider) + "\n"

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
