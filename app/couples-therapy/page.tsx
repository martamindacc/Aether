import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";

const process = [
  {
    number: "01",
    title: "Discovery Conversation",
    description:
      "A relaxed, structured conversation to understand where you both stand today — what's working, what feels stuck, and what you want to build together.",
  },
  {
    number: "02",
    title: "Shared Roadmap",
    description:
      "We map the patterns underneath the friction and agree on a clear focus for the work — so every session moves you both in the same direction.",
  },
  {
    number: "03",
    title: "Guided Sessions",
    description:
      "Structured, collaborative sessions where you practice new ways of communicating, listening, and resolving disagreement in real time.",
  },
  {
    number: "04",
    title: "Lasting Rhythm",
    description:
      "We close with practical tools and a rhythm you can carry forward — so the progress you build together keeps compounding after the work ends.",
  },
];

const outcomes = [
  {
    title: "Communication that actually lands",
    description:
      "Learn to say the hard thing without it becoming a fight, and to hear each other without getting defensive.",
  },
  {
    title: "Trust rebuilt on solid ground",
    description:
      "Move past old resentments with a shared understanding of what happened and why — not just an agreement to move on.",
  },
  {
    title: "A partnership, not a negotiation",
    description:
      "Replace the sense of scorekeeping with a rhythm where you're solving problems together, not against each other.",
  },
];

export default function CouplesTherapyPage() {
  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
          Couples Therapy
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          A dedicated space for two people to understand how they truly work
          together — repair the pattern underneath the conflict, and rebuild
          a partnership that feels steady, honest, and shared.
        </p>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              A space for both of you
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              Every session is shared, balanced, and structured so both
              voices are heard equally — with a clear focus on what moves
              your relationship forward, not who's right.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              Building shared understanding
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              We help you see the pattern behind the disagreement, so you can
              respond to each other with more clarity, patience, and lasting
              trust — long after the conversation ends.
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
            What changes for you both
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
            The strongest relationships are the ones that get worked on.
          </h2>
          <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            Start with a joint discovery conversation to see if this is the
            right fit for you both — no pressure, no commitment beyond that
            first hour.
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
