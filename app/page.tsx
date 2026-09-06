"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const bookingServices = [
  {
    label: "Individual Session",
    duration: "50 min",
    priceInCents: 10000,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
  {
    label: "Couples Session",
    duration: "60 min",
    priceInCents: 12000,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
  {
    label: "Family Session",
    duration: "60 min",
    priceInCents: 15000,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
  {
    label: "Executive&Founder Session",
    duration: "50 min",
    priceInCents: 10000,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
  {
    label: "Initial Consultation",
    duration: "15 min",
    priceInCents: 0,
    calendlyUrl: "https://calendly.com/martamindacc",
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
    testimonialsEyebrow: string;
    testimonialsHeading: string;
    testimonials: {
      quote: string;
      name: string;
      context: string;
      initials: string;
      accentText: string;
      accentBg: string;
    }[];
    finalCtaHeading: string;
    finalCtaSubtext: string;
    finalCtaButton: string;
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
      "Individual Sessions",
      "Couples Sessions",
      "Stress Support",
      "Personal Growth",
      "Mindful Living",
    ],
    menuSections: [
      {
        heading: "Services",
        links: [
          { label: "Individual", href: "/individual-therapy" },
          { label: "Couples", href: "/couples-therapy" },
          { label: "Family", href: "/family-support" },
          { label: "Executive & Founder Work", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Individual support",
        title: "Individual",
        description:
          "Support in your own life situations — anxiety, grief, identity, transitions, and the weight you carry alone.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
      },
      {
        eyebrow: "Relationship support",
        title: "Couples",
        description:
          "Understand how you work together as a couple — improve communication, rebuild trust, and repair the pattern underneath the conflict.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Family support",
        title: "Family",
        description:
          "Create a steadier family rhythm — with clearer communication, stronger connection, and practical support for the moments that shape life together.",
        href: "/family-support",
        color: "text-[#8a6558]",
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
    testimonialsEyebrow: "Client Stories",
    testimonialsHeading: "Trusted by people who expect more from their care",
    testimonials: [
      {
        quote:
          "For the first time in years, I understand why I react the way I do. The work here didn't just calm me down — it gave me a framework for the rest of my life.",
        name: "M. R.",
        context: "Individual client, 8 months",
        initials: "MR",
        accentText: "text-[#7b4037]",
        accentBg: "bg-[#7b4037]/10",
      },
      {
        quote:
          "We came in on the edge of separating. What we found was a way to actually hear each other again — not just survive the conversation, but want to have it.",
        name: "J. & A.",
        context: "Couples clients, 1 year",
        initials: "JA",
        accentText: "text-[#66755c]",
        accentBg: "bg-[#66755c]/10",
      },
      {
        quote:
          "As a founder, I'd never had a space where the weight of the decisions was actually welcome. This is the only hour of my week I don't perform.",
        name: "K. T.",
        context: "Founder, Executive work",
        initials: "KT",
        accentText: "text-[#496171]",
        accentBg: "bg-[#496171]/10",
      },
    ],
    finalCtaHeading: "Your life won't change by thinking about it.",
    finalCtaSubtext:
      "Every person you just read about started the same way you can start today — with one session. Stop carrying it alone.",
    finalCtaButton: "Book Your Session",
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
{ label: "Individuell terapi", href: "/individual-therapy" },
      { label: "Parterapi", href: "/couples-therapy" },
      { label: "Familieterapi", href: "/family-support" },
          { label: "Leder- og Grunnleggerarbeid", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Selskap",
        links: [
          { label: "Om Oss", href: "/about" },
          { label: "Kontakt", href: "/contact" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Individuell støtte",
        title: "Individuell terapi",
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
        eyebrow: "Familiestøtte",
        title: "Familieterapi",
        description:
          "Skap en stødigere familierytme — med tydeligere kommunikasjon, sterkere tilknytning og praktisk støtte for øyeblikkene som former livet sammen.",
        href: "/family-support",
        color: "text-[#8a6558]",
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
    testimonialsEyebrow: "Klienthistorier",
    testimonialsHeading: "Betrodd av mennesker som forventer mer av omsorgen sin",
    testimonials: [
      {
        quote:
          "For første gang på flere år forstår jeg hvorfor jeg reagerer som jeg gjør. Arbeidet her roet meg ikke bare ned — det ga meg et rammeverk for resten av livet.",
        name: "M. R.",
        context: "Individuell klient, 8 måneder",
        initials: "MR",
        accentText: "text-[#7b4037]",
        accentBg: "bg-[#7b4037]/10",
      },
      {
        quote:
          "Vi kom inn på randen av å skilles. Det vi fant var en måte å faktisk høre hverandre igjen — ikke bare overleve samtalen, men ønske å ha den.",
        name: "J. & A.",
        context: "Par-klienter, 1 år",
        initials: "JA",
        accentText: "text-[#66755c]",
        accentBg: "bg-[#66755c]/10",
      },
      {
        quote:
          "Som gründer hadde jeg aldri hatt et rom der vekten av beslutningene faktisk var velkommen. Dette er den eneste timen i uken jeg ikke presterer.",
        name: "K. T.",
        context: "Gründer, lederarbeid",
        initials: "KT",
        accentText: "text-[#496171]",
        accentBg: "bg-[#496171]/10",
      },
    ],
    finalCtaHeading: "Livet ditt endres ikke av å tenke på det.",
    finalCtaSubtext:
      "Hver person du nettopp leste om startet på samme måte som du kan starte i dag — med én økt. Slutt å bære det alene.",
    finalCtaButton: "Bestill Din Økt",
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
          { label: "Indywidualne", href: "/individual-therapy" },
          { label: "Pary", href: "/couples-therapy" },
          { label: "Rodzina", href: "/family-support" },
          { label: "Praca z Liderami i Założycielami", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Firma",
        links: [
          { label: "O Nas", href: "/about" },
          { label: "Kontakt", href: "/contact" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Wsparcie indywidualne",
        title: "Indywidualne",
        description:
          "Wsparcie w Twoich sytuacjach życiowych — w zmianach, przejściach i ciężarze, który niesiesz samodzielnie.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
      },
      {
        eyebrow: "Wsparcie relacji",
        title: "Pary",
        description:
          "Zrozumcie, jak funkcjonujecie razem — poprawcie komunikację, odbudujcie zaufanie i naprawcie wzorzec stojący za konfliktem.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Wsparcie rodzinne",
        title: "Rodzina",
        description:
          "Zbuduj stabilniejszy rytm rodzinny — z jaśniejszą komunikacją, silniejszą więzią i praktycznym wsparciem dla chwil, które kształtują wspólne życie.",
        href: "/family-support",
        color: "text-[#8a6558]",
      },
      {
        eyebrow: "Wsparcie przywódcze",
        title: "Praca z Liderami i Założycielami",
        description:
          "Wsparcie na poziomie, na którym faktycznie zachodzą decyzje i izolacja — dla założycieli i liderów niosących ciężar, na który rola nie daje miejsca.",
        href: "/executive-founder-work",
        color: "text-[#496171]",
      },
    ],
    learnMore: "Dowiedz się więcej →",
    testimonialsEyebrow: "Historie Klientów",
    testimonialsHeading: "Zaufali nam ludzie, którzy oczekują więcej od swojej opieki",
    testimonials: [
      {
        quote:
          "Po raz pierwszy od lat rozumiem, czemu reaguję tak, jak reaguję. Ta praca nie tylko mnie uspokoiła — dała mi ramy na resztę życia.",
        name: "M. R.",
        context: "Klient indywidualny, 8 miesięcy",
        initials: "MR",
        accentText: "text-[#7b4037]",
        accentBg: "bg-[#7b4037]/10",
      },
      {
        quote:
          "Przyszliśmy na granicy rozstania. To, co znaleźliśmy, to sposób, by naprawdę siebie usłyszeć — nie tylko przetrwać rozmowę, ale chcieć ją prowadzić.",
        name: "J. i A.",
        context: "Klienci, terapia par, 1 rok",
        initials: "JA",
        accentText: "text-[#66755c]",
        accentBg: "bg-[#66755c]/10",
      },
      {
        quote:
          "Jako założyciel nigdy nie miałem miejsca, w którym ciężar decyzji był naprawdę mile widziany. To jedyna godzina w tygodniu, w której nie muszę odgrywać roli.",
        name: "K. T.",
        context: "Założyciel, praca liderska",
        initials: "KT",
        accentText: "text-[#496171]",
        accentBg: "bg-[#496171]/10",
      },
    ],
    finalCtaHeading: "Twoje życie nie zmieni się przez samo myślenie o tym.",
    finalCtaSubtext:
      "Każda osoba, o której właśnie przeczytałeś, zaczęła tak samo, jak Ty możesz zacząć dziś — od jednej sesji. Przestań nieść to sam.",
    finalCtaButton: "Zarezerwuj Sesję",
    footerTagline: "Wszelkie prawa zastrzeżone.",
  },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingLabel, setSelectedBookingLabel] = useState<string | null>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<(typeof languages)[number]>(languages[0]);
  const t = content[language.code];

  useEffect(() => {
    const stored = localStorage.getItem("site-language");
    const match = languages.find((lang) => lang.code === stored);
    if (match) setLanguage(match);
  }, []);

  const selectedBookingService = bookingServices.find(
    (service) => service.label === selectedBookingLabel,
  );
  const bookingLabel = (label: string) =>
    language.code === "no"
      ? { "Individual Session": "Individuell terapi", "Couples Session": "Parterapi", "Family Session": "Familieterapi", "Executive&Founder Session": "Leder- og grunnleggerterapi", "Initial Consultation": "Innledende konsultasjon" }[label] ?? label
      : label;

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedBookingLabel(null);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

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
  <div ref={languageMenuRef} className="relative">
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
                        localStorage.setItem("site-language", lang.code);
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
          <div className="fixed inset-0 z-30 flex items-center justify-center overflow-y-auto px-6 py-6">
            <div
              className="fixed inset-0 animate-in fade-in bg-zinc-900/20 duration-300"
              onClick={closeBooking}
              aria-hidden="true"
            />
            <div className="relative my-auto flex max-h-[90vh] w-full max-w-md flex-col gap-6 overflow-y-auto rounded-3xl bg-[#fafafb] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300 ease-out sm:p-10">
              <button
                onClick={closeBooking}
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
              {!selectedBookingService ? (
                <>
                  <p className="text-sm uppercase tracking-wide text-zinc-500">
                    {language.code === "no" ? "Velg din økt" : "Choose your session"}
                  </p>
                  <div className="flex flex-col gap-3">
                    {bookingServices.map((service) => (
                      <button
                        key={service.label}
                        onClick={() => setSelectedBookingLabel(service.label)}
                        className="flex items-center justify-between border border-zinc-900/15 bg-white px-5 py-4 text-left transition-colors hover:bg-zinc-100"
                      >
                        <span className="font-[Roboto,Arial,sans-serif] text-lg font-medium text-zinc-900">
{bookingLabel(service.label)}
                        </span>
                        <span className="text-sm text-zinc-500">
                          {service.duration}
                          {service.priceInCents > 0 && ` · $${(service.priceInCents / 100).toFixed(0)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-wide text-zinc-500">
                      {bookingLabel(selectedBookingService.label)}
                    </p>
                    <button
                      onClick={() => setSelectedBookingLabel(null)}
                      className="text-sm text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline"
                    >
                      {language.code === "no" ? "Tilbake" : "Back"}
                    </button>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-zinc-900/10">
                    <iframe
                      key={selectedBookingService.calendlyUrl}
                      src={`${selectedBookingService.calendlyUrl}?hide_gdpr_banner=1`}
                      title={language.code === "no" ? "Bestill din økt" : "Schedule your session"}
                      className="h-[70vh] min-h-[500px] w-full"
                    />
                  </div>
                </>
              )}
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
              className="group rounded-2xl border border-zinc-300/80 bg-[#fafafb] p-8 transition-colors duration-300 hover:bg-[#e2c3b2]/60 sm:p-14"
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

        <div className="mt-32 flex w-full max-w-6xl flex-col items-center gap-4">
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            {t.testimonialsEyebrow}
          </p>
          <h2 className="max-w-3xl text-balance text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium tracking-tight text-zinc-900 sm:text-6xl">
            {t.testimonialsHeading}
          </h2>
        </div>
        <div className="mt-16 grid w-full max-w-6xl gap-6 sm:grid-cols-3">
          {t.testimonials.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/75 to-[#eee2db]/40 p-8 transition-colors duration-300 hover:bg-[#e2c3b2]/60 sm:p-10"
            >
              <div className={`flex gap-1 ${item.accentText}`} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg key={index} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.7 6.06 6.6.63-5 4.4 1.5 6.46L10 15.9l-5.8 3.15 1.5-6.46-5-4.4 6.6-.63L10 1.5z" />
                  </svg>
                ))}
              </div>
              <p className="flex-1 font-[Roboto,Arial,sans-serif] text-lg leading-[1.6] text-[#383838]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-medium ${item.accentText} ${item.accentBg}`}
                >
                  {item.initials}
                </span>
                <div className="flex flex-col">
                  <span className="font-[Roboto,Arial,sans-serif] text-base font-medium text-zinc-900">
                    {item.name}
                  </span>
                  <span className="text-sm text-zinc-500">{item.context}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="-mx-6 mt-32 flex w-[calc(100%+3rem)] flex-col items-center gap-9 bg-zinc-950 px-6 py-28 text-center sm:py-36">
          <span className="text-sm uppercase tracking-[0.3em] text-[#e1c2af]">
            {t.testimonialsEyebrow}
          </span>
          <h2 className="max-w-3xl text-balance font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-6xl">
            {t.finalCtaHeading}
          </h2>
          <div className="h-px w-16 bg-zinc-700" />
          <p className="max-w-xl text-balance font-[Roboto,Arial,sans-serif] text-lg leading-[1.6] text-zinc-400">
            {t.finalCtaSubtext}
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="mt-2 border border-white/30 px-10 py-5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-zinc-950"
          >
            {t.finalCtaButton}
          </button>
        </div>
      </section>

  <footer className="flex flex-col items-center gap-4 px-6 py-10 text-center font-[Roboto,Arial,sans-serif] text-sm text-[#383838]">
  <span className="flex items-center gap-2 text-lg font-medium tracking-tight text-zinc-900">
  <img src="/logo-a.svg" alt="Aether Practice logo" className="h-5 w-5" />
  Aether Practice
  </span>
        <p>© {new Date().getFullYear()} Aether Practice. {t.footerTagline}</p>
      </footer>
    </main>
  );
}
