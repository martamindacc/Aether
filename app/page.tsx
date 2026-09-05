"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";

const bookingServices = [
  {
    label: "Individual Session",
    duration: "50 min",
    calendlyUrl: "https://calendly.com/aether-practice/individual-session",
  },
  {
    label: "Couples Session",
    duration: "60 min",
    calendlyUrl: "https://calendly.com/aether-practice/couples-session",
  },
  {
    label: "Founder Session",
    duration: "50 min",
    calendlyUrl: "https://calendly.com/aether-practice/founder-session",
  },
  {
    label: "Initial Consultation",
    duration: "15 min",
    calendlyUrl: "https://calendly.com/aether-practice/initial-consultation",
  },
];

const languages = [
  { code: "en", label: "EN" },
  { code: "no", label: "NO" },
  { code: "pl", label: "PL" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

const content: Record<
  LanguageCode,
  {
    videoOverlay: string;
    heroTitle: string;
    subtext: string;
    bookNow: string;
    pills: string[];
    menuSections: { heading: string; links: { label: string; href: string }[] }[];
    supportSections: {
      eyebrow: string;
      title: string;
      description: string;
      href: string;
      color: string;
    }[];
    learnMore: string;
    footerTagline: string;
  }
> = {
  en: {
    videoOverlay: "Your Future is Yours to Shape",
    heroTitle: "Better life starts with better understanding",
    subtext:
      "Because we believe in your potential, we want to guide you towards a life filled with meaning, balance, and lasting renewal. Expect exceptional care grounded in science.",
    bookNow: "Book Now",
    pills: [
      "Emotional Wellness",
      "Individual Therapy",
      "Couples Counseling",
      "Stress Support",
      "Personal Growth",
      "Mindful Living",
    ],
    menuSections: [
      {
        heading: "Services",
        links: [
          { label: "Individual Therapy", href: "/individual-therapy" },
          { label: "Couples Therapy", href: "/couples-therapy" },
          { label: "Executive & Founder Work", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Individual support",
        title: "Individual Therapy",
        description:
          "Support in your own life situations — anxiety, grief, identity, transitions, and the weight you carry alone.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
      },
      {
        eyebrow: "Relationship support",
        title: "Couples Therapy",
        description:
          "Understand how you work together as a couple — improve communication, rebuild trust, and repair the pattern underneath the conflict.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Leadership support",
        title: "Executive & Founder Work",
        description:
          "Support at the level decisions and isolation actually happen — for founders and executives carrying weight the role doesn't make space for.",
        href: "/executive-founder-work",
        color: "text-[#496171]",
      },
    ],
    learnMore: "Learn more →",
    footerTagline: "All rights reserved.",
  },
  no: {
    videoOverlay: "Din Fremtid Er Din Å Forme",
    heroTitle: "Et bedre liv starter med bedre forståelse",
    subtext:
      "Fordi vi tror på ditt potensial, vil vi guide deg mot et liv fylt med mening, balanse og varig fornyelse. Forvent eksepsjonell omsorg forankret i vitenskap.",
    bookNow: "Bestill Nå",
    pills: [
      "Emosjonell Velvære",
      "Individualterapi",
      "Parterapi",
      "Stressstøtte",
      "Personlig Vekst",
      "Bevisst Liv",
    ],
    menuSections: [
      {
        heading: "Tjenester",
        links: [
          { label: "Individualterapi", href: "/individual-therapy" },
          { label: "Parterapi", href: "/couples-therapy" },
          { label: "Leder- og Grunnleggerarbeid", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Selskap",
        links: [
          { label: "Om Oss", href: "#" },
          { label: "Kontakt", href: "#" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Individuell støtte",
        title: "Individualterapi",
        description:
          "Støtte i dine egne livssituasjoner — angst, sorg, identitet, overganger, og vekten du bærer alene.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
      },
      {
        eyebrow: "Relasjonsstøtte",
        title: "Parterapi",
        description:
          "Forstå hvordan dere fungerer som par — forbedre kommunikasjon, gjenoppbygg tillit, og reparer mønsteret under konflikten.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Ledelsesstøtte",
        title: "Leder- og Grunnleggerarbeid",
        description:
          "Støtte på nivået der beslutninger og isolasjon faktisk skjer — for gründere og ledere som bærer vekten rollen ikke gir plass til.",
        href: "/executive-founder-work",
        color: "text-[#496171]",
      },
    ],
    learnMore: "Les mer →",
    footerTagline: "Alle rettigheter reservert.",
  },
  pl: {
    videoOverlay: "Twoja Przyszłość Jest Twoja do Kształtowania",
    heroTitle: "Lepsze życie zaczyna się od lepszego zrozumienia",
    subtext:
      "Ponieważ wierzymy w Twój potencjał, chcemy poprowadzić Cię do życia pełnego sensu, równowagi i trwałej odnowy. Oczekuj wyjątkowej opieki opartej na nauce.",
    bookNow: "Zarezerwuj",
    pills: [
      "Dobrostan Emocjonalny",
      "Terapia Indywidualna",
      "Terapia Par",
      "Wsparcie w Stresie",
      "Rozwój Osobisty",
      "Uważne Życie",
    ],
    menuSections: [
      {
        heading: "Usługi",
        links: [
          { label: "Terapia Indywidualna", href: "/individual-therapy" },
          { label: "Terapia Par", href: "/couples-therapy" },
          { label: "Praca z Liderami i Założycielami", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Firma",
        links: [
          { label: "O Nas", href: "#" },
          { label: "Kontakt", href: "#" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Wsparcie indywidualne",
        title: "Terapia Indywidualna",
        description:
          "Wsparcie w Twoich własnych sytuacjach życiowych — lęk, żałoba, tożsamość, zmiany i ciężar, który niesiesz samotnie.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
      },
      {
        eyebrow: "Wsparcie relacyjne",
        title: "Terapia Par",
        description:
          "Zrozumcie, jak funkcjonujecie jako para — poprawcie komunikację, odbudujcie zaufanie i naprawcie wzorzec leżący u podstaw konfliktu.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Wsparcie liderów",
        title: "Praca z Liderami i Założycielami",
        description:
          "Wsparcie na poziomie, na którym faktycznie zachodzą decyzje i izolacja — dla założycieli i liderów niosących ciężar, na który rola nie daje miejsca.",
        href: "/executive-founder-work",
        color: "text-[#496171]",
      },
    ],
    learnMore: "Dowiedz się więcej →",
    footerTagline: "Wszelkie prawa zastrzeżone.",
  },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [language, setLanguage] = useState<(typeof languages)[number]>(languages[0]);
  const t = content[language.code];

  const openCalendly = (url: string) => {
    const calendly = (window as any).Calendly;
    if (calendly) {
      calendly.initPopupWidget({ url });
    }
    setIsBookingOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <div className="relative h-screen w-full overflow-hidden bg-[#fafafb]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/morawska-marta-psychotherapy.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Therapy introduction video"
        />
        <div className="absolute inset-0 bg-black/10" />

        <h2 className="absolute inset-x-0 bottom-16 z-10 px-6 text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-white sm:bottom-20 sm:text-6xl">
          {t.videoOverlay}
        </h2>

        <nav className="fixed inset-x-4 top-4 z-20 flex items-center justify-between rounded-[1.5rem] border border-white/50 bg-white/50 px-4 py-3 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:inset-x-6 sm:top-6 sm:px-6">
          <span className="flex items-center gap-2">
            <img src="/logo-a.svg" alt="Aether Practice logo" className="h-6 w-6" />
            <span className="text-lg font-medium tracking-[-0.04em] sm:text-xl">
              Aether Practice
            </span>
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="border border-zinc-900/20 bg-white px-[30px] py-3 text-sm transition-colors hover:bg-zinc-100"
            >
              {t.bookNow}
            </button>
            <div className="relative">
              <button
                onClick={() => setIsLangOpen((open) => !open)}
                aria-label="Select language"
                aria-expanded={isLangOpen}
                className="flex items-center gap-2 px-2 py-3 text-sm text-zinc-900"
              >
                {language.label}
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className={`shrink-0 self-center transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 flex w-12 flex-col rounded-xl border border-zinc-900/10 bg-white py-1 shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangOpen(false);
                      }}
                      className="px-3 py-2 text-center text-sm text-zinc-900 transition-colors hover:bg-zinc-100"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsMenuOpen(true)}
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

        {isMenuOpen && (
          <div className="fixed inset-0 z-30 flex justify-end">
            <div
              className="absolute inset-0 animate-in fade-in bg-zinc-900/20 duration-300"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="relative flex h-full w-full max-w-md flex-col gap-12 overflow-y-auto bg-[#fafafb] px-8 py-24 shadow-2xl animate-in slide-in-from-right duration-300 ease-out sm:px-12">
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-zinc-900/20 bg-white transition-colors hover:bg-zinc-100"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L15 15M15 1L1 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {t.menuSections.map((section) => (
                <div key={section.heading} className="flex flex-col gap-6">
                  <p className="text-sm uppercase tracking-wide text-zinc-500">
                    {section.heading}
                  </p>
                  <div className="flex flex-col gap-6">
                    {section.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="inline-block origin-left font-[Roboto,Arial,sans-serif] text-3xl font-medium tracking-tight text-zinc-900 transition-transform duration-300 ease-out hover:translate-x-2 hover:scale-x-105"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isBookingOpen && (
          <div className="fixed inset-0 z-30 flex items-center justify-center px-6">
            <div
              className="absolute inset-0 animate-in fade-in bg-zinc-900/20 duration-300"
              onClick={() => setIsBookingOpen(false)}
              aria-hidden="true"
            />
            <div className="relative flex w-full max-w-md flex-col gap-6 rounded-3xl bg-[#fafafb] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300 ease-out sm:p-10">
              <button
                onClick={() => setIsBookingOpen(false)}
                aria-label="Close booking"
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-zinc-900/20 bg-white transition-colors hover:bg-zinc-100"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M1 1L15 15M15 1L1 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <p className="text-sm uppercase tracking-wide text-zinc-500">
                Choose your session
              </p>
              <div className="flex flex-col gap-3">
                {bookingServices.map((service) => (
                  <button
                    key={service.label}
                    onClick={() => openCalendly(service.calendlyUrl)}
                    className="flex items-center justify-between border border-zinc-900/15 bg-white px-5 py-4 text-left transition-colors hover:bg-zinc-100"
                  >
                    <span className="font-[Roboto,Arial,sans-serif] text-lg font-medium text-zinc-900">
                      {service.label}
                    </span>
                    <span className="text-sm text-zinc-500">{service.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="flex flex-col items-center px-6 pb-12 pt-[104px] text-center font-[Inter,-apple-system,BlinkMacSystemFont,'SF_Pro_Text',system-ui,sans-serif] text-[19px] font-normal leading-[1.5] text-[#383838]">
        <h1 className="max-w-6xl text-balance font-[Roboto,Arial,sans-serif] text-[90px] font-medium leading-[0.95] tracking-tight text-zinc-900">
          {t.heroTitle}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.5] text-zinc-700">
          {t.subtext}
        </p>
        <div className="mt-[70px] flex max-w-7xl flex-wrap items-center justify-center gap-3">
          {t.pills.map((pill) => (
            <span
              key={pill}
              className="rounded-xl border border-[#e1c2af] bg-gradient-to-r from-[#e1c2af] to-[#f0ddd2] px-5 py-3 text-base text-zinc-700"
            >
              {pill}
            </span>
          ))}
        </div>
        <div className="mt-[136px] flex w-full max-w-6xl flex-col gap-6 text-left">
          {t.supportSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-zinc-300/80 bg-[#fafafb] p-8 transition-colors duration-300 hover:bg-[#eee2db]/70 sm:p-14"
            >
              <h2 className="inline-block origin-left font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium tracking-tight text-zinc-900 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:scale-x-105 sm:text-7xl">
                {section.title}
              </h2>
              <p className="mt-8 max-w-5xl text-[20px] leading-[1.5] text-[#383838]">
                {section.description}
              </p>
              <span className="mt-10 inline-block text-base text-[#383838]">
                {t.learnMore}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center gap-4 px-6 py-10 text-center font-[Roboto,Arial,sans-serif] text-sm text-[#383838]">
        <span className="text-lg font-medium tracking-tight text-zinc-900">
          Aether Practice
        </span>
        <p>© {new Date().getFullYear()} Aether Practice. {t.footerTagline}</p>
      </footer>
    </main>
  );
}
