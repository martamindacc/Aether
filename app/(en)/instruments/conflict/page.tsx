import Link from "next/link"
import { InstrumentMark, SpecList } from "@/components/instruments/instrument-ui"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "AET01 / Conflict",
  description:
    "Rehearse the argument before you have it. A partner model argues back and does not fold, and you find out which sentence cost you the room while it is still a rehearsal.",
  path: "/instruments/conflict",
  // See the hub page: the shared image needs an Instruments-specific alt here too.
  image: {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "AET01 / Conflict — rehearse the argument before you have it",
  },
})

const protocols = [
  {
    number: "01",
    name: "Practice",
    description:
      "Choose the scenario. The partner pushes. You get a score, the specific failure, and a stronger version of the line you actually used. Four levels, warm-up to hard. The standard never moves; only the partner does.",
  },
  {
    number: "02",
    name: "Spiral",
    description: "Mid-fight. No model, no scoring. A way out of the loop while you’re still inside it.",
  },
  {
    number: "03",
    name: "Debrief",
    description:
      "Afterwards. Where you held, where you escalated, where you traded something you wanted for quiet.",
  },
]

const firmIsNotAFail = [
  "Almost every piece of advice about conflict optimises for one outcome: de-escalation. Soften the tone. Lead with empathy. Assume good intent.",
  "Follow that far enough and you have agreed to things you do not agree with, pleasantly, for years. It looks like maturity. It compounds like debt.",
  "This instrument scores both failure modes. Aggression is marked. So is capitulation. Hold a position clearly and respectfully under pressure and it reads as the correct answer, which is a thing almost nothing else will tell you.",
  "Discomfort is not evidence of error.",
]

const session = [
  { label: "Length", value: "Two minutes" },
  { label: "Levels", value: "Warm-up, easy, medium, hard" },
  { label: "Account", value: "None" },
]

const sectionHeading =
  "font-[Roboto,Arial,sans-serif] text-[11px] uppercase tracking-[0.18em] text-[#6A635A]"
const bodyText = "font-[Roboto,Arial,sans-serif] text-[1.05rem] font-light leading-[1.7] text-[#A39A8C]"

export default function Page() {
  return (
    <div className="pb-24 pt-20">
      <InstrumentMark className="w-20 sm:w-24" />
      <p className={`mt-10 ${sectionHeading}`}>AET01 / 001</p>
      <h1 className="mt-5 max-w-[23ch] text-balance text-[44px] font-medium leading-[1.0] tracking-[-0.02em] text-[#F3EBDD] sm:text-[64px] lg:text-[76px]">
        Conflict
      </h1>
      <p className="mt-8 max-w-[46ch] font-[Roboto,Arial,sans-serif] text-[1.1rem] font-light leading-[1.7] text-[#A39A8C]">
        Rehearse the argument before you have it.
      </p>
      <p className={`mt-5 max-w-[46ch] ${bodyText}`}>
        A partner model argues back and doesn&rsquo;t fold. You find out which sentence cost you the
        room while it&rsquo;s still a rehearsal.
      </p>

      <section className="mt-20">
        <h2 className={sectionHeading}>Three protocols</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {protocols.map((protocol) => (
            <div key={protocol.name} className="border border-[#2E2A24] bg-[#28251F] p-8">
              <p className={sectionHeading}>{protocol.number}</p>
              <h3 className="mt-4 text-2xl font-medium tracking-[-0.01em] text-[#F3EBDD]">
                {protocol.name}
              </h3>
              <p className="mt-4 font-[Roboto,Arial,sans-serif] text-[15px] font-light leading-[1.7] text-[#A39A8C]">
                {protocol.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Firm is not a fail</h2>
        <div className="mt-8 max-w-[46ch] space-y-5">
          {firmIsNotAFail.map((paragraph) => (
            <p key={paragraph} className={bodyText}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>The session</h2>
        <div className="mt-8 max-w-2xl">
          <SpecList items={session} />
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Before you start</h2>
        <p className={`mt-8 max-w-[46ch] ${bodyText}`}>
          If you are afraid of your partner, or of what follows when you hold a line, rehearsal is
          the wrong instrument. That needs a person.
        </p>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Availability</h2>
        <p className={`mt-6 max-w-[46ch] ${bodyText}`}>
          Coming to the App Store and Google Play.
        </p>
      </section>

      <p className="mt-20 max-w-[60ch] font-[Roboto,Arial,sans-serif] text-[13px] font-light leading-[1.6] text-[#6A635A]">
        AET01 Conflict is a communication practice tool. Not psychotherapy, medical care or crisis
        support. Model feedback can be wrong.
      </p>

      <div className="mt-10 flex gap-6 font-[Roboto,Arial,sans-serif] text-[13px] text-[#6A635A]">
        <Link href="/instruments/conflict/privacy" className="transition-colors hover:text-[#A39A8C]">
          Privacy
        </Link>
      </div>
    </div>
  )
}
