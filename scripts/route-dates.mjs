// Derives each static route's sitemap lastModified from git: the date of the
// last commit touching the files that produce that page. Writes
// lib/route-dates.json, which app/sitemap.ts imports, so the sitemap's dates
// reflect real edits rather than a hand-maintained list.
//
// Runs before `next build` locally (prebuild). On a shallow clone (Vercel) or
// without git it leaves the committed JSON alone, since a shallow history
// would report the clone's oldest commit rather than the real edit date.
import { execFileSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { routes } from "./route-files.mjs"

const OUT = "lib/route-dates.json"

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim()
}

let shallow
try {
  shallow = git(["rev-parse", "--is-shallow-repository"]) === "true"
} catch {
  console.log(`route-dates: git unavailable, keeping ${OUT}`)
  process.exit(0)
}
if (shallow) {
  console.log(`route-dates: shallow clone, keeping ${OUT}`)
  process.exit(0)
}

const dates = {}
for (const [route, files] of Object.entries(routes)) {
  const date = git(["log", "-1", "--format=%cs", "--", ...files])
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`route-dates: no commit found for ${route || "/"}`)
  dates[route] = date
}

const next = JSON.stringify(dates, null, 2) + "\n"
let previous = ""
try {
  previous = readFileSync(OUT, "utf8")
} catch {}
if (previous !== next) {
  writeFileSync(OUT, next)
  console.log(`route-dates: wrote ${OUT}`)
} else {
  console.log(`route-dates: ${OUT} up to date`)
}
