"use client";

import { useEffect, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import type { LanguageCode } from "@/lib/service-content";

export function BlogShell({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("site-language") as LanguageCode | null;
    if (stored) setLanguage(stored);
  }, []);

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem("site-language", lang);
  };

  return (
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
  );
}
