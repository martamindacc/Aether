"use client";

import { useState } from "react";
import Link from "next/link";
import { BookingModal } from "@/components/booking-modal";

export function BlogCta({ relatedService }: { relatedService: string }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/75 to-[#eee2db]/40 p-10 sm:p-14">
      <h2 className="max-w-2xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
        Ready to talk it through?
      </h2>
      <p className="max-w-2xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
        If this resonates, Aether Practice offers dedicated sessions built around exactly this.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href={relatedService}
          className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
        >
          Learn more
        </Link>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="border border-zinc-900/20 bg-zinc-900 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Book Now
        </button>
      </div>
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
