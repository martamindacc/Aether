import { FloatingNav } from "@/components/floating-nav";

const process = [
  {
    number: "01",
    title: "Context Session",
    description:
      "A confidential first conversation to understand the weight you're carrying — the decisions, the isolation, and the role's blind spots.",
  },
  {
    number: "02",
    title: "Focus Areas",
    description:
      "We identify the two or three areas where a shift in thinking or approach will create the most leverage across your role.",
  },
  {
    number: "03",
    title: "Working Sessions",
    description:
      "Structured, high-trust sessions built around real decisions in front of you — not theory. You leave with sharper judgment each time.",
  },
  {
    number: "04",
    title: "Sustained Support",
    description:
      "An ongoing rhythm that gives you a steady space to think out loud, pressure-test decisions, and stay resourced as the role evolves.",
  },
];

export default function ExecutiveFounderWorkPage() {
  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <p className="text-lg text-[#496171]">Leadership support</p>
        <h1 className="mt-8 max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight sm:text-8xl">
          Executive &amp; Founder Work
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          Support at the level decisions and isolation actually happen — for
          founders and executives carrying weight the role doesn&apos;t make
          space for.
        </p>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              A space built for the role
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              Bring the pressure, the pace, and the decisions you can&apos;t
              talk through anywhere else. Sessions are direct, confidential,
              and built around your reality.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              Sharper judgment, faster
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              We work on the thinking behind your decisions, so you carry more
              clarity and steadiness into the moments that matter most.
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
                <span className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium text-[#496171] sm:w-20 sm:shrink-0">
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
