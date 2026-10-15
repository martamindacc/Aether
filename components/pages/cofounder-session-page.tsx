"use client";

import { useState } from "react";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import { navContent, relatedServicesHeading } from "@/lib/service-content";
import type { LanguageLink } from "@/lib/locale-routes";

/** The English path this page lives at; also used to hide itself from the related-service chips. */
export const COFOUNDER_PATH = "/co-founder-therapy";

/**
 * English only, so it stays out of localizedPaths rather than forcing a
 * Norwegian route and an hreflang pair that does not exist yet. The language
 * menu sends Norwegian readers to the nearest equivalent, the leadership page.
 */
const languageLinks: LanguageLink[] = [
  { code: "en", href: COFOUNDER_PATH },
  { code: "no", href: "/no/ledere-og-grundere" },
];

const t = {
  title: "Co-Founder Session",
  subtitle: "Online sessions for co-founders in New York City, California, and Norway.",
  intro:
    "The founding relationship is the one nobody schedules time for. A co-founder session makes room to work on how the two of you decide, disagree, and divide the weight — before the company starts routing around it.",
  panels: [
    {
      title: "For the partnership, not the product",
      description:
        "Equity, titles and roadmaps are usually where it surfaces. The work starts somewhere else: how the two of you actually talk when the stakes are high and the information is incomplete.",
    },
    {
      title: "A room with no cap table in it",
      description:
        "Neutral ground, outside the standup and the board meeting, where either of you can say the thing that has been sitting unsaid for two quarters.",
    },
  ],
  processHeading: "How the work unfolds",
  process: [
    {
      number: "01",
      title: "Name the pattern",
      description:
        "We map the conversations that keep stalling — the decisions that get reopened, the resentment that arrives disguised as process, the subject you both steer around.",
    },
    {
      number: "02",
      title: "Slow the disagreement down",
      description:
        "Together we look for a way to hold a position without it costing the relationship, and to concede without quietly keeping score.",
    },
    {
      number: "03",
      title: "Agree how you will decide",
      description:
        "You leave with explicit terms for the next hard call: who owns it, what disagreement is allowed to look like, and how the two of you repair afterwards.",
    },
  ],
  outcomesHeading: "What co-founders work toward",
  outcomes: [
    {
      title: "Decisions that stay decided",
      description: "Fewer calls reopened a month later with the same two arguments.",
    },
    {
      title: "Disagreement without damage",
      description: "Argue hard about the work without spending the relationship to do it.",
    },
    {
      title: "Terms said out loud",
      description: "Put words to what the two of you have so far only assumed about each other.",
    },
  ],
  ctaHeading: "The founding relationship deserves the attention the company gets.",
  ctaSubtext:
    "Book an initial co-founder session and start with the conversation you have both been postponing.",
  ctaButton: "Book a co-founder session",
};

export default function CofounderSessionPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF8F5] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav
        language="en"
        languageLinks={languageLinks}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isLangOpen={isLangOpen}
        onLangOpenChange={setIsLangOpen}
      />
      <section id="main-content" className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
          {t.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.5] text-zinc-700">{t.subtitle}</p>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          {t.intro}
        </p>

        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {t.panels.map((panel) => (
            <div
              key={panel.title}
              className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#EEE5DB]/40 to-[#EEE5DB]/20 p-8 sm:p-10"
            >
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

        <div className="mt-24 flex flex-col items-start gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#EEE5DB]/75 to-[#EEE5DB]/40 p-10 sm:p-14">
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
            {relatedServicesHeading.en}
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {navContent.en.menuLinks
              .filter((link) => link.href !== COFOUNDER_PATH)
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
      <SiteFooter language="en" />
      <BookingModal language="en" isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </main>
  );
}
