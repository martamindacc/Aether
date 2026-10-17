import Link from "next/link"
import { InstrumentDisclosure, InstrumentMark, SpecList } from "@/components/instruments/instrument-ui"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

const BASE_URL = "https://aetherpractice.com"

export const metadata = pageMetadata({
  title: "Instruments: Practice Tools for Difficult Conversations",
  description:
    "Aether Instruments: single-purpose mobile apps for rehearsing the conversations that decide how your life goes. AET01 Conflict practices an argument against an AI that pushes back.",
  path: "/instruments",
  // The section's own dark social image (app/(en)/instruments/og/route.tsx),
  // not the practice's light site image.
  image: {
    url: "/instruments/og",
    width: 1200,
    height: 630,
    alt: "Aether Instruments — practice tools for the conversations that decide how your life goes",
  },
})

const body = [
  "Pilots use simulators. Litigators run moots. Surgeons practice on cadavers before they practice on you.",
  "The conversations that decide how your life goes are the only high-stakes performance anyone still walks into cold.",
  "Instruments are rehearsal tools for those.",
]

/**
 * The range. One entry per instrument; the hub card, the ItemList schema and
 * the home page's Instruments band all describe the same object.
 */
const instruments = [
  {
    number: "AET01",
    name: "Conflict",
    path: "/instruments/conflict",
    tagline: "Rehearse the argument before you have it.",
    description:
      "A mobile app for practicing difficult conversations against an AI partner that holds a position instead of agreeing with you, then scores the exchange against a fixed standard.",
  },
]

const whatAnInstrumentIs = [
  "Each instrument is numbered and does one thing. It gives you a realistic counterpart, a standard that does not move, and a verdict on how you did. Two minutes at a time. No account, no feed, no streak.",
  "The counterpart is a model. It has been built to behave like the person you are dreading rather than like an assistant, which means it will deflect, stay reasonable while conceding nothing, and say the thing that usually makes you fold. The verdict names the sentence where it went wrong and the one that would have held.",
]

const whoTheyAreFor = [
  "People who know exactly what they should say and lose the room anyway.",
  "A founder before the equity conversation. A partner before the one about money. A manager before the review they have rewritten four times. Anyone who has drafted the message and sent none of them.",
]

const range = [
  { label: "Format", value: "mobile apps, iOS and Android" },
  { label: "Session", value: "two minutes" },
  { label: "Account", value: "none" },
  { label: "Made by", value: "Marta Morawska" },
]

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Instruments", path: "/instruments" },
])

/**
 * Aether Instruments as its own entity, a brand of the practice: the hub as a
 * CollectionPage whose main entity is the ItemList of instruments, each item
 * the SoftwareApplication declared in full on its own page.
 */
const collectionLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Brand", "Organization"],
      "@id": `${BASE_URL}/instruments#instruments`,
      name: "Aether Instruments",
      url: `${BASE_URL}/instruments`,
      description:
        "Single-purpose mobile apps from Aether Practice for rehearsing high-stakes conversations: a realistic AI counterpart, a fixed standard and a verdict, two minutes at a time.",
      parentOrganization: { "@id": `${BASE_URL}/#organization` },
      logo: `${BASE_URL}/instruments/og`,
    },
    {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/instruments`,
      url: `${BASE_URL}/instruments`,
      name: "Aether Instruments",
      description: metadata.description,
      inLanguage: "en",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/instruments#instruments` },
      publisher: { "@id": `${BASE_URL}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        name: "Aether Instruments range",
        numberOfItems: instruments.length,
        itemListElement: instruments.map((instrument, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${BASE_URL}${instrument.path}`,
          item: {
            "@type": "SoftwareApplication",
            "@id": `${BASE_URL}${instrument.path}#app`,
            name: `${instrument.number} ${instrument.name}`,
            url: `${BASE_URL}${instrument.path}`,
            description: instrument.description,
            applicationCategory: "EducationalApplication",
            operatingSystem: "iOS, Android",
            brand: { "@id": `${BASE_URL}/instruments#instruments` },
          },
        })),
      },
    },
  ],
}

const sectionHeading =
  "font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-[#F3E6DD] sm:text-5xl"
const bodyText = "font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A3968C]"

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={collectionLd} />
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
      {instruments.map((instrument) => (
        <Link
          key={instrument.path}
          href={instrument.path}
          className="group my-14 flex flex-col gap-8 rounded-2xl border border-[#2E2824] bg-[#28231F] p-8 transition-colors hover:border-[#D99148]/40 sm:p-12 md:flex-row md:items-center md:gap-12"
        >
          <InstrumentMark className="w-20 rounded-[22%] sm:w-24" />
          <div className="md:flex-1">
            <h2 className="flex flex-wrap items-baseline gap-x-4 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-[#F3E6DD] sm:text-5xl">
              <span className="text-[#93857B]">{instrument.number}</span>
              <span>{instrument.name}</span>
            </h2>
            <p className="mt-5 max-w-4xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A3968C]">
              {instrument.tagline}
            </p>
          </div>
          <p className="shrink-0 font-[Roboto,Arial,sans-serif] text-[19px] font-medium text-[#D99148] transition-colors group-hover:text-[#F3E6DD]">
            Open instrument ↗
          </p>
        </Link>
      ))}

      <div className="h-px w-full bg-[#2E2824]" />

      <section className="mt-20">
        <h2 className={sectionHeading}>What an instrument is</h2>
        <div className="mt-6 max-w-4xl space-y-6">
          <p className={`${bodyText} text-[#F3E6DD]`}>
            An Aether Instrument is a single-purpose practice tool for one high-stakes human moment. It gives you a
            realistic counterpart, a standard that does not move, and a verdict.
          </p>
          {whatAnInstrumentIs.map((paragraph) => (
            <p key={paragraph} className={bodyText}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Who they are for</h2>
        <div className="mt-6 max-w-4xl space-y-6">
          {whoTheyAreFor.map((paragraph) => (
            <p key={paragraph} className={bodyText}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Where do I get them?</h2>
        <div className="mt-6 max-w-4xl space-y-6">
          <p className={bodyText}>
            AET01 Conflict is coming to the App Store and Google Play. Each instrument&apos;s page on this site will carry
            its store links once it is released.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>The range</h2>
        <div className="mt-10 max-w-4xl">
          <SpecList items={range} />
        </div>
      </section>

      <div className="mt-20">
        <InstrumentDisclosure />
      </div>
    </div>
    </>
  )
}
