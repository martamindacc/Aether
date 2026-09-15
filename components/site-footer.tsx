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
    <footer className="px-6 py-[99px] font-[Roboto,Arial,sans-serif] text-sm text-[#383838]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-12 md:items-start">
        <div className="order-1 col-span-2 flex flex-col items-center gap-4 text-center md:order-2 md:col-span-1 md:justify-self-center">
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
        <nav
          aria-label={t.menuHeading}
          className="order-2 flex flex-col gap-3 md:order-1 md:col-span-1 md:justify-self-start"
        >
            <p className="text-xs uppercase tracking-wide text-zinc-500">{t.menuHeading}</p>
            {t.menuLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-zinc-700 hover:text-zinc-900">
                {link.label}
              </Link>
            ))}
        </nav>
        <nav
          aria-label={t.companyHeading}
          className="order-3 flex flex-col gap-3 justify-self-end md:col-span-1 md:justify-self-end"
        >
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
    </footer>
  );
}
