"use client";

import { useEffect, useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { contactContent, type LanguageCode } from "@/lib/service-content";

export default function ContactPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = contactContent[language];

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
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
          {t.title}
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          {t.intro}
        </p>

        <form
          action="mailto:martamindacc@gmail.com"
          method="post"
          encType="text/plain"
          className="mt-20 flex max-w-3xl flex-col gap-6 rounded-2xl border border-zinc-300/80 bg-[#eee2db]/80 p-10 sm:p-14"
        >
          <label className="flex flex-col gap-2 font-[Roboto,Arial,sans-serif] text-base text-zinc-900">
            Name
            <input name="name" required className="border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-zinc-900" />
          </label>
          <label className="flex flex-col gap-2 font-[Roboto,Arial,sans-serif] text-base text-zinc-900">
            Email
            <input type="email" name="email" required className="border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-zinc-900" />
          </label>
          <label className="flex flex-col gap-2 font-[Roboto,Arial,sans-serif] text-base text-zinc-900">
            Message
            <textarea name="message" required rows={6} className="resize-y border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-zinc-900" />
          </label>
          <button type="submit" className="self-start border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100">
            Send message
          </button>
        </form>
      </section>
      <SiteFooter language={language} />
    </main>
  );
}
