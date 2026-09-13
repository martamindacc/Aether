"use client";

import { useState } from "react";
import Link from "next/link";
import { BookingModal } from "@/components/booking-modal";

const copy: Record<
  "en" | "no" | "pl",
  { heading: string; body: string; learnMore: string; bookNow: string }
> = {
  en: {
    heading: "Ready to talk it through?",
    body: "If this resonates, Aether Practice offers dedicated sessions built around exactly this.",
    learnMore: "Learn more",
    bookNow: "Book Now",
  },
  no: {
    heading: "Klar for å snakke om det?",
    body: "Hvis dette kjenner deg igjen, tilbyr Aether Practice sesjoner bygget nettopp rundt dette.",
    learnMore: "Les mer",
    bookNow: "Bestill Nå",
  },
  pl: {
    heading: "Gotowi, aby o tym porozmawiać?",
    body: "Jeśli się w tym rozpoznacie, Aether Practice oferuje sesje dedykowane dokładnie na ten temat.",
    learnMore: "Dowiedz się więcej",
    bookNow: "Umów się teraz",
  },
};

export function BlogCta({
  relatedService,
  language = "en",
}: {
  relatedService: string;
  language?: "en" | "no" | "pl";
}) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const t = copy[language];

  return (
    <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/75 to-[#eee2db]/40 p-10 sm:p-14">
      <h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
        {t.heading}
      </h2>
      <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
        {t.body}
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href={relatedService}
          className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
        >
          {t.learnMore}
        </Link>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="border border-zinc-900/20 bg-zinc-900 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-zinc-800"
        >
          {t.bookNow}
        </button>
      </div>
      <BookingModal language={language} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
