import type { Metadata } from "next"
import Link from "next/link"
import { localizedPaths } from "@/lib/locale-routes"
import "./globals.css"

/**
 * Site-wide 404 for URLs that match no route. The site has one root layout
 * per language, so this page renders outside both and brings its own
 * document. It is bilingual because the language of an unknown URL is unknown.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://aetherpractice.com"),
  title: "Aether Practice | Page not found",
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased">
        <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
          <section id="main-content" className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
            <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
              Page not found
            </h1>
            <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
              The page you were looking for doesn&apos;t exist or has moved.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={localizedPaths.home.en}
                className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Back to home
              </Link>
              <Link
                href={localizedPaths.blog.en}
                className="border border-zinc-900/20 px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Read the blog
              </Link>
            </div>
            <p lang="nb" className="mt-16 max-w-4xl font-[Roboto,Arial,sans-serif] text-lg leading-[1.5] text-[#383838]">
              Siden finnes ikke eller har flyttet.{" "}
              <Link href={localizedPaths.home.no} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                Til forsiden
              </Link>{" "}
              ·{" "}
              <Link href={localizedPaths.blog.no} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                Les bloggen
              </Link>
            </p>
          </section>
        </main>
      </body>
    </html>
  )
}
