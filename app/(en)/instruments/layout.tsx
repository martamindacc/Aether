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
 * The light over the masthead. It sits at the top of the page and scrolls away
 * with it, rather than following the viewport — the page is lit where the
 * header and the headline are, and settles into flat #141210 below.
 *
 * The band is sized and anchored to the top, and its ramp ends on #141210, the
 * same colour the element is filled with, so there is no seam where the band
 * stops. #141210 itself is unchanged. The hues are the hero video's family
 * (~25) rather than the ember's 30, so Instruments reads as the same desert as
 * the rest of the site. The washes are sampled video sand rather than the ember:
 * the ember sits at saturation 0.66 against the video's 0.15-0.31, which is what
 * made the band read amber even after its hue was right.
 */
const field = {
  backgroundImage: [
    "radial-gradient(ellipse 90% 60% at 22% 10%, rgba(209, 184, 168, 0.13) 0%, transparent 60%)",
    "radial-gradient(ellipse 80% 55% at 80% 32%, rgba(220, 195, 177, 0.06) 0%, transparent 58%)",
    "linear-gradient(to bottom, #221B16 0%, #1D1815 50%, #141210 100%)",
  ].join(", "),
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top center",
  backgroundSize: "100% 760px, 100% 760px, 100% 820px",
}

export default function InstrumentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      style={field}
      className="flex min-h-screen flex-col bg-[#141210] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-[#F3E6DD]"
    >
      <InstrumentsNav />
      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-6">
        {children}
      </main>
      <SiteFooter language="en" tone="dark" />
    </div>
  )
}
