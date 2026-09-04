import Link from "next/link";

const supportSections = [
  {
    eyebrow: "Individual support",
    title: "Individual Therapy",
    description:
      "Support in your own life situations — anxiety, grief, identity, transitions, and the weight you carry alone.",
    href: "/individual-therapy",
    color: "text-[#7b4037]",
  },
  {
    eyebrow: "Relationship support",
    title: "Couples Therapy",
    description:
      "Understand how you work together as a couple — improve communication, rebuild trust, and repair the pattern underneath the conflict.",
    href: "/couples-therapy",
    color: "text-[#66755c]",
  },
  {
    eyebrow: "Leadership support",
    title: "Executive & Founder Work",
    description:
      "Support at the level decisions and isolation actually happen — for founders and executives carrying weight the role doesn't make space for.",
    href: "/executive-founder-work",
    color: "text-[#496171]",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafb] font-sans text-zinc-900">
      <div className="relative h-screen w-full overflow-hidden bg-[#fafafb]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/morawska-marta-psychotherapy.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Therapy introduction video"
        />
        <div className="absolute inset-0 bg-black/10" />

        <nav className="fixed inset-x-4 top-4 z-20 flex items-center justify-between rounded-[1.5rem] border border-white/50 bg-white/50 px-4 py-3 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:inset-x-6 sm:top-6 sm:px-6">
          <span className="text-lg font-medium tracking-[-0.04em] sm:text-xl">
            Therapy
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="border border-zinc-900/20 bg-white px-5 py-3 text-sm transition-colors hover:bg-zinc-100">
              Book Now
            </button>
            <button
              className="flex h-11 w-11 items-center justify-center border border-zinc-900/20 bg-white/30 transition-colors hover:bg-white/65"
              aria-label="Open menu"
            >
              <span className="flex w-5 flex-col gap-1.5">
                <span className="h-px w-full bg-zinc-900" />
                <span className="h-px w-full bg-zinc-900" />
                <span className="h-px w-full bg-zinc-900" />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <section className="flex flex-col items-center px-6 py-12 text-center font-[Inter,-apple-system,BlinkMacSystemFont,'SF_Pro_Text',system-ui,sans-serif] text-[19px] font-normal leading-[1.5] text-[#383838]">
        <h1 className="max-w-6xl text-balance text-[90px] font-bold leading-[0.95] tracking-[-0.075em] text-zinc-900">
          Better teamwork starts with better understanding
        </h1>
        <div className="mt-10 flex max-w-7xl flex-wrap items-center justify-center gap-3">
          {[
            "Emotional Wellness",
            "Individual Therapy",
            "Couples Counseling",
            "Stress Support",
            "Personal Growth",
            "Mindful Living",
          ].map((pill) => (
            <span
              key={pill}
              className="rounded-xl border border-[#e1c2af] bg-gradient-to-r from-[#e1c2af] to-[#f0ddd2] px-5 py-3 text-base text-zinc-700"
            >
              {pill}
            </span>
          ))}
        </div>
        <div className="mt-20 flex w-full max-w-6xl flex-col gap-6 text-left">
          {supportSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-zinc-300/80 bg-[#fafafb] p-8 transition-colors hover:bg-white sm:p-14"
            >
              <p className={`text-xl ${section.color}`}>{section.eyebrow}</p>
              <h2 className="mt-10 font-serif text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                {section.title}
              </h2>
              <p className="mt-8 max-w-5xl text-2xl leading-relaxed text-zinc-600">
                {section.description}
              </p>
              <span className="mt-10 inline-block border-b border-zinc-900 pb-2 text-2xl text-zinc-900">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
