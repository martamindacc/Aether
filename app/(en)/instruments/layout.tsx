import type { Viewport } from "next"
import Link from "next/link"
import { InstrumentsNav } from "@/components/instruments/instruments-nav"

/**
 * The Instruments section is a deliberately dark part of the site: it does not
 * render the light site footer. It uses the shared floating nav (branded
 * "Aether Instruments", no booking button) and its own footer, so
 * /instruments/** is self-contained and nothing outside it changes appearance.
 */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#141210",
}

function InstrumentsFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="h-px w-full bg-[#2E2A24]" />
      <div className="flex flex-col gap-4 pt-8 font-[Roboto,Arial,sans-serif] text-sm text-[#6A635A] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-6">
          <Link href="/" className="transition-colors hover:text-[#A39A8C]">
            Aether Practice
          </Link>
          <Link href="/contact" className="transition-colors hover:text-[#A39A8C]">
            Contact
          </Link>
        </div>
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Aether Practice. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function InstrumentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#141210] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-[#F3EBDD]">
      <InstrumentsNav />
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-6">
        {children}
      </main>
      <InstrumentsFooter />
    </div>
  )
}
