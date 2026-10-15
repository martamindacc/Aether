"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { SiteFooter } from "@/components/site-footer";
import { BookingModal } from "@/components/booking-modal";
import type { BlogPostMeta } from "@/lib/blog";
import { defaultMarketFor } from "@/lib/blog-market";
import type { LanguageCode } from "@/lib/service-content";
import { languageLinksFor, localizedPaths, postPath } from "@/lib/locale-routes";

const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "no", label: "NO" },
];

const languageLinks = languageLinksFor("home");

const content: Record<
  LanguageCode,
  {
    videoOverlay: string;
    heroTitle: string;
    heroSubtitle: string;
    bookNow: string;
    supportSections: {
      eyebrow: string;
      title: string;
      description: string;
      href: string;
      color: string;
    }[];
    learnMore: string;
    testimonialsEyebrow: string;
    testimonialsHeading: string;
    testimonials: {
      quote: string;
      name: string;
      context: string;
      initials: string;
      accentText: string;
      accentBg: string;
    }[];
    blogEyebrow: string;
    blogAllLink: string;
    blogReadMore: string;
    finalCtaHeading: string;
    finalCtaSubtext: string;
    finalCtaButton: string;
  }
> = {
  en: {
    videoOverlay: "Your Future is Yours to Shape",
    heroTitle: "Better life starts with better understanding",
    heroSubtitle:
      "Private online sessions for couples, individuals, co-founders, executives, and founders in New York City, California, and Norway.",
    bookNow: "Book Now",
    supportSections: [
      {
        eyebrow: "Relationship support",
        title: "Couples Session",
        description:
          "Understand how you work together as a couple — improve communication, rebuild trust, and repair the pattern underneath the conflict.",
        href: "/couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Intensive support",
        title: "Couples Intensive",
        description:
          "Two days of focused work for couples who need more than an hour a week — break the stuck pattern and leave with a clear way forward.",
        href: "/intensive-couples-therapy",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Founding team",
        title: "Co-Founder Session",
        description:
          "Work on the founding relationship itself — how the two of you decide, disagree, and divide the weight, before the company starts routing around it.",
        href: "/co-founder-coaching",
        color: "text-[#8a6558]",
      },
      {
        eyebrow: "Leadership support",
        title: "Executive & Founder Work",
        description:
          "Support at the level decisions and isolation actually happen — for founders and executives carrying weight the role doesn't make space for.",
        href: "/executive-founder-work",
        color: "text-[#496171]",
      },
      {
        eyebrow: "Individual support",
        title: "Individual Session",
        description:
          "Support in your own life situations — anxiety, grief, identity, transitions, and the weight you carry alone.",
        href: "/individual-therapy",
        color: "text-[#7b4037]",
      },
    ],
    learnMore: "Learn more →",
    testimonialsEyebrow: "Client Stories",
    testimonialsHeading: "Trusted by people who expect more from their care",
    testimonials: [
      {
        quote:
          "For the first time in years, I understand why I react the way I do. The work here didn't just calm me down — it gave me a framework for the rest of my life.",
        name: "M. R.",
        context: "Individual client",
        initials: "MR",
        accentText: "text-[#7b4037]",
        accentBg: "bg-[#7b4037]/10",
      },
      {
        quote:
          "We came in on the edge of separating. What we found was a way to actually hear each other again — not just survive the conversation, but want to have it.",
        name: "J. & A.",
        context: "Couples clients",
        initials: "JA",
        accentText: "text-[#66755c]",
        accentBg: "bg-[#66755c]/10",
      },
      {
        quote:
          "As a founder, I'd never had a space where the weight of the decisions was actually welcome. This is the only hour of my week I don't perform.",
        name: "K. T.",
        context: "Founder, Executive work",
        initials: "KT",
        accentText: "text-[#496171]",
        accentBg: "bg-[#496171]/10",
      },
    ],
    blogEyebrow: "FROM THE BLOG",
    blogAllLink: "All articles →",
    blogReadMore: "Read more →",
    finalCtaHeading: "The clarity you're looking for begins today.",
    finalCtaSubtext:
      "A practice built for those who expect the same rigor from their inner life as they do from their work.",
    finalCtaButton: "Book Your Session",
  },
  no: {
    videoOverlay: "Din Fremtid Er Din Å Forme",
    heroTitle: "Klarhet for et liv med høy innsats",
    heroSubtitle:
      "Private online samtaler for par, enkeltpersoner, familier, ledere og grunnleggere i Oslo og hele Norge.",
    bookNow: "Bestill Nå",
    supportSections: [
      {
        eyebrow: "Relasjonsstøtte",
        title: "Parterapi",
        description:
          "Forstå hvordan dere fungerer som par — forbedre kommunikasjon, gjenoppbygg tillit, og reparer mønsteret under konflikten.",
        href: "/no/parterapi",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Intensivt forløp",
        title: "Parintensiv",
        description:
          "To dager med fokusert arbeid for par som trenger mer enn en time i uken — bryt det fastlåste mønsteret og dra med en tydelig vei videre.",
        href: "/no/parintensiv",
        color: "text-[#66755c]",
      },
      {
        eyebrow: "Individuell støtte",
        title: "Individuell terapi",
        description:
          "Støtte i dine egne livssituasjoner — angst, sorg, identitet, overganger, og vekten du bærer alene.",
        href: "/no/individuell-terapi",
        color: "text-[#7b4037]",
      },
      {
        eyebrow: "Familiestøtte",
        title: "Familieterapi",
        description:
          "Skap en stødigere familierytme — med tydeligere kommunikasjon, sterkere tilknytning og praktisk støtte for øyeblikkene som former livet sammen.",
        href: "/no/familieterapi",
        color: "text-[#8a6558]",
      },
      {
        eyebrow: "Ledelsesstøtte",
        title: "Leder- og Grunnleggerarbeid",
        description:
          "Støtte på nivået der beslutninger og isolasjon faktisk skjer — for gründere og ledere som bærer vekten rollen ikke gir plass til.",
        href: "/no/ledere-og-grundere",
        color: "text-[#496171]",
      },
    ],
    learnMore: "Les mer →",
    testimonialsEyebrow: "Klienthistorier",
    testimonialsHeading: "Betrodd av mennesker som forventer mer av omsorgen sin",
    testimonials: [
      {
        quote:
          "For første gang på flere år forstår jeg hvorfor jeg reagerer som jeg gjør. Arbeidet her roet meg ikke bare ned — det ga meg et rammeverk for resten av livet.",
        name: "M. R.",
        context: "Individuell klient",
        initials: "MR",
        accentText: "text-[#7b4037]",
        accentBg: "bg-[#7b4037]/10",
      },
      {
        quote:
          "Vi kom inn på randen av å skilles. Det vi fant var en måte å faktisk høre hverandre igjen — ikke bare overleve samtalen, men ønske å ha den.",
        name: "J. & A.",
        context: "Par-klienter",
        initials: "JA",
        accentText: "text-[#66755c]",
        accentBg: "bg-[#66755c]/10",
      },
      {
        quote:
          "Som gründer hadde jeg aldri hatt et rom der vekten av beslutningene faktisk var velkommen. Dette er den eneste timen i uken jeg ikke presterer.",
        name: "K. T.",
        context: "Gründer, lederarbeid",
        initials: "KT",
        accentText: "text-[#496171]",
        accentBg: "bg-[#496171]/10",
      },
    ],
    blogEyebrow: "FRA BLOGGEN",
    blogAllLink: "Alle artikler →",
    blogReadMore: "Les mer →",
    finalCtaHeading: "Klarheten du søker begynner med én samtale.",
    finalCtaSubtext:
      "En praksis bygget for dem som forventer samme presisjon i sitt innerliv som i arbeidet sitt.",
    finalCtaButton: "Bestill Din Økt",
  },
};

function formatBlogDate(date: string, lang: string): string {
  const localeMap: Record<string, string> = { no: "nb-NO", en: "en-US" };
  return new Date(date)
    .toLocaleDateString(localeMap[lang] ?? "en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    .toUpperCase();
}

export default function HomeClient({
  posts,
  language: languageCode,
}: {
  posts: BlogPostMeta[];
  /** Language this route renders in; the URL (/ or /no) decides it. */
  language: LanguageCode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const language = languages.find((lang) => lang.code === languageCode) ?? languages[0];
  const t = content[language.code];

  const openBooking = () => setIsBookingOpen(true);

  const closeBooking = () => setIsBookingOpen(false);


  const blogPosts = posts
    .filter((p) => p.market === defaultMarketFor(language.code))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FBF8F5] font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900">
      <div className="relative h-screen w-full overflow-hidden bg-[#FBF8F5]">
        {/* Poster paints immediately (the LCP element); the video streams in behind it. Reduced-motion users get the still only. */}
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          src="/morawska-marta-psychotherapy.mp4"
          poster="/hero-poster.webp"
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-cover bg-center motion-reduce:block"
          style={{ backgroundImage: "url(/hero-poster.webp)" }}
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:items-end sm:justify-center sm:pb-16">
          <p className="text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-white sm:text-6xl">
            {t.videoOverlay}
          </p>
        </div>

        <FloatingNav
          language={language.code}
          languageLinks={languageLinks}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          isLangOpen={isLangOpen}
          onLangOpenChange={setIsLangOpen}
        />

        <BookingModal language={language.code} isOpen={isBookingOpen} onClose={closeBooking} />
      </div>

      <section id="main-content" className="flex flex-col items-center px-6 pb-12 pt-[104px] text-center font-[Inter,-apple-system,BlinkMacSystemFont,'SF_Pro_Text',system-ui,sans-serif] text-[19px] font-normal leading-[1.5] text-[#383838]">
        <h1 className="max-w-6xl text-balance font-[Roboto,Arial,sans-serif] text-[44px] font-medium leading-[0.95] tracking-tight text-zinc-900 sm:text-[64px] lg:text-[90px]">
          {t.heroTitle}
        </h1>
        <p className="mt-8 max-w-3xl text-balance text-[19px] leading-[1.6] text-[#383838] sm:text-[21px]">
          {language.code === "en" ? (
            <>
              Private online sessions for couples, individuals, co-founders, executives, and founders in New York City, California, and <Link href="/online-therapy-norway" className="underline underline-offset-4 decoration-[#C9A67D] hover:text-zinc-900">Norway</Link>.
            </>
          ) : language.code === "no" ? (
            <>
              Private online samtaler for par, enkeltpersoner, familier, ledere og grunnleggere i Oslo og hele <Link href="/online-therapy-norway" className="underline underline-offset-4 decoration-[#C9A67D] hover:text-zinc-900">Norge</Link>.
            </>
          ) : (
            t.heroSubtitle
          )}
        </p>
        <div className="mt-24 flex w-full max-w-6xl flex-col gap-6 text-left sm:mt-32">
          {t.supportSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-zinc-300/80 bg-[#F7F2EC] bg-[url('/sand-texture.png')] bg-cover bg-center bg-blend-multiply p-8 transition-colors duration-200 hover:border-[#C4B5AB] hover:bg-[#F4EDE6] sm:p-14"
            >
              <h2 className="inline-block origin-left font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium tracking-tight text-zinc-900 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:scale-x-105 sm:text-7xl">
                {section.title}
              </h2>
              <p className="mt-8 max-w-5xl text-[20px] leading-[1.5] text-[#383838]">
                {section.description}
              </p>
              <span className="mt-10 inline-block text-base text-[#383838]">
                {t.learnMore}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-32 flex w-full max-w-6xl flex-col items-center gap-4">
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            {t.testimonialsEyebrow}
          </p>
          <h2 className="max-w-3xl text-balance text-center font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium tracking-tight text-zinc-900 sm:text-6xl">
            {t.testimonialsHeading}
          </h2>
        </div>
        <div className="mt-16 grid w-full max-w-6xl gap-6 sm:grid-cols-3">
          {t.testimonials.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-8 rounded-2xl border border-zinc-300/80 bg-[#F7F1EB] p-8 sm:p-10"
            >
              <span aria-hidden="true" className="-mb-3 flex justify-center gap-2">
<span className="h-7 w-3 bg-[#BFA17F] [clip-path:polygon(0_0,100%_0,80%_100%,20%_100%)]" />
<span className="h-7 w-3 bg-[#BFA17F] [clip-path:polygon(0_0,100%_0,80%_100%,20%_100%)]" />
</span>
              <p className="flex-1 text-balance text-center font-[Roboto,Arial,sans-serif] text-lg leading-[1.6] text-[#383838]">
                {item.quote}
              </p>
              <div className="flex items-center justify-center gap-3">
  <span className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-[#7a6347]">
  {item.name} &middot; {item.context}
  </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex w-full max-w-6xl flex-col items-center gap-8 rounded-[2rem] px-8 pb-10 pt-20 text-center sm:px-20 sm:pb-16 sm:pt-28">
          <div className="h-px w-24 bg-[#C9AB88]" />
          <h2 className="max-w-3xl text-balance font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-semibold leading-[1.1] tracking-wide text-zinc-900 sm:text-4xl">
            {t.finalCtaHeading}
          </h2>
          <button
            onClick={openBooking}
            className="mt-2 bg-zinc-900 px-10 py-5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-zinc-800"
          >
            {t.finalCtaButton}
          </button>
        </div>
      </section>

      {blogPosts.length > 0 && (
        <section className="w-full bg-[#F1EAE2] py-28 sm:py-32">
          <div className="mx-auto flex max-w-6xl flex-col px-6 sm:px-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="h-px w-8 bg-[#C9AB88]" />
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                  {t.blogEyebrow}
                </p>
              </div>
              <Link
                href={language.code === "no" ? localizedPaths.blog.no : localizedPaths.blog.en}
                className="text-xs uppercase tracking-[0.1em] text-zinc-600 transition-colors hover:text-zinc-900"
              >
                {t.blogAllLink}
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={postPath(post)}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-[#FBF8F5] shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
                >
                  {post.image ? (
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt ?? ""}
                        fill
                        sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                      />
                    </div>
                  ) : null}
                  <div className={`flex flex-col px-6 pb-8 ${post.image ? "pt-5" : "pt-8"}`}>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-600">
                      {post.tags[0] ? `${post.tags[0]} · ` : ""}{formatBlogDate(post.date, language.code)}
                    </p>
                    <h3 className="mt-3 line-clamp-2 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-[20px] font-medium leading-[1.25] tracking-tight text-zinc-900">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter language={language.code} />
    </main>
  );
}
