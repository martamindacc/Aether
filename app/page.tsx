export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafb] px-4 py-4 font-sans text-zinc-900 sm:px-6 sm:py-6">
      <div className="relative min-h-[calc(100vh-2rem)] overflow-hidden rounded-[2rem] bg-zinc-200 shadow-sm sm:min-h-[calc(100vh-3rem)]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-04%20at%2010.00.23%E2%80%AFPM.png-bu1DVtYbZSzrW2nMai74CoIQxpIyAK.jpeg"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Therapy introduction video"
        />
        <div className="absolute inset-0 bg-black/10" />

        <nav className="absolute inset-x-4 top-4 z-10 flex items-center justify-between rounded-[1.5rem] border border-white/50 bg-white/45 px-4 py-3 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:inset-x-6 sm:top-6 sm:px-6">
          <span className="text-lg font-medium tracking-[-0.04em] sm:text-xl">
            Therapy
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden border border-zinc-900/20 bg-white/30 px-5 py-3 text-sm transition-colors hover:bg-white/65 sm:block">
              Log in
            </button>
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
    </main>
  );
}
