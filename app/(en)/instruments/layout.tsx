import type { Viewport } from "next"
import { InstrumentsNav } from "@/components/instruments/instruments-nav"
import { SiteFooter } from "@/components/site-footer"

/**
 * The Instruments section is a deliberately dark part of the site. It uses the
 * shared floating nav and the shared site footer, both in their dark tone
 * (branded "Aether Instruments", no booking button, no language switcher), so
 * /instruments/** matches the rest of the site without changing its appearance.
 */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#141210",
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
      <SiteFooter language="en" tone="dark" />
    </div>
  )
}
