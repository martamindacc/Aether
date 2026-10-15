import Link from "next/link";
import { navContent, type LanguageCode } from "@/lib/service-content";
import { homePath, localizedPaths } from "@/lib/locale-routes";

const taglines: Record<LanguageCode, string> = {
  en: "All rights reserved.",
  no: "Alle rettigheter reservert.",
};

const privacyLabel: Record<LanguageCode, string> = {
  en: "Privacy Policy",
  no: "Personvern",
};

export function SiteFooter({
  language,
  tone = "light",
}: {
  language: LanguageCode;
  /**
   * "dark" is for sections that paint their own dark background (Instruments).
   * The footer stays transparent either way and only recolours its own type, so
   * it sits on whatever the section behind it is painted with.
   */
  tone?: "light" | "dark";
}) {
  const t = navContent[language];
  const isDark = tone === "dark";
  const heading = isDark
    ? "text-xs uppercase tracking-wide text-[#93857B]"
    : "text-xs uppercase tracking-wide text-zinc-500";
  const link = isDark
    ? "text-[#A3968C] hover:text-[#F3E6DD]"
    : "text-zinc-700 hover:text-zinc-900";

  return (
    <footer
      className={
        isDark
          ? "px-6 py-[99px] font-[Roboto,Arial,sans-serif] text-sm text-[#93857B]"
          : "px-6 py-[99px] font-[Roboto,Arial,sans-serif] text-sm text-[#383838]"
      }
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-12 md:items-start">
        <div className="order-1 col-span-2 flex flex-col items-center gap-4 text-center md:order-2 md:col-span-1 md:justify-self-center">
          <Link
            href={homePath(language)}
            className={
              isDark
                ? "flex items-center gap-2 text-lg font-medium tracking-tight text-[#F3E6DD]"
                : "flex items-center gap-2 text-lg font-medium tracking-tight text-zinc-900"
            }
          >
            <img
              src="/logo-a.svg"
              alt=""
              width={20}
              height={20}
              className={isDark ? "h-5 w-5 invert" : "h-5 w-5"}
            />
            Aether Practice
          </Link>
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Aether Practice. {taglines[language]}
          </p>
        </div>
        <nav
          aria-label={t.menuHeading}
          className="order-2 flex flex-col gap-3 md:order-1 md:col-span-1 md:justify-self-start"
        >
            <p className={heading}>{t.menuHeading}</p>
            {t.menuLinks.map((item) => (
              <Link key={item.href} href={item.href} className={link}>
                {item.label}
              </Link>
            ))}
            {/* English dropped Family from the Services menu when Co-Founder took
                its slot. It is still a service, so it keeps its place in this column. */}
            {language === "en" && (
              <Link href="/family-support" className={link}>
                Family Session
              </Link>
            )}
        </nav>
        <nav
          aria-label={t.companyHeading}
          className="order-3 flex flex-col gap-3 justify-self-end md:col-span-1 md:justify-self-end"
        >
            <p className={heading}>{t.companyHeading}</p>
            {t.companyLinks.map((item) => (
              <Link key={item.href} href={item.href} className={link}>
                {item.label}
              </Link>
            ))}
            <Link href="/instruments" className={link}>
              Instruments
            </Link>
            <Link href={localizedPaths.privacy[language]} className={link}>
              {privacyLabel[language]}
            </Link>
        </nav>
      </div>
    </footer>
  );
}
