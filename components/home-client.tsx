"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { sendGAEvent } from "@/components/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { buildCalendlyBookingUrl } from "@/lib/booking-url";
import { PRODUCTS, type Product } from "@/lib/products";
import type { BlogPostMeta } from "@/lib/blog";

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
    heroSubtitle: string;
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
    blogEyebrow: string;
    blogAllLink: string;
    blogReadMore: string;
    finalCtaHeading: string;
    finalCtaSubtext: string;
    finalCtaButton: string;
    footerTagline: string;
  }
> = {
  en: {
    videoOverlay: "Your Future is Yours to Shape",
    heroTitle: "Better life starts with better understanding",
    heroSubtitle:
      "Private online sessions for couples, individuals, families, executives, and founders in New York City, California, and Norway.",
    subtext: "",
    bookNow: "Book Now",
    pills: [
      "Couples Sessions",
      "Emotional Wellness",
      "Individual Sessions",
      "Stress Support",
      "Personal Growth",
      "Mindful Living",
    ],
    menuSections: [
      {
        heading: "Services",
        links: [
          { label: "Couples Session", href: "/couples-therapy" },
          { label: "Individual Session", href: "/individual-therapy" },
          { label: "Family Session", href: "/family-support" },
          { label: "Executive & Founder Work", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Relationship support",
        title: "Couples Session",
        description:
          "Understand how you work together as a couple — improve communication, rebuild trust, and repair the pattern underneath the conflict.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Individual support",
        title: "Individual Session",
        description:
          "Support in your own life situations — anxiety, grief, identity, transitions, and the weight you carry alone.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
      },
      {
        eyebrow: "Family support",
        title: "Family Session",
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
        context: "Individual client",
        initials: "MR",
        accentText: "text-[#7b4037]",
        accentBg: "bg-[#7b4037]/10",
      },
      {
        quote:
          "We came in on the edge of separating. What we found was a way to actually hear each other again — not just survive the conversation, but want to have it.",
        name: "J. & A.",
        context: "Couples clients",
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
    blogEyebrow: "FROM THE BLOG",
    blogAllLink: "All articles →",
    blogReadMore: "Read more →",
    finalCtaHeading: "The clarity you're looking for begins today.",
    finalCtaSubtext:
      "A practice built for those who expect the same rigor from their inner life as they do from their work.",
    finalCtaButton: "Book Your Session",
    footerTagline: "All rights reserved.",
  },
  no: {
    videoOverlay: "Din Fremtid Er Din Å Forme",
    heroTitle: "Klarhet for et liv med høy innsats",
    heroSubtitle:
      "Private online samtaler for par, enkeltpersoner, familier, ledere og grunnleggere i Oslo og hele Norge.",
    subtext: "",
    bookNow: "Bestill Nå",
    pills: [
      "Parterapi",
      "Emosjonell Velvære",
      "Individualterapi",
      "Stressstøtte",
      "Personlig Vekst",
      "Bevisst Liv",
    ],
    menuSections: [
      {
        heading: "Tjenester",
        links: [
          { label: "Parterapi", href: "/couples-therapy" },
          { label: "Individuell terapi", href: "/individual-therapy" },
          { label: "Familieterapi", href: "/family-support" },
          { label: "Leder- og Grunnleggerarbeid", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Selskap",
        links: [
          { label: "Om Oss", href: "/about" },
          { label: "Blogg", href: "/blog" },
          { label: "Kontakt", href: "/contact" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Relasjonsstøtte",
        title: "Parterapi",
        description:
          "Forstå hvordan dere fungerer som par — forbedre kommunikasjon, gjenoppbygg tillit, og reparer mønsteret under konflikten.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Individuell støtte",
        title: "Individuell terapi",
        description:
          "Støtte i dine egne livssituasjoner — angst, sorg, identitet, overganger, og vekten du bærer alene.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
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
        context: "Individuell klient",
        initials: "MR",
        accentText: "text-[#7b4037]",
        accentBg: "bg-[#7b4037]/10",
      },
      {
        quote:
          "Vi kom inn på randen av å skilles. Det vi fant var en måte å faktisk høre hverandre igjen — ikke bare overleve samtalen, men ønske å ha den.",
        name: "J. & A.",
        context: "Par-klienter",
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
    blogEyebrow: "FRA BLOGGEN",
    blogAllLink: "Alle artikler →",
    blogReadMore: "Les mer →",
    finalCtaHeading: "Klarheten du søker begynner med én samtale.",
    finalCtaSubtext:
      "En praksis bygget for dem som forventer samme presisjon i sitt innerliv som i arbeidet sitt.",
    finalCtaButton: "Bestill Din Økt",
    footerTagline: "Alle rettigheter reservert.",
  },
  pl: {
    videoOverlay: "Twoja Przyszłość Jest Twoja do Kształtowania",
    heroTitle: "Jasność dla życia wysokiej stawki",
    heroSubtitle:
      "Prywatne sesje online dla par, osób indywidualnych, rodzin, kadry kierowniczej i założycieli firm w Nowym Jorku, Kalifornii i Norwegii.",
    subtext: "",
    bookNow: "Zarezerwuj",
    pills: [
      "Terapia Par",
      "Dobrostan Emocjonalny",
      "Terapia Indywidualna",
      "Wsparcie w Stresie",
      "Rozwój Osobisty",
      "Uważne Życie",
    ],
    menuSections: [
      {
        heading: "Usługi",
        links: [
          { label: "Sesja dla Par", href: "/couples-therapy" },
          { label: "Sesja Indywidualna", href: "/individual-therapy" },
          { label: "Sesja Rodzinna", href: "/family-support" },
          { label: "Praca z Liderami i Założycielami", href: "/executive-founder-work" },
        ],
      },
      {
        heading: "Firma",
        links: [
          { label: "O Nas", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "Kontakt", href: "/contact" },
        ],
      },
    ],
    supportSections: [
      {
        eyebrow: "Wsparcie relacji",
        title: "Sesja dla Par",
        description:
          "Zrozumcie, jak funkcjonujecie razem — poprawcie komunikację, odbudujcie zaufanie i naprawcie wzorzec stojący za konfliktem.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Wsparcie indywidualne",
        title: "Sesja Indywidualna",
        description:
          "Wsparcie w Twoich sytuacjach życiowych — w zmianach, przejściach i ciężarze, który niesiesz samodzielnie.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
      },
      {
        eyebrow: "Wsparcie rodzinne",
        title: "Sesja Rodzinna",
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
        context: "Klient indywidualny",
        initials: "MR",
        accentText: "text-[#7b4037]",
        accentBg: "bg-[#7b4037]/10",
      },
      {
        quote:
          "Przyszliśmy na granicy rozstania. To, co znaleźliśmy, to sposób, by naprawdę siebie usłyszeć — nie tylko przetrwać rozmowę, ale chcieć ją prowadzić.",
        name: "J. i A.",
        context: "Klienci, terapia par",
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
    blogEyebrow: "FROM THE BLOG",
    blogAllLink: "All articles →",
    blogReadMore: "Read more →",
    finalCtaHeading: "Jasność, której szukasz, zaczyna się od jednej rozmowy.",
    finalCtaSubtext:
      "Praktyka stworzona dla tych, którzy oczekują tej samej precyzji w swoim życiu wewnętrznym, jak w pracy.",
    finalCtaButton: "Zarezerwuj Sesję",
    footerTagline: "Wszelkie prawa zastrzeżone.",
  },
};

function formatBlogDate(date: string, lang: string): string {
  const localeMap: Record<string, string> = { no: "nb-NO", pl: "pl-PL", en: "en-US" };
  return new Date(date)
    .toLocaleDateString(localeMap[lang] ?? "en-US", { month: "long", year: "numeric" })
    .toUpperCase();
}

export default function HomeClient({ posts }: { posts: BlogPostMeta[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingName, setSelectedBookingName] = useState<string | null>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<(typeof languages)[number]>(languages[0]);
  const t = content[language.code];
  const hasTrackedBookingOpenRef = useRef(false);

  useEffect(() => {
    localStorage.setItem("site-language", "en");
  }, []);

  const selectedBookingService = PRODUCTS.find(
    (product) => product.name === selectedBookingName,
  );
  const bookingLabel = (name: string) =>
    language.code === "no"
      ? { "Individual Session": "Individuell terapi", "Couples Session": "Parterapi", "Family Session": "Familieterapi", "Exec&Founder Session": "Leder- og grunnleggerterapi", "Initial Consultation": "Innledende konsultasjon" }[name] ?? name
      : name;

  const openBooking = () => {
    setIsBookingOpen(true);
    if (!hasTrackedBookingOpenRef.current) {
      hasTrackedBookingOpenRef.current = true;
      const params = { page: window.location.pathname };
      track("booking_modal_opened", params);
      sendGAEvent("booking_modal_opened", params);
    }
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedBookingName(null);
    hasTrackedBookingOpenRef.current = false;
  };

  const selectBookingService = (service: Product) => {
    const params = { service: service.name, page: window.location.pathname };
    track("booking_service_selected", params);
    sendGAEvent("booking_service_selected", params);
    setSelectedBookingName(service.name);
    window.open(buildCalendlyBookingUrl(service.calendlyUrl), "_blank", "noopener,noreferrer");
    track("booking_calendar_opened", params);
    sendGAEvent("booking_calendar_opened", params);
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

  const blogPosts = posts
    .filter((p) => p.lang === language.code)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
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

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:items-end sm:justify-center sm:pb-16">
          <h2 className="text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-white sm:text-6xl">
            {t.videoOverlay}
          </h2>
        </div>

        <nav className="fixed inset-x-4 top-4 z-20 flex items-center justify-between rounded-[1.5rem] border border-white/50 bg-white/50 px-2.5 py-2.5 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:inset-x-6 sm:top-6 sm:px-6 sm:py-3">
          <button
            onClick={openBooking}
            className="flex w-14 flex-col items-center justify-center whitespace-normal border border-zinc-900/20 bg-white/30 px-1 py-1.5 text-center text-[11px] leading-tight transition-colors hover:bg-white/65 sm:hidden"
          >
            {t.bookNow}
          </button>
          <span className="hidden items-center gap-2 sm:flex">
            <img src="/logo-a.svg" alt="Aether Practice logo" className="h-6 w-6" />
            <span className="text-lg font-medium tracking-[-0.04em] sm:text-xl">
              Aether Practice
            </span>
          </span>
          <span className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-2 sm:hidden">
            <img src="/logo-a.svg" alt="Aether Practice logo" className="h-5 w-5 shrink-0" />
            <span className="truncate text-sm font-medium tracking-[-0.04em]">Aether Practice</span>
          </span>
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={openBooking}
              className="hidden border border-zinc-900/20 bg-white/30 px-[30px] py-3 text-sm transition-colors hover:bg-white/65 sm:inline-block"
            >
              {t.bookNow}
            </button>
            <div ref={languageMenuRef} className="relative">
              <button
                onClick={() => setIsLangOpen((open) => !open)}
                aria-label="Select language"
                aria-expanded={isLangOpen}
                className="flex items-center gap-1 whitespace-nowrap px-1.5 py-3 text-sm text-zinc-900 sm:gap-2 sm:px-2"
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
              className="flex h-9 w-9 items-center justify-center border border-zinc-900/20 bg-white/30 transition-colors hover:bg-white/65 sm:h-11 sm:w-11"
              aria-label="Open menu"
            >
              <span className="flex w-4 flex-col gap-1 sm:w-5 sm:gap-1.5">
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
            <div className="relative my-auto flex max-h-[90vh] w-full max-w-md flex-col gap-6 overflow-y-auto rounded-3xl bg-[#fafafb] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300 ease-out sm:p-10">
              <button
                onClick={closeBooking}
                aria-label="Close booking"
                className="absolute right-5 top-5 flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-900/20 bg-white transition-colors hover:bg-zinc-100 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
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
                  <p className="pr-12 text-xs uppercase tracking-wide text-zinc-500 sm:text-sm">
                    {language.code === "no" ? "Velg din økt" : "Choose your session"}
                  </p>
                  <div className="flex flex-col gap-3">
                    {PRODUCTS.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => selectBookingService(service)}
                        className="flex items-center justify-between gap-3 border border-zinc-900/15 bg-white px-5 py-4 text-left transition-colors hover:bg-zinc-100"
                      >
                        <span className="min-w-0 font-[Roboto,Arial,sans-serif] text-base font-medium text-zinc-900 sm:text-lg">
                          {bookingLabel(service.name)}
                        </span>
                        <span className="shrink-0 whitespace-nowrap text-right text-sm text-zinc-500">
                          {service.duration}
                          {service.priceInCents > 0 && ` · $${(service.priceInCents / 100).toFixed(0)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3 pr-12">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 sm:text-sm">
                      {bookingLabel(selectedBookingService.name)}
                    </p>
                    <button
                      onClick={() => setSelectedBookingName(null)}
                      className="shrink-0 text-sm text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline"
                    >
                      {language.code === "no" ? "Tilbake" : "Back"}
                    </button>
                  </div>
                  <p className="text-sm text-zinc-500">
                    {language.code === "no"
                      ? "Kalendly-bookingsiden din har åpnet i en ny fane."
                      : language.code === "pl"
                        ? "Twoja strona rezerwacji Calendly otworzyła się w nowej karcie."
                        : "Your Calendly booking page has opened in a new tab."}
                  </p>
                  <a
                    href={buildCalendlyBookingUrl(selectedBookingService.calendlyUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-zinc-900/20 bg-white px-5 py-3 text-center text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
                  >
                    {language.code === "no" ? "Åpne Calendly" : language.code === "pl" ? "Otwórz Calendly" : "Open Calendly"}
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <section className="flex flex-col items-center px-6 pb-12 pt-[104px] text-center font-[Inter,-apple-system,BlinkMacSystemFont,'SF_Pro_Text',system-ui,sans-serif] text-[19px] font-normal leading-[1.5] text-[#383838]">
        <h1 className="max-w-6xl text-balance font-[Roboto,Arial,sans-serif] text-[44px] font-medium leading-[0.95] tracking-tight text-zinc-900 sm:text-[64px] lg:text-[90px]">
          {t.heroTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.5] text-zinc-700">
          {language.code === "en" ? (
            <>
              Private online sessions for couples, individuals, families, executives, and founders in New York City, California, and <Link href="/online-therapy-norway" className="underline underline-offset-4">Norway</Link>.
            </>
          ) : language.code === "no" ? (
            <>
              Private online samtaler for par, enkeltpersoner, familier, ledere og grunnleggere i Oslo og hele <Link href="/online-therapy-norway" className="underline underline-offset-4">Norge</Link>.
            </>
          ) : language.code === "pl" ? (
            <>
              Prywatne sesje online dla par, osób indywidualnych, rodzin, kadry kierowniczej i założycieli firm w Nowym Jorku, Kalifornii i <Link href="/online-therapy-norway" className="underline underline-offset-4">Norwegii</Link>.
            </>
          ) : t.heroSubtitle}
        </p>
        <div className="mt-[70px] flex max-w-7xl flex-wrap items-center justify-center gap-3">
          {t.pills.map((pill) => (
            <span
              key={pill}
              className="rounded-xl border border-[#f1e7de] bg-gradient-to-r from-[#f1e7de] to-[#f9f4ef] px-5 py-3 text-base text-zinc-700"
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
              className="group rounded-2xl border border-zinc-300/80 bg-[#fafafb] p-8 transition-colors duration-300 hover:bg-[#f1e7de] sm:p-14"
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
              className="flex flex-col gap-8 rounded-2xl border border-zinc-300/80 bg-[#f4efea] p-8 sm:p-10"
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
          ))}
        </div>

        <div className="mt-24 flex w-full max-w-6xl flex-col items-center gap-8 rounded-[2rem] px-8 pb-10 pt-20 text-center sm:px-20 sm:pb-16 sm:pt-28">
          <div className="h-px w-24 bg-[#c9a688]" />
          <h2 className="max-w-3xl text-balance font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-semibold leading-[1.1] tracking-wide text-zinc-900 sm:text-4xl">
            {t.finalCtaHeading}
          </h2>
          <button
            onClick={openBooking}
            className="mt-2 bg-zinc-900 px-10 py-5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            {t.finalCtaButton}
          </button>
        </div>
      </section>

      {blogPosts.length > 0 && (
        <section className="w-full bg-[#F3EBE4] py-28 sm:py-32">
          <div className="mx-auto flex max-w-6xl flex-col px-6 sm:px-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="h-px w-8 bg-[#c9a688]" />
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  {t.blogEyebrow}
                </p>
              </div>
              <Link
                href="/blog"
                className="text-xs uppercase tracking-[0.1em] text-zinc-400 transition-colors hover:text-zinc-900"
              >
                {t.blogAllLink}
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
                >
                  {post.image ? (
                    <div className="aspect-[3/2] w-full overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                      />
                    </div>
                  ) : null}
                  <div className={`flex flex-col px-6 pb-8 ${post.image ? "pt-5" : "pt-8"}`}>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-400">
                      {post.tags[0]} · {formatBlogDate(post.date, language.code)}
                    </p>
                    <h3 className="mt-3 line-clamp-2 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-[20px] font-medium leading-[1.25] tracking-tight text-zinc-900">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter language={language.code} />
    </main>
  );
}
