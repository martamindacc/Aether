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

/**
 * The lit field the Instruments pages sit on. #141210 stays the background
 * colour and the middle stop of the ramp, so the section reads as the same
 * dark it always was — the gradient only lifts one corner and deepens the
 * opposite one, and two very low ember washes pool light into it. Every layer
 * is attached to the viewport rather than the document, so the light stays put
 * while the page scrolls instead of stretching over the length of the page.
 */
const field = {
  backgroundImage: [
    "radial-gradient(ellipse 80% 55% at 22% 12%, rgba(217, 145, 72, 0.10) 0%, transparent 62%)",
    "radial-gradient(ellipse 70% 50% at 82% 72%, rgba(191, 162, 127, 0.07) 0%, transparent 58%)",
    "linear-gradient(160deg, #251C13 0%, #141210 46%, #0A0806 100%)",
  ].join(", "),
  backgroundAttachment: "fixed, fixed, fixed",
}

export default function InstrumentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      style={field}
      className="flex min-h-screen flex-col bg-[#141210] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-[#F3EBDD]"
    >
      <InstrumentsNav />
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-6">
        {children}
      </main>
      <SiteFooter language="en" tone="dark" />
    </div>
  )
}
