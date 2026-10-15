import Link from "next/link"
import { InstrumentDisclosure, InstrumentMark } from "@/components/instruments/instrument-ui"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

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

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Instruments", path: "/instruments" },
])

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd} />
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

      {/*
        The range entry, built like the instrument's own masthead: the mark as a
        rounded app icon beside the number and name, so the card and the page it
        opens read as the same object.
      */}
      <Link
        href="/instruments/conflict"
        className="group my-14 flex flex-col gap-8 rounded-2xl border border-[#2E2824] bg-[#28231F] p-8 transition-colors hover:border-[#D99148]/40 sm:p-12 md:flex-row md:items-center md:gap-12"
      >
        <InstrumentMark className="w-20 rounded-[22%] sm:w-24" />
        <div className="md:flex-1">
          <h2 className="flex flex-wrap items-baseline gap-x-4 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-[#F3E6DD] sm:text-5xl">
            <span className="text-[#93857B]">AET01</span>
            <span>Conflict</span>
          </h2>
          <p className="mt-5 max-w-4xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A3968C]">
            Rehearse the argument before you have it.
          </p>
        </div>
        <p className="shrink-0 font-[Roboto,Arial,sans-serif] text-[19px] font-medium text-[#D99148] transition-colors group-hover:text-[#F3E6DD]">
          Open instrument ↗
        </p>
      </Link>

      <div className="h-px w-full bg-[#2E2824]" />

      <div className="mt-20">
        <InstrumentDisclosure />
      </div>
    </div>
    </>
  )
}
