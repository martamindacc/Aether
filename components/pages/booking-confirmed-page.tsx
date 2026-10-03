"use client";

import { useEffect, useRef, useState } from "react";
import { homePath, languageLinksFor } from "@/lib/locale-routes";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { sendGAEvent } from "@/components/google-analytics";
import type { LanguageCode } from "@/lib/service-content";

const confirmationContent: Record<LanguageCode, { title: string; message: string; cta: string }> = {
  en: {
    title: "Your appointment is booked",
    message: "Your session was successfully booked. We look forward to seeing you.",
    cta: "Back to home",
  },
  no: {
    title: "Avtalen din er booket",
    message: "Sesjonen din er booket. Vi ser frem til å møte deg.",
    cta: "Tilbake til hjemmesiden",
  },
};

const languageLinks = languageLinksFor("bookingConfirmed");

export default function BookingConfirmedPage({ language }: { language: LanguageCode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const hasTrackedRef = useRef(false);
  const t = confirmationContent[language];

  useEffect(() => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;
    const params = { page: window.location.pathname };
    track("booking_completed", params);
    sendGAEvent("booking_completed", params);
  }, []);

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
          {t.message}
        </p>
        <Link
          href={homePath(language)}
          className="mt-10 inline-block self-start border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
        >
          {t.cta}
        </Link>
      </section>
      <SiteFooter language={language} />
    </main>
  );
}
