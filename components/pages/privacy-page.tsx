"use client";

import { useState } from "react";
import { languageLinksFor, localizedPaths } from "@/lib/locale-routes";
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
    cookiesHeading: string;
    cookiesIntro: string;
    cookiesTopics: { heading: string; text: string }[];
    cookiesContact: string;
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
    cookiesHeading: "Cookies and tracking",
    cookiesIntro:
      "This section explains how cookies and similar technologies are used on this website, and how you can control them.",
    cookiesTopics: [
      {
        heading: "Essential cookies",
        text: "We use a small number of essential cookies so the site can function correctly, including a cookie that stores your consent preferences so we don't ask again on every visit.",
      },
      {
        heading: "Analytics",
        text: "We use Vercel Analytics to understand aggregate website usage, such as which pages are visited. This helps us improve the site.",
      },
      {
        heading: "Future advertising tools",
        text: "The site may in the future use additional tools such as Google Analytics (GA4), Meta Pixel, TikTok Pixel, or similar advertising technologies. These would only be activated after you give optional consent.",
      },
      {
        heading: "Consent by default",
        text: "Analytics and marketing tracking are disabled by default. They are only enabled if you choose to accept them through the cookie banner or the Cookie Settings preferences.",
      },
      {
        heading: "Your choices",
        text: "You can reject optional tracking at any time, or change your preferences later, using the Cookie Settings link available on the site.",
      },
      {
        heading: "Third-party booking services",
        text: "The booking flow on this site may use third-party services such as Calendly and Stripe to schedule sessions and process payments.",
      },
      {
        heading: "Please avoid sensitive details",
        text: "Please do not submit sensitive health or therapy details through analytics tools, contact forms, or any tracking-related fields on this site.",
      },
      {
        heading: "Questions about privacy",
        text: "If you have questions about privacy or cookies, you can contact Aether Practice using the details on our contact page.",
      },
    ],
    cookiesContact: "Contact us",
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
    cookiesHeading: "Informasjonskapsler og sporing",
    cookiesIntro:
      "Denne delen forklarer hvordan informasjonskapsler og lignende teknologier brukes på dette nettstedet, og hvordan du kan kontrollere dem.",
    cookiesTopics: [
      {
        heading: "Nødvendige informasjonskapsler",
        text: "Vi bruker et lite antall nødvendige informasjonskapsler for at nettstedet skal fungere riktig, inkludert en informasjonskapsel som lagrer dine samtykkevalg slik at vi ikke spør på nytt ved hvert besøk.",
      },
      {
        heading: "Analyse",
        text: "Vi bruker Vercel Analytics for å forstå samlet bruk av nettstedet, som hvilke sider som besøkes. Dette hjelper oss å forbedre siden.",
      },
      {
        heading: "Fremtidige annonseverktøy",
        text: "Nettstedet kan i fremtiden bruke ytterligere verktøy som Google Analytics (GA4), Meta Pixel, TikTok Pixel eller lignende annonseteknologier. Disse vil kun aktiveres etter at du har gitt frivillig samtykke.",
      },
      {
        heading: "Samtykke som standard",
        text: "Analyse- og markedsføringssporing er deaktivert som standard. De aktiveres kun hvis du velger å godta dem via informasjonskapsel-banneret eller innstillingene under Cookie Settings.",
      },
      {
        heading: "Dine valg",
        text: "Du kan avvise frivillig sporing når som helst, eller endre valgene dine senere, via lenken Cookie Settings som er tilgjengelig på nettstedet.",
      },
      {
        heading: "Tredjeparts bookingtjenester",
        text: "Bookingflyten på dette nettstedet kan bruke tredjepartstjenester som Calendly og Stripe for å planlegge sesjoner og behandle betalinger.",
      },
      {
        heading: "Vennligst unngå sensitive detaljer",
        text: "Vennligst unngå å sende sensitive detaljer om helse eller terapi gjennom analyseverktøy, kontaktformularer eller andre sporingsrelaterte felt på dette nettstedet.",
      },
      {
        heading: "Spørsmål om personvern",
        text: "Hvis du har spørsmål om personvern eller informasjonskapsler, kan du kontakte Aether Practice via detaljene på vår kontaktside.",
      },
    ],
    cookiesContact: "Kontakt oss",
  },
};

const languageLinks = languageLinksFor("privacy");

export default function PrivacyPage({ language }: { language: LanguageCode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = privacyContent[language];

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

        <div id="cookies" className="mt-20 scroll-mt-32">
          <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
            {t.cookiesHeading}
          </h2>
          <p className="mt-6 max-w-4xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
            {t.cookiesIntro}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {t.cookiesTopics.map((topic) => (
              <div
                key={topic.heading}
                className="rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 sm:p-10"
              >
                <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium">
                  {topic.heading}
                </h3>
                <p className="mt-4 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
                  {topic.text}
                </p>
              </div>
            ))}
          </div>
          <a
            href={localizedPaths.contact[language]}
            className="mt-10 inline-block font-[Roboto,Arial,sans-serif] text-[19px] font-medium text-[#74382f] underline underline-offset-4 transition-colors hover:text-[#5a2c25]"
          >
            {t.cookiesContact}
          </a>
        </div>
      </section>
      <SiteFooter language={language} />
    </main>
  );
}
