import Link from "next/link";
import { navContent, type LanguageCode } from "@/lib/service-content";

const taglines: Record<LanguageCode, string> = {
  en: "All rights reserved.",
  no: "Alle rettigheter reservert.",
  pl: "Wszelkie prawa zastrzeżone.",
};

const privacyLabel: Record<LanguageCode, string> = {
  en: "Privacy Policy",
  no: "Personvern",
  pl: "Polityka Prywatności",
};

export function SiteFooter({ language }: { language: LanguageCode }) {
  const t = navContent[language];

  return (
    <footer className="border-t border-zinc-300/80 px-6 py-16 font-[Roboto,Arial,sans-serif] text-sm text-[#383838]">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-medium tracking-tight text-zinc-900"
          >
            <img src="/logo-a.svg" alt="Aether Practice logo" className="h-5 w-5" />
            Aether Practice
          </Link>
          <p>
            © {new Date().getFullYear()} Aether Practice. {taglines[language]}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
          <nav aria-label={t.menuHeading} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">{t.menuHeading}</p>
            {t.menuLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-zinc-700 hover:text-zinc-900">
                {link.label}
              </Link>
            ))}
          </nav>
          <nav aria-label={t.companyHeading} className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">{t.companyHeading}</p>
            {t.companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-zinc-700 hover:text-zinc-900">
                {link.label}
              </Link>
            ))}
            <Link href="/privacy" className="text-zinc-700 hover:text-zinc-900">
              {privacyLabel[language]}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
