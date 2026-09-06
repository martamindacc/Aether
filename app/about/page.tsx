"use client";

import { useEffect, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import { aboutContent, type LanguageCode } from "@/lib/service-content";

export default function AboutPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = aboutContent[language];

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
          {t.title}
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          {t.intro}
        </p>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {t.panels.map((panel) => (
            <div key={panel.title} className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 sm:p-10">
              <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
                {panel.title}
              </h2>
              <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
                {panel.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            {t.valuesHeading}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {t.values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-zinc-300/80 p-8">
                <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-xl font-medium">
                  {value.title}
                </h3>
                <p className="mt-4 font-[Roboto,Arial,sans-serif] text-[17px] leading-[1.5] text-[#383838]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/75 to-[#eee2db]/40 p-10 sm:p-14">
          <h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
            {t.ctaHeading}
          </h2>
          <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            {t.ctaSubtext}
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            {t.ctaButton}
          </button>
        </div>
      </section>
      <SiteFooter language={language} />
      <BookingModal language={language} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
