"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import { couplesTherapyContent, navContent, relatedServicesHeading, type LanguageCode } from "@/lib/service-content";

const testimonialsContent: Record<
  LanguageCode,
  {
    eyebrow: string;
    heading: string;
    context: string;
    items: { quote: string; name: string; accentText: string; accentBg: string }[];
  }
> = {
  en: {
    eyebrow: "Client Stories",
    heading: "Trusted by people who expect more from their care",
    context: "Couples clients",
    items: [
      {
        quote: "We found a calmer way to talk about the things we had been avoiding.",
        name: "J. & A.",
        accentText: "text-[#66755c]",
        accentBg: "from-[#d9e2d1]/55 to-[#d9e2d1]/20",
      },
      {
        quote: "The sessions helped us listen differently and feel more connected again.",
        name: "M. & R.",
        accentText: "text-[#7b4037]",
        accentBg: "from-[#e8d6ce]/55 to-[#e8d6ce]/20",
      },
      {
        quote: "We learned how to repair the pattern instead of repeating the same argument.",
        name: "S. & D.",
        accentText: "text-[#496171]",
        accentBg: "from-[#d8e2e8]/55 to-[#d8e2e8]/20",
      },
    ],
  },
  no: {
    eyebrow: "Kundehistorier",
    heading: "Betrodd av folk som forventer mer av behandlingen sin",
    context: "Parterapiklienter",
    items: [
      {
        quote: "Vi fant en roligere måte å snakke om det vi hadde unngått.",
        name: "J. & A.",
        accentText: "text-[#66755c]",
        accentBg: "from-[#d9e2d1]/55 to-[#d9e2d1]/20",
      },
      {
        quote: "Samtalene hjalp oss å lytte annerledes og føle oss knyttet til hverandre igjen.",
        name: "M. & R.",
        accentText: "text-[#7b4037]",
        accentBg: "from-[#e8d6ce]/55 to-[#e8d6ce]/20",
      },
      {
        quote: "Vi lærte å reparere mønsteret i stedet for å gjenta den samme konflikten.",
        name: "S. & D.",
        accentText: "text-[#496171]",
        accentBg: "from-[#d8e2e8]/55 to-[#d8e2e8]/20",
      },
    ],
  },
  pl: {
    eyebrow: "Historie klientów",
    heading: "Zaufany przez ludzi, którzy oczekują więcej od swojej opieki",
    context: "Klienci terapii par",
    items: [
      {
        quote: "Znaleźliśmy spokojniejszy sposób rozmawiania o tym, czego wcześniej unikaliśmy.",
        name: "J. & A.",
        accentText: "text-[#66755c]",
        accentBg: "from-[#d9e2d1]/55 to-[#d9e2d1]/20",
      },
      {
        quote: "Sesje pomogły nam inaczej słuchać i na nowo poczuć bliskość.",
        name: "M. & R.",
        accentText: "text-[#7b4037]",
        accentBg: "from-[#e8d6ce]/55 to-[#e8d6ce]/20",
      },
      {
        quote: "Nauczyliśmy się naprawiać wzorzec, zamiast powtarzać ten sam konflikt.",
        name: "S. & D.",
        accentText: "text-[#496171]",
        accentBg: "from-[#d8e2e8]/55 to-[#d8e2e8]/20",
      },
    ],
  },
};

export default function CouplesTherapyPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = couplesTherapyContent[language];

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
        {t.subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-[1.5] text-zinc-700">
            {language === "en" ? (
              <>
                Online couples sessions for partners in{" "}
                <Link
                  href="/couples-therapy-new-york-city"
                  className="underline underline-offset-4 hover:text-zinc-600"
                >
                  New York City
                </Link>{" "}
                and California.
              </>
            ) : (
              t.subtitle
            )}
          </p>
        )}
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          {t.intro}
        </p>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {t.panels.map((panel, index) => (
            <div key={panel.title} className={`rounded-2xl border border-zinc-300/80 p-8 sm:p-10 ${index < 2 ? "bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20" : ""}`}>
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
            {t.processHeading}
          </h2>
          <div className="mt-12 flex flex-col">
            {t.process.map((step) => (
              <div
                key={step.number}
                className="flex flex-col gap-4 border-t border-zinc-300/80 py-10 sm:flex-row sm:items-start sm:gap-12"
              >
                <span className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium text-[#74382f] sm:w-20 sm:shrink-0">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-3xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {language === "no" && (
          <p className="mt-10 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            Vil dere vite mer om parterapi i Oslo, hva dere kan forvente og hva det koster? Les vår{" "}
            <Link href="/blog/parterapi-i-oslo" className="text-[#74382f] underline underline-offset-2 hover:no-underline">
              komplette guide til parterapi i Oslo
            </Link>
            .
          </p>
        )}

        <div className="mt-24">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            {t.outcomesHeading}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {t.outcomes.map((outcome) => (
              <div key={outcome.title} className="rounded-2xl border border-zinc-300/80 p-8">
                <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-xl font-medium">
                  {outcome.title}
                </h3>
                <p className="mt-4 font-[Roboto,Arial,sans-serif] text-[17px] leading-[1.5] text-[#383838]">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 flex w-full flex-col items-center gap-4">
          <p className="text-sm uppercase tracking-wide text-zinc-500">{testimonialsContent[language].eyebrow}</p>
          <h2 className="max-w-3xl text-balance text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium tracking-tight text-zinc-900 sm:text-6xl">
            {testimonialsContent[language].heading}
          </h2>
        </div>
        <div className="mt-16 grid w-full gap-6 sm:grid-cols-3">
          {testimonialsContent[language].items.map((item) => (
            <div
              key={item.name}
              className={`flex flex-col gap-8 rounded-2xl border border-zinc-300/80 bg-[#f4efea] p-8 sm:p-10`}
            >
              <div className="flex justify-center gap-1 text-[#74382f]" aria-hidden="true">
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
                  <span className="text-sm text-zinc-500">{testimonialsContent[language].context}</span>
                </div>
              </div>
            </div>
          ))}
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

        <div className="mt-24">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium tracking-tight">
            {relatedServicesHeading[language]}
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {navContent[language].menuLinks
              .filter((link) => link.href !== "/couples-therapy")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-zinc-300/80 px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
      </section>
      <SiteFooter language={language} />
      <BookingModal language={language} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
