import Link from "next/link"
import { InstrumentMark, SpecList } from "@/components/instruments/instrument-ui"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "AET01 / Conflict",
  description:
    "Rehearse the argument before you have it. Every model you have ever used was built to agree with you. This one was built to hold a position.",
  path: "/instruments/conflict",
  // See the hub page: the shared image needs an Instruments-specific alt here too.
  image: {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "AET01 — Conflict, rehearse the argument before you have it",
  },
})

const intro = [
  "You have never lost a negotiation. You lose this one on a Tuesday, about the dishwasher.",
  "Every model you have ever used was built to agree with you. This one was built to hold a position. Pick the fight. It takes the other side and stays there — through the deflection, the reasonable voice, the thing you say to make it stop. Then it tells you which sentence lost you the room.",
]

const protocols = [
  {
    number: "01",
    name: "Practice",
    description:
      "Choose the fight. Four partners, from someone having a reasonable day to someone who decided they were right before you walked in. The rubric never moves; only they do. You get a score, the exact failure, and the line you should have used.",
  },
  {
    number: "02",
    name: "Spiral",
    description: "For the middle of it. No model, no score. Nobody needs feedback at eleven at night.",
  },
  {
    number: "03",
    name: "Debrief",
    description: "After. Where you held. Where you escalated. Where you bought quiet with something you wanted.",
  },
]

const firmIsNotAFail = [
  "Every piece of advice about conflict optimizes for one outcome: de-escalation. Soften it. Lead with empathy. Assume good intent.",
  "Follow that far enough and you have agreed, warmly, for years, to things you do not agree with. It looks like maturity. It compounds like debt.",
  "Peace at any price is still a price.",
  "So this scores both failures. Aggression is marked. So is the quiet trade — the apology that was not yours, the request withdrawn because the volume went up. Clear, respectful and immovable scores highest, which is a thing almost nothing else will tell you.",
  "Discomfort is not evidence of error.",
]

const session = [
  { label: "Length", value: "two minutes" },
  { label: "Levels", value: "warm-up, easy, medium, hard" },
  { label: "Account", value: "none" },
]

const label = "font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-[#6A635A]"
const sectionHeading =
  "font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-[#F3EBDD] sm:text-5xl"
const bodyText = "font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A39A8C]"

export default function Page() {
  return (
    <div className="pb-24 pt-48">
      <InstrumentMark className="w-20 sm:w-24" />
      <p className={`mt-10 ${label}`}>AET01</p>
      <h1 className="mt-5 max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#F3EBDD] sm:text-8xl">
        Conflict
      </h1>
      <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#A39A8C] sm:text-2xl">
        Rehearse the argument before you have it.
      </p>
      <div className="mt-6 max-w-4xl space-y-6">
        {intro.map((paragraph) => (
          <p key={paragraph} className={bodyText}>
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-20">
        <h2 className={sectionHeading}>Three protocols</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {protocols.map((protocol) => (
            <div key={protocol.name} className="rounded-2xl border border-[#2E2A24] bg-[#28251F] p-8 sm:p-10">
              <p className={label}>{protocol.number}</p>
              <h3 className="mt-4 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium text-[#F3EBDD]">
                {protocol.name}
              </h3>
              <p className={`mt-4 ${bodyText}`}>
                {protocol.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Firm is not a fail</h2>
        <div className="mt-6 max-w-4xl space-y-6">
          {firmIsNotAFail.map((paragraph) => (
            <p key={paragraph} className={bodyText}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Two minutes</h2>
        <div className="mt-10 max-w-4xl">
          <SpecList items={session} />
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Before you start</h2>
        <p className={`mt-6 max-w-4xl ${bodyText}`}>
          If you are afraid of your partner, or of what follows when you hold a line, rehearsal is
          the wrong instrument. That needs a person.
        </p>
      </section>

      <p className={`mt-20 max-w-4xl ${bodyText}`}>
        Coming to the App Store and Google Play.
      </p>

      <p className="mt-20 max-w-4xl font-[Roboto,Arial,sans-serif] text-sm leading-[1.5] text-[#6A635A]">
        AET01 Conflict is a communication practice tool. Not psychotherapy, medical care or crisis
        support. Model feedback can be wrong.
      </p>

      <div className="mt-10 flex gap-6 font-[Roboto,Arial,sans-serif] text-sm text-[#6A635A]">
        <Link href="/instruments/conflict/privacy" className="transition-colors hover:text-[#A39A8C]">
          Privacy
        </Link>
      </div>
    </div>
  )
}
