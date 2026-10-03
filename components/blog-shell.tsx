"use client";

import { useEffect, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import type { LanguageCode } from "@/lib/service-content";
import { createContext, useContext } from "react";

const SiteLanguageContext = createContext<LanguageCode>("en");

export function useSiteLanguage() {
  return useContext(SiteLanguageContext);
}

export function BlogShell({
  children,
  language: initialLanguage = "en",
  articleLanguages,
}: {
  children: React.ReactNode;
  language?: LanguageCode;
  /**
   * Restricts the language switcher to genuine translations of the current
   * article and navigates to them, instead of the site-wide language
   * toggle. Omit on the blog index (and everywhere else) to keep that
   * default toggle behavior.
   */
  articleLanguages?: { code: LanguageCode; href: string }[];
}) {
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    // Article pages are locked to the article's own language (only its real
    // translations, via articleLanguages, may switch it) — never fall back
    // to a site-wide language stored from browsing other pages, or the nav
    // language ends up out of sync with the static article content.
    if (articleLanguages) {
      setLanguage(initialLanguage);
      return;
    }
    if (initialLanguage === "no") {
      setLanguage("no");
      localStorage.setItem("site-language", "no");
      return;
    }
    const stored = localStorage.getItem("site-language") as LanguageCode | null;
    if (stored) setLanguage(stored);
  }, [initialLanguage, articleLanguages]);

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem("site-language", lang);
  };
  const displayedLanguage = articleLanguages ? initialLanguage : language;

  return (
    <SiteLanguageContext.Provider value={displayedLanguage}>
      <main className="min-h-screen bg-[#F3EBE4] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav
        language={displayedLanguage}
        onLanguageChange={handleLanguageChange}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isLangOpen={isLangOpen}
        onLangOpenChange={setIsLangOpen}
        articleLanguages={articleLanguages}
      />
      {children}
      <SiteFooter language={displayedLanguage} />
      </main>
    </SiteLanguageContext.Provider>
  );
}
