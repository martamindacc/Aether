"use client";

import { useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import type { LanguageCode } from "@/lib/service-content";
import type { LanguageLink } from "@/lib/locale-routes";

/**
 * Page chrome for the blog. The language is fixed by the URL; the language
 * menu links to the same content in the other language (the other blog
 * index, or a post's genuine translations).
 */
export function BlogShell({
  children,
  language,
  languageLinks,
}: {
  children: React.ReactNode;
  language: LanguageCode;
  languageLinks: LanguageLink[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F3EBE4] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <FloatingNav
        language={language}
        languageLinks={languageLinks}
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
