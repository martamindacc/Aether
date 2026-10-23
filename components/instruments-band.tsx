"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";
import { sendGAEvent } from "@/components/google-analytics";
import { InstrumentMark } from "@/components/instruments/instrument-ui";
import type { LanguageCode } from "@/lib/service-content";

/**
 * The home page's Instruments band, closing every article and both blog
 * indexes before the footer.
 * The home page keeps its own copy inline (components/home-client.tsx has
 * frozen parts); keep the two in step. Clicks are tracked per page,
 * separately from the in-article banner.
 */
const instrumentsField = {
  backgroundImage: [
    "radial-gradient(ellipse 90% 80% at 20% 0%, rgba(209, 184, 168, 0.12) 0%, transparent 62%)",
    "radial-gradient(ellipse 70% 60% at 85% 100%, rgba(220, 195, 177, 0.05) 0%, transparent 58%)",
    "linear-gradient(168deg, #221B16 0%, #1A1613 48%, #141210 100%)",
  ].join(", "),
};

const copy: Record<LanguageCode, { eyebrow: string; heading: string; body: string; tagline: string; cta: string }> = {
  en: {
    eyebrow: "Aether Instruments",
    heading: "Tools for the human condition.",
    body: "Purpose-built instruments for practicing the moments that matter.",
    tagline: "Rehearse the argument before you have it.",
    cta: "See all instruments",
  },
  no: {
    eyebrow: "Aether Instruments",
    heading: "Verktøy for det menneskelige.",
    body: "Instrumenter laget for å øve på øyeblikkene som betyr noe.",
    tagline: "Øv på krangelen før du tar den.",
    cta: "Se alle instrumenter",
  },
};

export function InstrumentsBand({ language }: { language: LanguageCode }) {
  const pathname = usePathname();
  const t = copy[language];

  function onClick(target: string) {
    const params = { instrument: "aet01", target, page: pathname };
    track("instruments_band_click", params);
    sendGAEvent("instruments_band_click", params);
  }

  return (
    <section style={instrumentsField} className="w-full bg-[#141210] py-24 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col px-6 sm:px-12">
        <div className="flex items-center gap-5">
          <div className="h-px w-8 bg-[#D99148]" />
          <p className="text-xs uppercase tracking-[0.18em] text-[#93857B]">{t.eyebrow}</p>
        </div>
        <h2 className="mt-7 max-w-3xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium leading-[1.05] tracking-tight text-[#F3E6DD] sm:text-5xl">
          {t.heading}
        </h2>
        <p className="mt-5 max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#A3968C]">
          {t.body}
        </p>

        <Link
          href="/instruments/conflict"
          onClick={() => onClick("conflict")}
          className="group mt-12 flex flex-col gap-6 rounded-2xl border border-[#2E2824] bg-[#28231F] p-7 transition-colors hover:border-[#D99148]/40 sm:flex-row sm:items-center sm:gap-10 sm:p-9"
        >
          <InstrumentMark className="w-16 rounded-[22%] sm:w-20" />
          <div className="sm:flex-1">
            <h3 className="flex flex-wrap items-baseline gap-x-3 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium tracking-tight text-[#F3E6DD] sm:text-4xl">
              <span className="text-[#93857B]">AET01</span>
              <span>Conflict</span>
            </h3>
            <p className="mt-3 font-[Roboto,Arial,sans-serif] text-[17px] leading-[1.5] text-[#A3968C]">{t.tagline}</p>
          </div>
          <p className="shrink-0 font-[Roboto,Arial,sans-serif] text-[17px] font-medium text-[#D99148] transition-colors group-hover:text-[#F3E6DD]">
            Open instrument ↗
          </p>
        </Link>

        <Link
          href="/instruments"
          onClick={() => onClick("all")}
          className="mt-10 self-start font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-[0.18em] text-[#93857B] transition-colors hover:text-[#F3E6DD]"
        >
          {t.cta} →
        </Link>
      </div>
    </section>
  );
}
