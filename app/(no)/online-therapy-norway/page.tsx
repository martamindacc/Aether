"use client";

import { useState } from "react";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import { localizedPaths, type LanguageLink } from "@/lib/locale-routes";
import { norwayFaq } from "./faq-data";

const content: Record<
  "no",
  {
    heroTitle: string;
    heroSubtitle: string;
    servicesTitle: string;
    services: { label: string; href: string }[];
    whoTitle: string;
    whoBody: string;
    firstConvoTitle: string;
    firstConvoBody: string;
    faqTitle: string;
    faq: { question: string; answer: string }[];
    storiesEyebrow: string;
    storiesTitle: string;
    stories: { quote: string; name: string; context: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  }
> = {
  no: {
    heroTitle: "Online terapi og coaching for klienter i Norge",
    heroSubtitle:
      "Dette rommet er for enkeltpersoner, par og familier i Norge som arbeider med kommunikasjonsutfordringer, livsoverganger, eller et ønske om en roligere og mer forbundet måte å forholde seg til hverandre på. Samtalene skjer helt digitalt, slik at støtten passer inn i norsk arbeidstid og tidssone.",
    servicesTitle: "Hva ønsker du støtte med?",
    services: [
      { label: "Parterapi", href: "/no/parterapi" },
      { label: "Individuell terapi", href: "/no/individuell-terapi" },
      { label: "Familieterapi og familiestøtte", href: "/no/familieterapi" },
      { label: "Coaching for ledere og gründere", href: "/no/ledere-og-grundere" },
    ],
    whoTitle: "Hvem dette er for",
    whoBody:
      "Enkeltpersoner, par og familier i Norge som navigerer kommunikasjonsutfordringer, tilbakevendende konflikter, livsoverganger, eller et ønske om å bygge et sterkere fundament sammen.",
    firstConvoTitle: "Den første samtalen",
    firstConvoBody:
      "Den første sesjonen er en samtale, ikke en vurdering. Du deler hva som bringer deg hit, og vi begynner å kartlegge en vei videre sammen, digitalt, uansett hvor du er i Norge.",
    faqTitle: "Ofte stilte spørsmål",
    faq: norwayFaq.no,
    storiesEyebrow: "Klienthistorier",
    storiesTitle: "Betrodd av mennesker som forventer mer av omsorgen sin",
    stories: [
      {
        quote:
          "Å møtes digitalt gjorde det så mye lettere å være konsistente, selv med timeplanene våre i Norge.",
        name: "I. & E.",
        context: "Klienter i Norge",
      },
      {
        quote: "Vi fant endelig en måte å snakke om det vi hadde unngått.",
        name: "K. & S.",
        context: "Klienter i Norge",
      },
      {
        quote: "Sesjonene gav oss et språk for mønstre vi aldri helt kunne sette ord på før.",
        name: "L. & T.",
        context: "Klienter i Norge",
      },
    ],
    ctaTitle: "De sterkeste relasjonene er de man arbeider med.",
    ctaBody:
      "Start med en avklaringssamtale for å se om dette er riktig for deg — uten press, uten forpliktelser utover den første timen.",
    ctaButton: "Book din første sesjon",
  },
};

// This landing page exists in Norwegian only; the English option leads to the English home page.
const language = "no" as const;
const languageLinks: LanguageLink[] = [
  { code: "no", href: "/online-therapy-norway" },
  { code: "en", href: localizedPaths.home.en },
];

export default function OnlineTherapyNorwayPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = content[language];

  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav
        language={language}
        languageLinks={languageLinks}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isLangOpen={isLangOpen}
        onLangOpenChange={setIsLangOpen}
      />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
          {t.heroTitle}
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          {t.heroSubtitle}
        </p>

        <div className="mt-14">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl">
            {t.servicesTitle}
          </h2>
          <nav aria-label={t.servicesTitle} className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {t.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="font-[Roboto,Arial,sans-serif] text-lg text-[#74382f] underline decoration-[#74382f]/30 underline-offset-4 transition-colors hover:decoration-[#74382f]"
              >
                {service.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              {t.whoTitle}
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              {t.whoBody}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 sm:p-10">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">
              {t.firstConvoTitle}
            </h2>
            <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              {t.firstConvoBody}
            </p>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            {t.faqTitle}
          </h2>
          <div className="mt-12 flex flex-col">
            {t.faq.map((item, index) => (
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
          <p className="text-sm uppercase tracking-wide text-zinc-500">{t.storiesEyebrow}</p>
          <h2 className="max-w-3xl text-balance text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium tracking-tight text-zinc-900 sm:text-6xl">
            {t.storiesTitle}
          </h2>
        </div>
        <div className="mt-16 grid w-full max-w-6xl gap-6 sm:grid-cols-3">
          {t.stories.map((item, index) => {
            const accents = [
              { text: "text-[#66755c]", bg: "from-[#d9e2d1]/55 to-[#d9e2d1]/20" },
              { text: "text-[#7b4037]", bg: "from-[#e8d6ce]/55 to-[#e8d6ce]/20" },
              { text: "text-[#496171]", bg: "from-[#d8e2e8]/55 to-[#d8e2e8]/20" },
            ][index];
            return (
              <div
                key={item.name}
                className={`flex flex-col gap-8 rounded-2xl border border-zinc-300/80 bg-[#f4efea] p-8 sm:p-10`}
              >
                <span aria-hidden="true" className="-mb-3 flex justify-center gap-2">
<span className="h-7 w-3 bg-[#bfa27f] [clip-path:polygon(0_0,100%_0,80%_100%,20%_100%)]" />
<span className="h-7 w-3 bg-[#bfa27f] [clip-path:polygon(0_0,100%_0,80%_100%,20%_100%)]" />
</span>
                <p className="flex-1 text-balance text-center font-[Roboto,Arial,sans-serif] text-lg leading-[1.6] text-[#383838]">
                  {item.quote}
                </p>
                <div className="flex items-center justify-center gap-3">
  <span className="text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[#7a6347]">
  {item.name} &middot; {item.context}
  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 flex flex-col items-start gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/75 to-[#eee2db]/40 p-10 sm:p-14">
          <h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
            {t.ctaTitle}
          </h2>
          <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            {t.ctaBody}
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
