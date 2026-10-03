"use client";

import { useEffect, useRef, useState } from "react";
import { menuKeyHandler, useDialog } from "@/lib/use-dialog";
import Link from "next/link";
import { languages, navContent, type LanguageCode } from "@/lib/service-content";
import { homePath, type LanguageLink } from "@/lib/locale-routes";
import { BookingModal } from "@/components/booking-modal";

export function FloatingNav({
  language,
  languageLinks,
  isMenuOpen,
  onMenuOpenChange,
  isLangOpen,
  onLangOpenChange,
}: {
  /** Language of the current page, decided by its URL. */
  language: LanguageCode;
  /** Where each language option navigates: the same page in that language, or its closest equivalent. */
  languageLinks: LanguageLink[];
  isMenuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  isLangOpen: boolean;
  onLangOpenChange: (open: boolean) => void;
}) {
  const t = navContent[language];
  const currentLabel = languages.find((lang) => lang.code === language)?.label ?? "EN";
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => onMenuOpenChange(false);
  useDialog(isMenuOpen, closeMenu, menuPanelRef);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        onLangOpenChange(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [onLangOpenChange]);

  return (
    <>
      <nav className="fixed inset-x-4 top-4 z-20 flex items-center justify-between rounded-[1.5rem] border border-white/50 bg-white/50 px-2.5 py-2.5 shadow-lg shadow-zinc-900/5 backdrop-blur-xl sm:inset-x-6 sm:top-6 sm:px-6 sm:py-3">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex w-14 flex-col items-center justify-center whitespace-normal border border-zinc-900/20 bg-white/30 px-1 py-1.5 text-center text-[11px] leading-tight transition-colors hover:bg-white/65 sm:hidden"
        >
          {t.bookNow}
        </button>
        <Link
          href={homePath(language)}
          className="hidden items-center gap-2 text-lg font-medium tracking-[-0.04em] sm:flex sm:text-xl"
        >
          <img src="/logo-a.svg" alt="" width={24} height={24} className="h-6 w-6" />
          Aether Practice
        </Link>
        <Link
          href={homePath(language)}
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-2 sm:hidden"
        >
          <img src="/logo-a.svg" alt="" width={20} height={20} className="h-5 w-5 shrink-0" />
          <span className="truncate text-sm font-medium tracking-[-0.04em]">Aether Practice</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="hidden border border-zinc-900/20 bg-white/30 px-[30px] py-3 text-sm transition-colors hover:bg-white/65 sm:inline-block"
          >
            {t.bookNow}
          </button>
          <div ref={languageMenuRef} className="relative" onKeyDown={menuKeyHandler(() => onLangOpenChange(false))}>
            <button
              onClick={() => onLangOpenChange(!isLangOpen)}
              aria-label={`Language: ${currentLabel}`}
              aria-haspopup="menu"
              aria-expanded={isLangOpen}
              className="flex items-center gap-1 whitespace-nowrap px-1.5 py-3 text-sm text-zinc-900 sm:gap-2 sm:px-2"
            >
              {currentLabel}
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
              <div role="menu" className="absolute right-0 top-full mt-2 flex w-12 flex-col rounded-xl border border-zinc-900/10 bg-white py-1 shadow-lg">
                {languageLinks.map((option) => (
                  <Link
                    key={option.code}
                    href={option.href}
                    onClick={() => onLangOpenChange(false)}
                    className="px-3 py-2 text-center text-sm text-zinc-900 transition-colors hover:bg-zinc-100"
                  >
                    {languages.find((lang) => lang.code === option.code)?.label ?? option.code.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => onMenuOpenChange(true)}
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

      {/* Menu links are in the HTML even while the panel is closed, so crawlers can follow them; the panel below is the interactive copy. */}
      <nav hidden aria-hidden="true">
        {[...t.menuLinks, ...t.companyLinks].map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-30 flex justify-end">
          <div
            className="absolute inset-0 animate-in fade-in bg-zinc-900/20 duration-300"
            onClick={() => onMenuOpenChange(false)}
            aria-hidden="true"
          />
          <div
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.menuHeading}
            tabIndex={-1}
            className="relative flex h-full w-full max-w-md flex-col gap-12 overflow-y-auto bg-[#fafafb] px-8 py-24 shadow-2xl outline-none animate-in slide-in-from-right duration-300 ease-out sm:px-12"
          >
            <button
              onClick={() => onMenuOpenChange(false)}
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
              <p className="text-sm uppercase tracking-wide text-zinc-500">{t.menuHeading}</p>
              <div className="flex flex-col gap-6">
                {t.menuLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => onMenuOpenChange(false)}
                    className="inline-block origin-left font-[Roboto,Arial,sans-serif] text-3xl font-medium tracking-tight text-zinc-900 transition-transform duration-300 ease-out hover:translate-x-2 hover:scale-x-105"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-sm uppercase tracking-wide text-zinc-500">{t.companyHeading}</p>
              <div className="flex flex-col gap-6">
                {t.companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => onMenuOpenChange(false)}
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

      <BookingModal language={language} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
