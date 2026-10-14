import Link from "next/link"
import { InstrumentDisclosure, InstrumentMark } from "@/components/instruments/instrument-ui"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Instruments",
  description:
    "Rehearsal tools for the conversations that decide how your life goes. Pilots use simulators and litigators run moots. Nothing important should be improvised.",
  path: "/instruments",
  // The shared site image carries a site-wide alt describing the practice; these
  // pages are the Instruments range, so they name themselves instead.
  image: {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Aether Instruments — nothing important should be improvised",
  },
})

const body = [
  "Pilots use simulators. Litigators run moots. Surgeons practise on cadavers before they practise on you.",
  "The conversations that decide how your life goes are the only high-stakes performance anyone still walks into cold.",
  "Instruments are rehearsal tools for those.",
]

const colophon = [
  {
    label: "On the mark",
    note: "One sun, one horizon. The line never moves. The colour changes with each instrument, so a range of them reads as one range.",
  },
  {
    label: "On the numbering",
    note: "AET and an ordinal, assigned when work begins rather than when it ships. The name follows the number.",
  },
]

export default function Page() {
  return (
    <div className="pb-24 pt-20">
      <div className="h-[3px] w-[72px] bg-[#D99148]" />
      <p className="mt-10 font-[Roboto,Arial,sans-serif] text-[11px] uppercase tracking-[0.18em] text-[#6A635A]">
        Aether Instruments
      </p>
      <p className="mt-3 font-[Roboto,Arial,sans-serif] text-[13px] font-light text-[#6A635A]">
        Tools for the human condition.
      </p>
      <h1 className="mt-8 max-w-[23ch] text-balance text-[44px] font-medium leading-[1.0] tracking-[-0.02em] text-[#F3EBDD] sm:text-[64px] lg:text-[76px]">
        Nothing important should be improvised.
      </h1>
      <div className="mt-10 max-w-[46ch] space-y-5">
        {body.map((paragraph) => (
          <p
            key={paragraph}
            className="font-[Roboto,Arial,sans-serif] text-[1.1rem] font-light leading-[1.7] text-[#A39A8C]"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-20 h-px w-full bg-[#2E2A24]" />

      <Link
        href="/instruments/conflict"
        className="group flex flex-col gap-10 py-14 md:flex-row-reverse md:items-start md:justify-between md:gap-16"
      >
        <InstrumentMark className="w-24 md:w-40" />
        <div className="md:flex-1">
          <p className="font-[Roboto,Arial,sans-serif] text-[11px] uppercase tracking-[0.18em] text-[#6A635A]">
            AET01 / 001
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-[-0.01em] text-[#F3EBDD] sm:text-5xl">
            Conflict
          </h2>
          <p className="mt-6 max-w-[46ch] font-[Roboto,Arial,sans-serif] text-[1.05rem] font-light leading-[1.7] text-[#A39A8C]">
            Rehearse the argument before you have it.
          </p>
          <p className="mt-10 font-[Roboto,Arial,sans-serif] text-[13px] uppercase tracking-[0.18em] text-[#D99148] transition-colors group-hover:text-[#F3EBDD]">
            Open instrument ↗
          </p>
        </div>
      </Link>

      <div className="h-px w-full bg-[#2E2A24]" />

      <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-16">
        {colophon.map((item) => (
          <div key={item.label}>
            <p className="font-[Roboto,Arial,sans-serif] text-[11px] uppercase tracking-[0.18em] text-[#6A635A]">
              {item.label}
            </p>
            <p className="mt-4 max-w-[46ch] font-[Roboto,Arial,sans-serif] text-[15px] font-light leading-[1.7] text-[#A39A8C]">
              {item.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <InstrumentDisclosure />
      </div>
    </div>
  )
}
