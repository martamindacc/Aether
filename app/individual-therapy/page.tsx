import Link from "next/link";

function FloatingNav() {
  return (
    <nav className="fixed inset-x-4 top-4 z-20 flex items-center justify-between rounded-[1.5rem] border border-white/50 bg-white/50 px-4 py-3 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:inset-x-6 sm:top-6 sm:px-6">
      <Link href="/" className="flex items-center gap-2 text-lg font-medium tracking-[-0.04em] sm:text-xl">
        <img src="/logo-a.svg" alt="Aether Practice logo" className="h-6 w-6" />
        Aether Practice
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/" className="border border-zinc-900/20 bg-white px-[30px] py-3 text-sm transition-colors hover:bg-[#f1dad0]">
          Book Now
        </Link>
        <span className="px-2 py-3 text-sm">EN⌄</span>
        <button className="flex h-11 w-11 items-center justify-center border border-zinc-900/20 bg-white/30" aria-label="Open menu">
          <span className="flex w-5 flex-col gap-1.5">
            <span className="h-px w-full bg-zinc-900" />
            <span className="h-px w-full bg-zinc-900" />
            <span className="h-px w-full bg-zinc-900" />
          </span>
        </button>
      </div>
    </nav>
  );
}

export default function IndividualTherapyPage() {
  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <p className="text-lg text-[#7b4037]">Individual support</p>
        <h1 className="mt-8 max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight sm:text-8xl">
          Individual Therapy
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          A thoughtful space to pause, reflect, and move forward with greater clarity. We explore what matters to you, strengthen the resources you already have, and create practical steps toward a life that feels more aligned.
        </p>
        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">A space for you</h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              Bring the questions, transitions, and patterns you are ready to understand. Sessions are collaborative, grounded, and shaped around your pace.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-300/80 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">Meaningful movement</h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              Together, we can turn insight into action and help you build more steadiness, confidence, and room for what you want next.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
