"use client";

import { useEffect, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import type { LanguageCode } from "@/lib/service-content";

const privacyContent: Record<
  LanguageCode,
  {
    title: string;
    intro: string;
    collectHeading: string;
    collectItems: string[];
    useHeading: string;
    useText: string;
  }
> = {
  en: {
    title: "Privacy Policy",
    intro:
      "This page explains what information the contact form on this website collects and how it is used.",
    collectHeading: "What we collect",
    collectItems: ["Name", "Email address", "Message"],
    useHeading: "How it is used",
    useText:
      "The information you submit through the contact form is used only to respond to your message. It is not shared with third parties or used for any other purpose.",
  },
  no: {
    title: "Personvernerklæring",
    intro:
      "Denne siden forklarer hvilken informasjon kontaktformularet på dette nettstedet samler inn, og hvordan den brukes.",
    collectHeading: "Hva vi samler inn",
    collectItems: ["Navn", "E-postadresse", "Melding"],
    useHeading: "Hvordan det brukes",
    useText:
      "Informasjonen du sender inn via kontaktformularet brukes kun til å svare på meldingen din. Den deles ikke med tredjeparter og brukes ikke til andre formål.",
  },
  pl: {
    title: "Polityka prywatności",
    intro:
      "Ta strona wyjaśnia, jakie informacje zbiera formularz kontaktowy na tej stronie i jak są wykorzystywane.",
    collectHeading: "Co zbieramy",
    collectItems: ["Imię i nazwisko", "Adres e-mail", "Wiadomość"],
    useHeading: "Jak to jest wykorzystywane",
    useText:
      "Dane przesłane za pomocą formularza kontaktowego wykorzystujemy wyłącznie do odpowiedzi na Twoją wiadomość. Nie są udostępniane osobom trzecim i nie są wykorzystywane do żadnych innych celów.",
  },
};

export default function PrivacyPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = privacyContent[language];

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
          <div className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              {t.collectHeading}
            </h2>
            <ul className="mt-6 flex flex-col gap-3 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              {t.collectItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#74382f]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              {t.useHeading}
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              {t.useText}
            </p>
          </div>
        </div>
      </section>
      <SiteFooter language={language} />
    </main>
  );
}
