import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";

const process = [
  {
    number: "01",
    title: "Discovery Session",
    description:
      "An unhurried first conversation to understand where you stand today — what you want more of, what's been getting in the way, and what a meaningful outcome would look like for you.",
  },
  {
    number: "02",
    title: "Personal Roadmap",
    description:
      "We translate that conversation into a clear focus for the work — the patterns worth examining first and the outcomes we'll measure progress against.",
  },
  {
    number: "03",
    title: "Guided Sessions",
    description:
      "Structured, one-to-one sessions that combine reflection with practical tools, so every conversation moves you closer to the clarity and confidence you're building toward.",
  },
  {
    number: "04",
    title: "Lasting Rhythm",
    description:
      "We close with a set of tools and habits calibrated to your life, so the momentum you've built keeps compounding long after our work together ends.",
  },
];

const outcomes = [
  {
    title: "Clarity under pressure",
    description:
      "Learn to separate the signal from the noise, so decisions and setbacks feel manageable rather than overwhelming.",
  },
  {
    title: "Confidence in your own judgment",
    description:
      "Build a stronger, quieter sense of trust in yourself — one that holds steady in moments of doubt or transition.",
  },
  {
    title: "A life that fits, not just functions",
    description:
      "Move from simply getting through the day to shaping a rhythm of work, rest, and relationships that actually feels like yours.",
  },
];

export default function IndividualTherapyPage() {
  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
          Individual Therapy
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          A dedicated space to think clearly, understand your own patterns,
          and move forward with intention. This is coaching built for people
          who are already capable — and want a sharper, more deliberate
          version of the life they're building.
        </p>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              A space built around you
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              Bring the questions, transitions, and patterns you're ready to
              understand. Every session is collaborative, unhurried, and
              shaped entirely around your priorities and pace.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              Insight that turns into action
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              We don't stop at reflection. Every conversation is paired with
              practical steps, so the clarity you gain here shows up in how
              you think, decide, and live outside the session.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            How the work unfolds
          </h2>
          <div className="mt-12 flex flex-col">
            {process.map((step) => (
              <div
                key={step.number}
                className="flex flex-col gap-4 border-t border-zinc-300/80 py-10 sm:flex-row sm:items-start sm:gap-12"
              >
                <span className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium text-[#74382f] sm:w-20 sm:shrink-0">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-3xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            What changes for you
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {outcomes.map((outcome) => (
              <div key={outcome.title} className="rounded-2xl border border-zinc-300/80 p-8">
                <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-xl font-medium">
                  {outcome.title}
                </h3>
                <p className="mt-4 font-[Roboto,Arial,sans-serif] text-[17px] leading-[1.5] text-[#383838]">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#fff5ef] to-[#fffbf8] p-10 sm:p-14">
          <h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
            The first session is where clarity begins.
          </h2>
          <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            Start with a short, unhurried conversation to see if this is the
            right fit — no pressure, no commitment beyond that first hour.
          </p>
          <Link
            href="/"
            className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            Book your first session
          </Link>
        </div>
      </section>
    </main>
  );
}
