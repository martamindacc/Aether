"use client";

import { useEffect, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import type { LanguageCode } from "@/lib/service-content";

const content: Record<LanguageCode, {
  title: string;
  intro: string;
  panels: { title: string; description: string }[];
  processHeading: string;
  process: { number: string; title: string; description: string }[];
  outcomesHeading: string;
  outcomes: { title: string; description: string }[];
  ctaHeading: string;
  ctaSubtext: string;
  ctaButton: string;
}> = {
  en: {
    title: "Family Session",
    intro: "Family work creates a steadier way of being together — making room for honest conversations, clearer boundaries, and connection that can hold through change.",
    panels: [
      { title: "For the family you are", description: "Whether you are moving through conflict, a transition, grief, or a new chapter, we begin with the patterns your family is actually living with." },
      { title: "A shared space to reset", description: "Each person gets room to be heard without being placed on trial. The work is practical, relational, and focused on changing what happens between you." },
    ],
    processHeading: "How the work unfolds",
    process: [
      { number: "01", title: "Understand the pattern", description: "We map the recurring moments where communication breaks down, roles become fixed, or distance starts to grow." },
      { number: "02", title: "Create a safer conversation", description: "Together, we slow the cycle down so each person can speak clearly, listen differently, and feel understood." },
      { number: "03", title: "Practice a new rhythm", description: "You leave with concrete ways to repair, set boundaries, and stay connected beyond the session." },
    ],
    outcomesHeading: "What families build",
    outcomes: [
      { title: "Clearer communication", description: "Say what matters without escalating the moment." },
      { title: "More resilient connection", description: "Stay close while making space for difference and growth." },
      { title: "Practical repair", description: "Move from repeating conflict to creating new responses." },
    ],
    ctaHeading: "A different family rhythm can start here.",
    ctaSubtext: "Book an initial family session and take the first step toward more clarity, steadiness, and connection.",
    ctaButton: "Book a family session",
  },
  no: {
    title: "Familieterapi",
    intro: "Familiearbeid skaper en stødigere måte å være sammen på — med rom for ærlige samtaler, tydeligere grenser og en tilknytning som tåler endring.",
    panels: [
      { title: "For familien dere er", description: "Enten dere går gjennom konflikt, en overgang, sorg eller et nytt kapittel, begynner vi med mønstrene familien faktisk lever med." },
      { title: "Et felles rom for en ny start", description: "Alle får plass til å bli hørt uten å bli satt på tiltalebenken. Arbeidet er praktisk, relasjonelt og rettet mot det som skjer mellom dere." },
    ],
    processHeading: "Slik foregår arbeidet",
    process: [
      { number: "01", title: "Forstå mønsteret", description: "Vi ser på de tilbakevendende øyeblikkene der kommunikasjonen bryter sammen, roller låser seg eller avstanden vokser." },
      { number: "02", title: "Skap en tryggere samtale", description: "Sammen bremser vi syklusen slik at hver person kan snakke tydelig, lytte annerledes og føle seg forstått." },
      { number: "03", title: "Øv på en ny rytme", description: "Dere går videre med konkrete måter å reparere, sette grenser og holde kontakten utenfor sesjonen." },
    ],
    outcomesHeading: "Det familier bygger",
    outcomes: [
      { title: "Tydeligere kommunikasjon", description: "Si det som betyr noe uten å eskalere øyeblikket." },
      { title: "Mer robust tilknytning", description: "Hold sammen og gi samtidig rom for forskjeller og utvikling." },
      { title: "Praktisk reparasjon", description: "Gå fra gjentatt konflikt til nye måter å møte hverandre på." },
    ],
    ctaHeading: "En annen familierytme kan begynne her.",
    ctaSubtext: "Bestill en innledende familiesesjon og ta første steg mot mer klarhet, stødighet og tilknytning.",
    ctaButton: "Bestill familiesesjon",
  },
  pl: {
    title: "Sesja Rodzinna",
    intro: "Praca z rodziną tworzy stabilniejszy sposób bycia razem — z miejscem na szczere rozmowy, jaśniejsze granice i więź, która może trwać mimo zmian.",
    panels: [
      { title: "Dla rodziny, którą jesteście", description: "Niezależnie od tego, czy przechodzicie przez konflikt, zmianę, żałobę czy nowy rozdział, zaczynamy od wzorców, w których rodzina naprawdę żyje." },
      { title: "Wspólna przestrzeń na nowy początek", description: "Każdy ma miejsce, by zostać usłyszanym bez stawiania go pod sądem. Praca jest praktyczna, relacyjna i skupiona na tym, co dzieje się między wami." },
    ],
    processHeading: "Jak przebiega praca",
    process: [
      { number: "01", title: "Zrozumieć wzorzec", description: "Przyglądamy się chwilom, w których komunikacja się załamuje, role się utrwalają, a dystans zaczyna rosnąć." },
      { number: "02", title: "Stworzyć bezpieczniejszą rozmowę", description: "Wspólnie zwalniamy ten cykl, aby każda osoba mogła mówić jasno, inaczej słuchać i czuć się rozumiana." },
      { number: "03", title: "Ćwiczyć nowy rytm", description: "Wychodzicie z konkretnymi sposobami naprawy, stawiania granic i pozostawania w kontakcie poza sesją." },
    ],
    outcomesHeading: "Co budują rodziny",
    outcomes: [
      { title: "Jaśniejsza komunikacja", description: "Mówić o tym, co ważne, bez eskalowania chwili." },
      { title: "Silniejsza więź", description: "Pozostać blisko, robiąc miejsce na różnice i rozwój." },
      { title: "Praktyczna naprawa", description: "Przejść od powtarzalnego konfliktu do nowych reakcji." },
    ],
    ctaHeading: "Inny rodzinny rytm może zacząć się tutaj.",
    ctaSubtext: "Zarezerwuj pierwszą sesję rodzinną i zrób pierwszy krok ku większej jasności, stabilności i więzi.",
    ctaButton: "Zarezerwuj sesję rodzinną",
  },
};

export default function FamilySupportPage() {
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
  const t = content[language];

  return (
    <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav language={language} onLanguageChange={handleLanguageChange} isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} isLangOpen={isLangOpen} onLangOpenChange={setIsLangOpen} />
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">{t.title}</h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">{t.intro}</p>
        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {t.panels.map((panel, index) => <div key={panel.title} className={`rounded-2xl border border-zinc-300/80 p-8 sm:p-10 ${index < 2 ? "bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20" : ""}`}><h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium">{panel.title}</h2><p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">{panel.description}</p></div>)}
        </div>
        <div className="mt-24"><h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">{t.processHeading}</h2><div className="mt-12 flex flex-col">{t.process.map((step) => <div key={step.number} className="flex flex-col gap-4 border-t border-zinc-300/80 py-10 sm:flex-row sm:items-start sm:gap-12"><span className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium text-[#74382f] sm:w-20 sm:shrink-0">{step.number}</span><div><h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium sm:text-3xl">{step.title}</h3><p className="mt-4 max-w-3xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">{step.description}</p></div></div>)}</div></div>
        <div className="mt-24"><h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">{t.outcomesHeading}</h2><div className="mt-12 grid gap-6 sm:grid-cols-3">{t.outcomes.map((outcome) => <div key={outcome.title} className="rounded-2xl border border-zinc-300/80 p-8"><h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-xl font-medium">{outcome.title}</h3><p className="mt-4 font-[Roboto,Arial,sans-serif] text-[17px] leading-[1.5] text-[#383838]">{outcome.description}</p></div>)}</div></div>
        <div className="mt-24 flex flex-col items-start gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/75 to-[#eee2db]/40 p-10 sm:p-14"><h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">{t.ctaHeading}</h2><p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">{t.ctaSubtext}</p><button onClick={() => setIsBookingOpen(true)} className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100">{t.ctaButton}</button></div>
      </section>
      <SiteFooter language={language} />
      <BookingModal language={language} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
