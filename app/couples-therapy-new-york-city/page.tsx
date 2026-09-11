"use client";

import { useEffect, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import { type LanguageCode } from "@/lib/service-content";
import { nycCouplesFaq } from "./faq-data";

export default function CouplesTherapyNewYorkCityPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("site-language") as LanguageCode | null;
    if (stored) setLanguage(stored);
  }, []);

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem("site-language", lang);
  };

  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav
        language={language}
        onLanguageChange={handleLanguageChange}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isLangOpen={isLangOpen}
        onLangOpenChange={setIsLangOpen}
      />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
          Couples Sessions for Clients in New York City
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.5] text-zinc-700">
          Online couples sessions for partners in New York City, focused on communication, trust, conflict, and shared understanding.
        </p>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          This space is for couples working through communication difficulties, recurring conflict, trust concerns,
          emotional distance, or a relationship transition. Sessions happen online, so scheduling around New York
          City life doesn&apos;t mean sacrificing consistent support.
        </p>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              Who this is for
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              Couples in New York City navigating communication difficulties, recurring conflict, trust concerns,
              emotional distance, or transitions such as a move, a new job, or a growing family.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              The first conversation
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              The first Couples Session is a conversation, not an assessment. You and your partner share what
              brought you here, and we start mapping the pattern underneath the conflict together, online.
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            Frequently asked questions
          </h2>
          <div className="mt-12 flex flex-col">
            {nycCouplesFaq.map((item, index) => (
              <div
                key={item.question}
                className="flex flex-col gap-4 border-t border-zinc-300/80 py-10 sm:flex-row sm:items-start sm:gap-12"
              >
                <span className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium text-[#74382f] sm:w-20 sm:shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium sm:text-3xl">
                    {item.question}
                  </h3>
                  <p className="mt-4 max-w-3xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[78px] flex w-full max-w-6xl flex-col items-center gap-4">
          <p className="text-sm uppercase tracking-wide text-zinc-500">Client Stories</p>
          <h2 className="max-w-3xl text-balance text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium tracking-tight text-zinc-900 sm:text-6xl">
            Trusted by people who expect more from their care
          </h2>
        </div>
        <div className="mt-16 grid w-full max-w-6xl gap-6 sm:grid-cols-3">
          {[
            {
              quote: "We found a calmer way to talk about the things we had been avoiding.",
              name: "J. & A.",
              context: "Couples clients",
              accentText: "text-[#66755c]",
              accentBg: "from-[#d9e2d1]/55 to-[#d9e2d1]/20",
            },
            {
              quote: "The sessions helped us listen differently and feel more connected again.",
              name: "M. & R.",
              context: "Couples clients",
              accentText: "text-[#7b4037]",
              accentBg: "from-[#e8d6ce]/55 to-[#e8d6ce]/20",
            },
            {
              quote: "We learned how to repair the pattern instead of repeating the same argument.",
              name: "S. & D.",
              context: "Couples clients",
              accentText: "text-[#496171]",
              accentBg: "from-[#d8e2e8]/55 to-[#d8e2e8]/20",
            },
          ].map((item) => (
            <div
              key={item.name}
              className={`flex flex-col gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br ${item.accentBg} p-8 transition-colors duration-300 sm:p-10`}
            >
              <div className={`flex justify-center gap-1 ${item.accentText}`} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg key={index} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.7 6.06 6.6.63-5 4.4 1.5 6.46L10 15.9l-5.8 3.15 1.5-6.46-5-4.4 6.6-.63L10 1.5z" />
                  </svg>
                ))}
              </div>
              <p className="flex-1 font-[Roboto,Arial,sans-serif] text-lg leading-[1.6] text-[#383838]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center text-center">
                  <span className="font-[Roboto,Arial,sans-serif] text-base font-medium text-zinc-900">{item.name}</span>
                  <span className="text-sm text-zinc-500">{item.context}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-start gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/75 to-[#eee2db]/40 p-10 sm:p-14">
          <h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
              The strongest relationships are the ones that get worked on.
          </h2>
          <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            Start with a joint discovery conversation to see if this is the right fit for you both — no pressure, no commitment beyond that first hour.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            Book your first session
          </button>
        </div>
      </section>
      <SiteFooter language={language} />
      <BookingModal language={language} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
