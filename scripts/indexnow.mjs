// Tells IndexNow (Bing, and through it ChatGPT search) which pages a deploy
// changed. Run by .github/workflows/indexnow.yml after each successful
// production deploy, with the previous and current deployed commits:
//
//   node scripts/indexnow.mjs <from-sha> <to-sha> [--dry-run]
//
// Changed posts and hubs map to their own URLs (plus the blog index they sit
// on); other files map through scripts/route-files.mjs. A change to the price
// list touches every page that quotes a price, so it announces the whole
// sitemap. Files that change no page (components shared by every page, styles,
// scripts) announce nothing: a redesign doesn't need re-indexing.
import { execFileSync } from "node:child_process"
import { routes } from "./route-files.mjs"

const HOST = "aetherpractice.com"
const BASE = `https://${HOST}`
const KEY = "23ca427d89d2a90b627c2d23a08b24c9"

const [from, to, flag] = process.argv.slice(2)
if (!from || !to) throw new Error("usage: node scripts/indexnow.mjs <from-sha> <to-sha> [--dry-run]")

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim()
}

/** A frontmatter field, read from the file as it was at `sha` (so deleted pages still resolve). */
function field(sha, file, name) {
  const source = git(["show", `${sha}:${file}`])
  return source.split("\n---")[0].match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?\\s*$`, "m"))?.[1]
}

const changed = git(["diff", "--name-status", "--no-renames", from, to])
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("\t"))

const paths = new Set()
let everything = false
for (const [status, file] of changed) {
  const sha = status === "D" ? from : to
  if (file === "lib/products.ts") everything = true
  if (/^content\/blog\/[^/]+\.mdx$/.test(file)) {
    const lang = field(sha, file, "lang") ?? "en"
    const section = field(sha, file, "kind") === "guide" ? "guides" : "blog"
    const slug = field(sha, file, "slug") ?? file.split("/").pop().replace(/\.mdx$/, "")
    const prefix = lang === "no" ? "/no" : ""
    paths.add(`${prefix}/${section}/${slug}`)
    paths.add(`${prefix}/blog`)
  } else if (/^content\/hubs\/[^/]+\.mdx$/.test(file)) {
    paths.add(field(sha, file, "path") ?? `/${file.split("/").pop().replace(/\.mdx$/, "")}`)
  }
  for (const [route, sources] of Object.entries(routes)) {
    if (sources.some((source) => file === source || file.startsWith(`${source}/`))) paths.add(route || "/")
  }
}

let urls = [...paths].map((path) => `${BASE}${path === "/" ? "/" : path}`)
if (everything) {
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text()
  urls = [...new Set([...urls, ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])])]
}

if (!urls.length) {
  console.log("indexnow: no page changed, nothing to send")
  process.exit(0)
}
console.log(`indexnow: ${urls.length} URL(s)\n${urls.join("\n")}`)
if (flag === "--dry-run") process.exit(0)

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
})
console.log(`indexnow: HTTP ${response.status}`)
// 200 and 202 are accepted; anything else should fail the job so it shows in GitHub.
if (response.status !== 200 && response.status !== 202) process.exit(1)
