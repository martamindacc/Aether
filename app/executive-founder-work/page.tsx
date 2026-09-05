import Link from "next/link";

export default function ExecutiveFounderWorkPage() {
  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif]">
      <nav className="fixed inset-x-4 top-4 z-20 flex items-center justify-between rounded-[1.5rem] border border-white/50 bg-white/50 px-4 py-3 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:inset-x-6 sm:top-6 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-medium tracking-[-0.04em] sm:text-xl"><img src="/logo-a.svg" alt="Aether Practice logo" className="h-6 w-6" />Aether Practice</Link>
        <div className="flex items-center gap-2 sm:gap-3"><Link href="/" className="border border-zinc-900/20 bg-white px-[30px] py-3 text-sm hover:bg-[#f1dad0]">Book Now</Link><span className="px-2 py-3 text-sm">EN⌄</span><span className="flex h-11 w-11 items-center justify-center border border-zinc-900/20 bg-white/30"><span className="flex w-5 flex-col gap-1.5"><span className="h-px w-full bg-zinc-900" /><span className="h-px w-full bg-zinc-900" /><span className="h-px w-full bg-zinc-900" /></span></span></div>
      </nav>
    </main>
  );
}
