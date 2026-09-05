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

export default function CouplesTherapyPage() {
  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <p className="text-lg text-[#66755c]">Relationship support</p>
        <h1 className="mt-8 max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight sm:text-8xl">
          Couples Therapy
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          A dedicated space for two people to understand how they work together —
          improve communication, rebuild trust, and repair the pattern
          underneath the conflict.
        </p>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              A space for both of you
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              Every session is shared, balanced, and structured so both voices are
              heard equally — with a clear focus on what moves your relationship
              forward.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              Building shared understanding
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              We help you see the pattern behind the disagreement, so you can
              respond to each other with more clarity, patience, and trust.
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
                <span className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium text-[#66755c] sm:w-20 sm:shrink-0">
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
      </section>
    </main>
  );
}
