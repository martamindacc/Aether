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

export function BlogShell({ children, language: initialLanguage = "en" }: { children: React.ReactNode; language?: LanguageCode }) {
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    if (initialLanguage === "no") {
      setLanguage("no");
      localStorage.setItem("site-language", "no");
      return;
    }
    const stored = localStorage.getItem("site-language") as LanguageCode | null;
    if (stored) setLanguage(stored);
  }, [initialLanguage]);

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem("site-language", lang);
  };

  return (
    <SiteLanguageContext.Provider value={language}>
      <main className="min-h-screen bg-[#fafafb] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav
        language={language}
        onLanguageChange={handleLanguageChange}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isLangOpen={isLangOpen}
        onLangOpenChange={setIsLangOpen}
      />
      {children}
      <SiteFooter language={language} />
      </main>
    </SiteLanguageContext.Provider>
  );
}
