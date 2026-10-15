/**
 * Checks that every bookable session in lib/products.ts points at a cal.com
 * event that actually exists.
 *
 * A renamed or recreated cal.com event breaks the link silently: nothing in the
 * app errors, the booking modal still offers the session, and the visitor lands
 * on a 404 at the moment they were trying to pay. This is the only place that
 * catches it.
 *
 *   pnpm check:booking
 *
 * Exits non-zero if any link is dead, so CI can fail on it.
 */

import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const PRODUCTS = path.join(root, "lib/products.ts")
const TIMEOUT_MS = 15000
const RETRIES = 2

/** Pull id + calendlyUrl straight out of the source, so the check needs no build step. */
async function readProducts() {
  const src = await readFile(PRODUCTS, "utf8")
  const entries = [...src.matchAll(/id:\s*"([^"]+)"[\s\S]*?calendlyUrl:\s*"([^"]+)"/g)].map(
    ([, id, url]) => ({ id, url }),
  )
  if (entries.length === 0) {
    throw new Error(
      `No products found in ${path.relative(root, PRODUCTS)}. The file's shape probably changed; update this script's parser.`,
    )
  }
  return entries
}

/** A dead cal.com event answers 404. Network trouble is not a dead link, so it retries. */
async function check({ id, url }) {
  let lastError
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      })
      if (response.status === 404) return { id, url, state: "dead", detail: "404" }
      if (!response.ok) return { id, url, state: "dead", detail: `HTTP ${response.status}` }
      return { id, url, state: "ok" }
    } catch (error) {
      lastError = error
      if (attempt < RETRIES) await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)))
    }
  }
  // Could not reach the host at all. Report it, but do not call a link dead on a network failure.
  return { id, url, state: "unreachable", detail: lastError?.message ?? "unknown error" }
}

const products = await readProducts()
const results = await Promise.all(products.map(check))

const width = Math.max(...results.map((r) => r.id.length))
for (const r of results) {
  const mark = r.state === "ok" ? "ok  " : r.state === "dead" ? "DEAD" : "??  "
  const detail = r.detail ? `  (${r.detail})` : ""
  console.log(`  ${mark}  ${r.id.padEnd(width)}  ${r.url}${detail}`)
}

const dead = results.filter((r) => r.state === "dead")
const unreachable = results.filter((r) => r.state === "unreachable")

console.log()
if (dead.length > 0) {
  console.error(
    `${dead.length} booking link${dead.length === 1 ? "" : "s"} dead. Visitors selecting ` +
      `${dead.map((d) => d.id).join(", ")} land on a 404.\n` +
      `Fix the calendlyUrl in lib/products.ts, or republish the event on cal.com.`,
  )
  process.exit(1)
}
if (unreachable.length > 0) {
  // Not a failure: cal.com being unreachable says nothing about whether the link is right.
  console.warn(`Could not reach ${unreachable.length} link(s). Check again when the network settles.`)
  process.exit(0)
}
console.log(`All ${results.length} booking links resolve.`)
