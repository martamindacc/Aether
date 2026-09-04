export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafb] font-sans text-zinc-900">
      <div className="relative h-screen w-full overflow-hidden bg-[#fafafb]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
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
            <button className="bg-white px-5 py-3 text-sm transition-colors hover:bg-zinc-100">
              Get started
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

      <section className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="max-w-6xl text-balance text-[90px] font-bold leading-[0.95] tracking-[-0.075em]">
          Better teamwork starts with better understanding
        </h1>
        <div className="mt-20 flex max-w-7xl flex-wrap items-center justify-center gap-3">
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
              className="rounded-xl border border-pink-200 bg-pink-100 px-5 py-3 text-base text-zinc-700"
            >
              {pill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
