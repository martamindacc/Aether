import { FloatingNav } from "@/components/floating-nav";

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
