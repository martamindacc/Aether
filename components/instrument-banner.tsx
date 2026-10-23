"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"
import { sendGAEvent } from "@/components/google-analytics"
import { InstrumentMark } from "@/components/instruments/instrument-ui"

/**
 * The AET01 banner placed inside an article, at the point where the text
 * tells the reader to rehearse a hard conversation. Write `<InstrumentBanner />`
 * on its own line in the MDX. Same dark tile as the home page's Instruments
 * band, so readers recognise it. Clicks are tracked per article.
 */
export function InstrumentBanner() {
  const pathname = usePathname()

  function onClick() {
    const params = { instrument: "aet01", page: pathname }
    track("instrument_banner_click", params)
    sendGAEvent("instrument_banner_click", params)
  }

  return (
    <Link
      id="aet01"
      href="/instruments/conflict"
      onClick={onClick}
      className="group mt-12 mb-2 flex scroll-mt-40 flex-col gap-6 rounded-2xl border border-[#2E2824] bg-[#1A1613] p-7 transition-colors hover:border-[#D99148]/40 sm:flex-row sm:items-center sm:gap-8 sm:p-9"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 90% 80% at 20% 0%, rgba(209, 184, 168, 0.12) 0%, transparent 62%), linear-gradient(168deg, #221B16 0%, #1A1613 48%, #141210 100%)",
      }}
    >
      <InstrumentMark className="w-14 rounded-[22%] sm:w-16" />
      <div className="sm:flex-1">
        <p className="font-[Roboto,Arial,sans-serif] text-xs uppercase tracking-[0.18em] text-[#93857B]">
          AET01 Conflict
        </p>
        <p className="mt-2 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium leading-[1.15] tracking-tight text-[#F3E6DD] sm:text-3xl">
          Fix the fight before you have it.
        </p>
        <p className="mt-3 font-[Roboto,Arial,sans-serif] text-[17px] leading-[1.5] text-[#A3968C]">
          Rehearse it against an AI partner who doesn&apos;t back down. Two minutes, a score, and the line that would
          have held.
        </p>
        <p className="mt-4 font-[Roboto,Arial,sans-serif] text-[17px] font-medium text-[#D99148] transition-colors group-hover:text-[#F3E6DD]">
          Open AET01 ↗
          {/* Remove this once the store links are set in app/(en)/instruments/conflict/page.tsx. */}
          <span className="ml-3 font-normal text-[#93857B]">Coming to iOS and Android</span>
        </p>
      </div>
    </Link>
  )
}
