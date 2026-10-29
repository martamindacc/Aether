"use client";

import { useState } from "react";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import { ServiceFaq } from "@/components/service-faq";
import { serviceFaq } from "@/lib/service-faq";
import { navContent, relatedServicesHeading } from "@/lib/service-content";
import type { LanguageLink } from "@/lib/locale-routes";

/** The English path this page lives at; also used to hide itself from the related-service chips. */
export const COFOUNDER_PATH = "/co-founder-coaching";

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
  subtitle: "Online sessions for co-founders in the San Francisco Bay Area, New York City, and Norway.",
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
  naming:
    "Sometimes called co-founder therapy, this is coaching for founding partners — both of you in the room, working on the relationship the company depends on.",
  ctaHeading: "The founding relationship deserves the attention the company gets.",
  ctaSubtext:
    "Book an initial co-founder session and start with the conversation you have both been postponing.",
  ctaButton: "Book a co-founder session",
  guidesHeading: "Guides for founding teams",
  guidesIntro:
    "What we have written about the founding partnership — start with the complete guide, or go straight to the situation you are in.",
  testimonialsEyebrow: "Client Stories",
  testimonialsHeading: "What founding teams say",
};

/** Real client quotes, trimmed to their strongest lines; nothing added. */
const testimonials: { quote: string; name: string; context: string }[] = [
  {
    quote:
      "The sessions helped us step back from a difficult co-founder dynamic and approach the situation more objectively. Rather than going in circles, we left with a clearer understanding of the problem and a practical plan for moving forward.",
    name: "G.W. & P.T.",
    context: "Co-founders",
  },
  {
    quote:
      "As a CEO, I constantly balance strategy, speed, and team dynamics. The insights I got gave me an internal edge — sharpening how I make decisions and how I lead. It helped me catch blind spots that would've quietly affected my team.",
    name: "R.S.",
    context: "CEO",
  },
  {
    quote:
      "Before, I used to feel overwhelmed — now I navigate challenges with clarity and confidence. It's clear how much faster I've been able to grow, personally and professionally, because of this process.",
    name: "T.K.",
    context: "Co-founder",
  },
];

/** The co-founder cluster on the blog, in reading order. The pillar first, then the situations, then the how-to-choose pieces. */
const guides: { title: string; description: string; href: string }[] = [
  {
    title: "Co-founder conflict: the complete guide",
    description: "The six patterns behind most founding-team breakdowns, and what actually repairs a partnership.",
    href: "/blog/co-founder-conflict-guide",
  },
  {
    title: "Twelve warning signs your co-founder relationship is in trouble",
    description: "The observable symptoms, ranked from ordinary to serious, with what each one means and what to do.",
    href: "/blog/co-founder-relationship-warning-signs",
  },
  {
    title: "The 50/50 deadlock",
    description: "Why an even split with no tiebreaker stalls a company, and four ways to break it without touching the cap table.",
    href: "/blog/co-founder-5050-deadlock",
  },
  {
    title: "When one co-founder stops pulling their weight",
    description: "Burnout, mismatch, disengagement or quiet departure: how to tell them apart and raise it before resentment decides for you.",
    href: "/blog/co-founder-not-pulling-weight",
  },
  {
    title: "Renegotiating co-founder equity",
    description: "How to reopen a split that no longer matches reality, framed as correcting a forecast rather than settling a score.",
    href: "/blog/renegotiating-co-founder-equity",
  },
  {
    title: "Co-founder breakup: separating without killing the company",
    description: "How to tell a finished partnership from a long bad stretch, and the sequence that protects the company if it is over.",
    href: "/blog/co-founder-breakup-exit",
  },
  {
    title: "Mediation, coaching or a lawyer: what each one fixes",
    description: "What each specialist changes, what each costs, and how to tell which one your founding team needs.",
    href: "/blog/co-founder-mediation-vs-coaching",
  },
  {
    title: "Co-founder coaching in San Francisco and New York",
    description: "What it is, how it differs from co-founder therapy and executive coaching, what it costs, and how to choose.",
    href: "/blog/co-founder-coaching-san-francisco-new-york",
  },
  {
    title: "The co-founder agreement you never wrote",
    description: "Thirty questions to settle with your co-founder before the company tests them.",
    href: "/blog/co-founder-agreement-questions",
  },
  {
    title: "Co-founder conflict glossary",
    description: "Twenty-five terms founding teams use for conflict and its repair, defined in a sentence or two each.",
    href: "/blog/co-founder-glossary",
  },
  {
    title: "Co-founder couples: when your business partner is your spouse",
    description: "For married co-founders, where the business conversation and the intimate one have to be held apart.",
    href: "/blog/co-founder-couples-married",
  },
];

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
        {/*
          People search "co-founder therapy", so the phrase appears once, as a
          thing other people say. The service is coaching and the page never
          claims otherwise.
        */}
        <p className="mt-8 max-w-4xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
          {t.naming}
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

        <div className="mt-24 flex w-full flex-col items-center gap-4">
          <p className="text-sm uppercase tracking-wide text-zinc-500">{t.testimonialsEyebrow}</p>
          <h2 className="max-w-3xl text-balance text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium tracking-tight text-zinc-900 sm:text-6xl">
            {t.testimonialsHeading}
          </h2>
        </div>
        <div className="mt-16 grid w-full gap-6 sm:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-8 rounded-2xl border border-zinc-300/80 bg-[#F7F1EB] p-8 sm:p-10"
            >
              <span aria-hidden="true" className="-mb-3 flex justify-center gap-2">
                <span className="h-7 w-3 bg-[#BFA17F] [clip-path:polygon(0_0,100%_0,80%_100%,20%_100%)]" />
                <span className="h-7 w-3 bg-[#BFA17F] [clip-path:polygon(0_0,100%_0,80%_100%,20%_100%)]" />
              </span>
              <p className="flex-1 text-balance text-center font-[Roboto,Arial,sans-serif] text-lg leading-[1.6] text-[#383838]">
                {item.quote}
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a6347]">
                  {item.name} &middot; {item.context}
                </span>
              </div>
            </div>
          ))}
        </div>

        <ServiceFaq items={serviceFaq("cofounder", "en")} language={"en"} />

        <div className="mt-24 flex flex-col items-start gap-8 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#EEE5DB]/75 to-[#EEE5DB]/40 p-10 sm:p-14">
          <h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
            {t.ctaHeading}
          </h2>
          <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            {t.ctaSubtext}
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-zinc-900 px-10 py-5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            {t.ctaButton}
          </button>
        </div>

        <div className="mt-24">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            {t.guidesHeading}
          </h2>
          <p className="mt-6 max-w-3xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            {t.guidesIntro}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#EEE5DB]/40 to-[#EEE5DB]/20 p-8 transition-colors hover:from-[#EEE5DB]/60 hover:to-[#EEE5DB]/30"
              >
                <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-xl font-medium leading-[1.25] tracking-tight text-zinc-900 transition-transform duration-300 ease-out group-hover:translate-x-2">
                  {guide.title}
                </h3>
                <p className="mt-4 font-[Roboto,Arial,sans-serif] text-[15px] leading-[1.5] text-[#383838]">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
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
