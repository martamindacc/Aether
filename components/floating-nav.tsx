"use client";

import Link from "next/link";
import { useState } from "react";

const languages = ["EN", "NO", "PL"] as const;

const menuLinks = [
  { label: "Individual Therapy", href: "/individual-therapy" },
  { label: "Couples Therapy", href: "/couples-therapy" },
  { label: "Executive & Founder Work", href: "/executive-founder-work" },
];

export function FloatingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [language, setLanguage] = useState<(typeof languages)[number]>("EN");

  return (
    <>
      <nav className="fixed inset-x-4 top-4 z-20 flex items-center justify-between rounded-[1.5rem] border border-white/50 bg-white/50 px-4 py-3 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:inset-x-6 sm:top-6 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-medium tracking-[-0.04em] sm:text-xl"
        >
          <img src="/logo-a.svg" alt="Aether Practice logo" className="h-6 w-6" />
          Aether Practice
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="border border-zinc-900/20 bg-white px-[30px] py-3 text-sm transition-colors hover:bg-zinc-100"
          >
            Book Now
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsLangOpen((open) => !open)}
              aria-label="Select language"
              aria-expanded={isLangOpen}
              className="flex items-center gap-2 px-2 py-3 text-sm text-zinc-900"
            >
              {language}
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
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className="px-3 py-2 text-center text-sm text-zinc-900 transition-colors hover:bg-zinc-100"
                  >
                    {lang}
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M1 1L15 15M15 1L1 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="flex flex-col gap-6">
              <p className="text-sm uppercase tracking-wide text-zinc-500">Services</p>
              <div className="flex flex-col gap-6">
                {menuLinks.map((link) => (
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
          </div>
        </div>
      )}
    </>
  );
}
