import Link from "next/link"
import { InstrumentDisclosure, InstrumentMark } from "@/components/instruments/instrument-ui"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Instruments",
  description:
    "Purpose-built instruments for practicing the moments that matter. Rehearsal tools for the conversations that decide how your life goes.",
  path: "/instruments",
  // The shared site image carries a site-wide alt describing the practice; these
  // pages are the Instruments range, so they name themselves instead.
  image: {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Aether Instruments — tools for the human condition",
  },
})

const body = [
  "Pilots use simulators. Litigators run moots. Surgeons practice on cadavers before they practice on you.",
  "The conversations that decide how your life goes are the only high-stakes performance anyone still walks into cold.",
  "Instruments are rehearsal tools for those.",
]

const label = "font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-[#93857B]"

export default function Page() {
  return (
    <div className="pb-24 pt-48">
      <div className="h-[3px] w-[72px] bg-[#D99148]" />
      <h1 className="mt-10 max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#F3E6DD] sm:text-8xl">
        Tools for the human condition.
      </h1>
      <p className="mt-6 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#A3968C] sm:text-2xl">
        Purpose-built instruments for practicing the moments that matter.
      </p>
      <div className="mt-12 max-w-4xl space-y-6">
        {body.map((paragraph) => (
          <p
            key={paragraph}
            className="font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#A3968C] sm:text-2xl"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-20 h-px w-full bg-[#2E2824]" />

      <Link
        href="/instruments/conflict"
        className="group flex flex-col gap-10 py-20 md:flex-row-reverse md:items-start md:justify-between md:gap-16"
      >
        <InstrumentMark className="w-24 md:w-40" />
        <div className="md:flex-1">
          <p className={label}>AET01 / 001</p>
          <h2 className="mt-4 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-[#F3E6DD] sm:text-5xl">
            Conflict
          </h2>
          <p className="mt-6 max-w-4xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A3968C]">
            Rehearse the argument before you have it.
          </p>
          <p className="mt-10 font-[Roboto,Arial,sans-serif] text-[19px] font-medium text-[#D99148] underline underline-offset-4 transition-colors group-hover:text-[#F3E6DD]">
            Open instrument ↗
          </p>
        </div>
      </Link>

      <div className="h-px w-full bg-[#2E2824]" />

      <div className="mt-20">
        <InstrumentDisclosure />
      </div>
    </div>
  )
}
