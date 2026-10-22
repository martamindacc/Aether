import fs from "fs"
import path from "path"
import { fillPrices } from "@/lib/products"

/**
 * The /llms.txt index for AI systems. The text lives in content/llms.txt;
 * prices in it are tokens filled from lib/products.ts, so they always match
 * the booking flow and the schema.
 */
export const dynamic = "force-static"

export function GET() {
  const text = fillPrices(fs.readFileSync(path.join(process.cwd(), "content", "llms.txt"), "utf8"))
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
