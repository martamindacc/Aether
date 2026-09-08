"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import { type LanguageCode } from "@/lib/service-content";

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
          Sessions are held entirely online, so you and your partner can meet from wherever you are in New York City.
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

        <div className="mt-24 flex flex-col items-start gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/75 to-[#eee2db]/40 p-10 sm:p-14">
          <h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
            Ready to talk?
          </h2>
          <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            Book an online Couples Session, or reach out first if you have questions.
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            Book your first session
          </button>
          <p className="font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#383838]">
            Learn more about our{" "}
            <Link href="/couples-therapy" className="underline underline-offset-4 hover:text-zinc-600">
              Couples Session approach
            </Link>
            .
          </p>
        </div>
      </section>
      <SiteFooter language={language} />
      <BookingModal language={language} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
