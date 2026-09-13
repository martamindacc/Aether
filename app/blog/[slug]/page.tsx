import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogShell } from "@/components/blog-shell";
import { BlogCta } from "@/components/blog-cta";
import { BlogViewTracker } from "@/components/blog-view-tracker";
import { getAllSlugs, getPostBySlug, getTranslationsForPost, htmlLangFor } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const localeMap: Record<string, string> = {
    no: "nb_NO",
    pl: "pl_PL",
    en: "en_US",
  };

  const translations = getTranslationsForPost(post);
  const languages =
    translations.length > 1
      ? Object.fromEntries(translations.map((t) => [t.lang, `/blog/${t.slug}`]))
      : undefined;

  return pageMetadata({
    title: post.seoTitle || `${post.title} | Aether Practice`,
    description: post.seoDescription || post.description,
    path: `/blog/${post.slug}`,
    locale: localeMap[post.lang] || "en_US",
    languages,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modifiedDate,
    tags: post.tags,
  });
}

const backToBlogLabel: Record<"en" | "no" | "pl", string> = {
  en: "← Back to Blog",
  no: "← Tilbake til bloggen",
  pl: "← Powrót do bloga",
};

const englishTocBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "8-signs-need-couples-therapy": [
    ["You have the same conflicts over and over again", "1. You have the same conflicts over and over again"],
    ["You can't talk about difficult things without escalation", "2. You can't talk about difficult things without escalation"],
    ["You feel more like adversaries than teammates", "3. You feel more like adversaries than teammates"],
    ["One or both of you has started withdrawing emotionally", "4. One or both of you has started withdrawing emotionally"],
    ["Intimacy, sex, or closeness has become a conflict zone", "5. Intimacy, sex, or closeness has become a conflict zone"],
    ["Trust has been broken", "6. Trust has been broken"],
    ["You function on the surface, but struggle together", "7. You function on the surface, but struggle together"],
    ["You're already wondering if you should separate", "8. You're already wondering if you should separate"],
    ["Do you need couples therapy?", "Do you need couples therapy?"],
    ["When should you go to couples therapy?", "When should you go to couples therapy?"],
    ["What if only one of you wants couples therapy?", "What if only one of you wants couples therapy?"],
    ["When couples therapy isn't the right first step", "When couples therapy isn't the right first step"],
    ["Common questions about couples therapy", "Common questions about couples therapy"],
  ],
};

const englishLedeBySlug: Record<string, string> = {
  "8-signs-need-couples-therapy":
    "Are you considering couples therapy because you have repeated conflicts, communication problems, or feel increasingly distant from each other? You do not have to wait until your relationship is on the verge of breaking down before seeking professional help. Here are 8 signs that you may need couples therapy, what they can mean for your relationship, and when it may be the right time to seek help.",
};

const polishLedeBySlug: Record<string, string> = {
  "8-znakow-potrzeba-terapii-par":
    "Zastanawiacie się nad terapią par, ponieważ wciąż wracacie do tych samych konfliktów, macie problemy z komunikacją albo czujecie, że coraz bardziej się od siebie oddalacie? Nie musicie czekać, aż wasz związek znajdzie się na skraju rozpadu, żeby poszukać profesjonalnej pomocy. Oto 8 oznak, że możecie potrzebować terapii par, co mogą oznaczać dla waszej relacji i kiedy warto poszukać pomocy.",
};

const norwegianTocBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "parterapi-i-oslo": [
    ["Hva Er Parterapi Egentlig?", "Hva Er Parterapi Egentlig?"],
    ["Hvorfor Parterapi Er Annerledes Enn Individualterapi", "Hvorfor Parterapi Er Annerledes Enn Individualterapi"],
    ["Tegn på At Dere Trenger Parterapi", "Tegn på At Dere Trenger Parterapi"],
    ["Når Skal Du Søke Parterapi?", "Når Skal Du Søke Parterapi?"],
    ["Typer Parterapi", "Typer Parterapi"],
    ["Hvordan Velge En Parterapeut i Oslo", "Hvordan Velge En Parterapeut i Oslo"],
    ["Hva Forventer Du Fra Parterapi?", "Hva Forventer Du Fra Parterapi?"],
    ["Kostnad Av Parterapi i Oslo", "Kostnad Av Parterapi i Oslo"],
    ["Tegn På At En Terapeut IKKE Er Riktig", "Tegn På At En Terapeut IKKE Er Riktig"],
    ["FAQ: Parterapi i Oslo", "FAQ: Parterapi i Oslo"],
    ["Om Aether Practice", "Om Aether Practice"],
    ["Ta Neste Steg", "Ta Neste Steg"],
    ["Forskning og Videre Lesning", "Forskning og Videre Lesning"],
  ],
  "parterapi-i-oslo-tegn": [
    ["Dere har de samme konfliktene om og om igjen", "1. Dere har de samme konfliktene om og om igjen"],
    ["Dere klarer ikke å snakke om vanskelige ting uten at det eskalerer", "2. Dere klarer ikke å snakke om vanskelige ting uten at det eskalerer"],
    ["Dere føler dere mer som motstandere enn som et team", "3. Dere føler dere mer som motstandere enn som et team"],
    ["Én eller begge har begynt å trekke seg følelsesmessig unna", "4. Én eller begge har begynt å trekke seg følelsesmessig unna"],
    ["Nærhet, sex eller intimitet har blitt et konfliktområde", "5. Nærhet, sex eller intimitet har blitt et konfliktområde"],
    ["Tilliten er svekket", "6. Tilliten er svekket"],
    ["Dere fungerer på utsiden, men har det dårlig sammen", "7. Dere fungerer på utsiden, men har det dårlig sammen"],
    ["Dere vurderer allerede om dere skal gå fra hverandre", "8. Dere vurderer allerede om dere skal gå fra hverandre"],
    ["Trenger vi parterapi?", "Trenger vi parterapi?"],
    ["Når bør man gå i parterapi?", "Når bør man gå i parterapi?"],
    ["Hva hvis bare én av dere ønsker parterapi?", "Hva hvis bare én av dere ønsker parterapi?"],
    ["Når parterapi ikke er riktig første steg", "Når parterapi ikke er riktig første steg"],
    ["Vanlige spørsmål om parterapi", "Vanlige spørsmål om parterapi"],
  ],
  "nar-friluftsliv-blir-viktigere-enn-forholdet": [
    ["Når friluftsliv blir en erstatning for intimitet", "Når friluftsliv blir en erstatning for intimitet"],
    ["Tegn på at aktivitet har tatt plassen til intimitet", "Tegn på at aktivitet har tatt plassen til intimitet"],
    ["Hvorfor dette kan være spesielt relevant i Norge", "Hvorfor dette kan være spesielt relevant i Norge"],
    ["Hva forskningen sier om friluftsliv, fritid og parforhold", "Hva forskningen sier om friluftsliv, fritid og parforhold"],
    ["Slik kan dere finne tilbake til intimiteten hjemme", "Slik kan dere finne tilbake til intimiteten hjemme"],
    ["Hva hvis partneren din ikke ser problemet?", "Hva hvis partneren din ikke ser problemet?"],
    ["Når kan parterapi være nyttig?", "Når kan parterapi være nyttig?"],
    ["FAQ: Friluftsliv og intimitet i parforhold", "FAQ: Friluftsliv og intimitet i parforhold"],
    ["Friluftslivet trenger ikke forsvinne. Men forholdet trenger mer enn turen.", "Friluftslivet trenger ikke forsvinne. Men forholdet trenger mer enn turen."],
    ["Klare for å finne tilbake til nærheten?", "Klare for å finne tilbake til nærheten?"],
  ],
};

const polishTocBySlug: Record<string, ReadonlyArray<readonly [string, string]>> = {
  "8-znakow-potrzeba-terapii-par": [
    ["Macie te same konflikty znowu i znowu", "1. Macie te same konflikty znowu i znowu"],
    ["Nie potraficie rozmawiać o trudnych sprawach bez eskalacji", "2. Nie potraficie rozmawiać o trudnych sprawach bez eskalacji"],
    ["Czujecie się bardziej jak wrogowie niż drużyna", "3. Czujecie się bardziej jak wrogowie niż drużyna"],
    ["Jeden z was (lub oboje) zaczął się wycofywać emocjonalnie", "4. Jeden z was (lub oboje) zaczął się wycofywać emocjonalnie"],
    ["Bliskość, seks lub intymność stały się źródłem konfliktu", "5. Bliskość, seks lub intymność stały się źródłem konfliktu"],
    ["Zaufanie zostało złamane", "6. Zaufanie zostało złamane"],
    ["Funkcjonujecie na zewnątrz, ale macie problemy razem", "7. Funkcjonujecie na zewnątrz, ale macie problemy razem"],
    ["Już się zastanawiacie, czy powinniście się rozstać", "8. Już się zastanawiacie, czy powinniście się rozstać"],
    ["Czy potrzebujecie terapii par?", "Czy potrzebujecie terapii par?"],
    ["Kiedy szukać terapii par?", "Kiedy szukać terapii par?"],
    ["Co jeśli tylko jedno z was chce terapii par?", "Co jeśli tylko jedno z was chce terapii par?"],
    ["Kiedy terapia par nie jest właściwym pierwszym krokiem", "Kiedy terapia par nie jest właściwym pierwszym krokiem"],
    ["Częste pytania o terapię par", "Częste pytania o terapię par"],
  ],
};

const norwegianLedeBySlug: Record<string, React.ReactNode> = {
  "nar-friluftsliv-blir-viktigere-enn-forholdet": "Friluftsliv kan være en sterk kilde til nærhet i et parforhold. Men hva skjer når aktiviteter blir viktigere enn kontakten hjemme? For mange par er turer, ski, hytta, trening og andre friluftsaktiviteter en viktig del av livet sammen. Det kan gi glede, mestring, opplevelser og tid sammen. Men noen ganger kan det også oppstå et mønster der aktivitetene blir stedet dere fortsatt fungerer godt sammen – mens nærheten, samtalene og intimiteten hjemme gradvis forsvinner.",
  "parterapi-i-oslo-tegn": "Vurderer dere parterapi fordi dere har gjentatte konflikter, kommunikasjonsproblemer eller økende avstand i forholdet? Dere trenger ikke å vente til dere står på randen av et samlivsbrudd før dere søker profesjonell hjelp. Her er 8 tegn på at dere trenger parterapi, hva de kan bety for parforholdet, og når det kan være riktig å søke hjelp.",
  "parterapi-i-oslo": (
    <>
      Denne guiden til parterapi i Oslo forklarer når parterapi kan være nyttig, hvilke terapiformer som finnes, og
      hvordan dere velger riktig parterapeut. Du får også vite hva dere kan forvente av parterapi, hva det koster i
      Oslo, og når det kan være riktig å søke hjelp.
    </>
  ),
};

function headingId(children: React.ReactNode) {
  return typeof children === "string"
    ? children.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : undefined;
}

function formatDate(date: string, lang: "en" | "no" | "pl") {
  const localeMap: Record<string, string> = {
    no: "nb-NO",
    pl: "pl-PL",
    en: "en-US",
  };
  return new Date(date).toLocaleDateString(localeMap[lang] || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      id={headingId(props.children)}
      className="mt-12 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium tracking-tight text-[#74382f] sm:text-4xl"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 font-[Roboto,Arial,sans-serif] text-2xl font-medium text-zinc-900"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className={`mt-6 space-y-3 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838] ${
        JSON.stringify(props.children).includes("☐") || JSON.stringify(props.children).includes("✓")
          ? "list-none pl-0"
          : "list-disc pl-6 marker:text-[#74382f]"
      }`}
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-3 pl-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]"
      {...props}
    />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-[#74382f] underline underline-offset-2 hover:no-underline" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-[Roboto,Arial,sans-serif] font-medium" {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-left font-[Roboto,Arial,sans-serif] text-[16px] leading-[1.5] text-[#383838]" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => (
    <thead className="border-b border-zinc-300/80 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900" {...props} />
  ),
  tr: (props: React.ComponentProps<"tr">) => (
    <tr className="border-b border-zinc-300/80 align-top" {...props} />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="px-4 py-3 font-medium" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="px-4 py-3" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const schemaLangByLang: Record<typeof post.lang, string> = { en: "en-US", no: "nb-NO", pl: "pl-PL" };
  const articleLanguages = getTranslationsForPost(post).map((t) => ({
    code: t.lang,
    href: `/blog/${t.slug}`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: `https://aetherpractice.com/blog/${post.slug}`,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modifiedDate,
    inLanguage: schemaLangByLang[post.lang],
    isAccessibleForFree: true,
    keywords: post.keywords,
    author: {
      "@type": "Organization",
      name: "Aether Practice",
      url: "https://aetherpractice.com/",
      "@id": "https://aetherpractice.com/#organization",
    },
    publisher: {
      "@type": "Organization",
      name: "Aether Practice",
      "@id": "https://aetherpractice.com/#organization",
      url: "https://aetherpractice.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://aetherpractice.com/logo-a.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aetherpractice.com/blog/${post.slug}`,
    },
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <BlogShell language={post.lang} articleLanguages={articleLanguages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogViewTracker slug={post.slug} title={post.title} />
      <article lang={htmlLangFor(post.lang)} className="mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-48">
        <Link
          href="/blog"
          className="font-[Roboto,Arial,sans-serif] text-sm text-zinc-500 hover:text-zinc-900"
        >
          {backToBlogLabel[post.lang]}
        </Link>
        <time dateTime={post.date} className="mt-6 font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-zinc-500">
          {formatDate(post.date, post.lang)}
        </time>
        <h1 className="mt-3 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium leading-[1.05] tracking-tight text-[#74382f] sm:text-6xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-300/80 px-3 py-1 font-[Roboto,Arial,sans-serif] text-xs text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.lang === "no" && norwegianLedeBySlug[post.slug] && (
          <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            {norwegianLedeBySlug[post.slug]}
          </p>
        )}

        {post.lang === "en" && englishLedeBySlug[post.slug] && (
          <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            {englishLedeBySlug[post.slug]}
          </p>
        )}

        {post.lang === "pl" && polishLedeBySlug[post.slug] && (
          <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            {polishLedeBySlug[post.slug]}
          </p>
        )}

        {post.lang === "en" && englishTocBySlug[post.slug] && (
          <nav aria-label="Table of Contents" className="mt-10 border-l-4 border-[#c9a87d] px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="mt-0 font-[Roboto,Arial,sans-serif] text-sm font-medium uppercase tracking-[0.18em] text-[#74382f]">
              Table of Contents
            </h2>
            <ol className="mt-4 grid gap-1.5 font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#6f5a46] sm:grid-cols-2">
              {englishTocBySlug[post.slug].map(([label, headingText], index) => (
                <li key={headingText}>
                  <a href={`#${headingId(headingText) ?? ""}`} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                    {index + 1}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.lang === "no" && norwegianTocBySlug[post.slug] && (
          <nav aria-label="Innhold" className="mt-10 border-l-4 border-[#c9a87d] px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="mt-0 font-[Roboto,Arial,sans-serif] text-sm font-medium uppercase tracking-[0.18em] text-[#74382f]">
              Innhold
            </h2>
            <ol className="mt-4 grid gap-1.5 font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#6f5a46] sm:grid-cols-2">
              {norwegianTocBySlug[post.slug].map(([label, headingText], index) => (
                <li key={headingText}>
                  <a href={`#${headingId(headingText) ?? ""}`} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                    {index + 1}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.lang === "pl" && polishTocBySlug[post.slug] && (
          <nav aria-label="Spis treści" className="mt-10 border-l-4 border-[#c9a87d] px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="mt-0 font-[Roboto,Arial,sans-serif] text-sm font-medium uppercase tracking-[0.18em] text-[#74382f]">
              Spis Treści
            </h2>
            <ol className="mt-4 grid gap-1.5 font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#6f5a46] sm:grid-cols-2">
              {polishTocBySlug[post.slug].map(([label, headingText], index) => (
                <li key={headingText}>
                  <a href={`#${headingId(headingText) ?? ""}`} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                    {index + 1}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.lang === "no" && post.slug === "nar-friluftsliv-blir-viktigere-enn-forholdet" && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Da kan dere ende opp som aktivitetskompanjonger snarere enn kjærester.</p>
            <p>Det betyr ikke at friluftslivet er problemet. Spørsmålet er hva som skjer i forholdet når turen er over, og dere ikke lenger har aktiviteten til å holde kontakten i gang.</p>
          </div>
        )}

        {post.lang === "no" && post.slug === "parterapi-i-oslo-tegn" && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Mange par merker problemene lenge før de blir en krise. De samme konfliktene kan gjenta seg, kommunikasjonen kan bli vanskeligere, og nærheten kan gradvis forsvinne.</p>
            <p>Ofte handler det ikke om én stor hendelse, men om mønstre som utvikler seg over tid. Én trekker seg unna, mens den andre prøver stadig hardere å få kontakt. Begge kan sitte igjen med følelsen av å ikke bli forstått.</p>
            <p>Jo tidligere dere oppdager slike mønstre, desto lettere kan det være å ta tak i dem.</p>
          </div>
        )}

        {post.lang === "en" && englishLedeBySlug[post.slug] && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Many couples notice the problems long before they become a crisis. The same conflicts can repeat themselves, communication can become more difficult, and closeness can gradually fade.</p>
            <p>Often it&apos;s not about one big event, but about patterns that develop over time. One person withdraws while the other tries harder and harder to reconnect. Both can end up feeling misunderstood.</p>
            <p>The earlier you recognize these patterns, the easier it can be to address them.</p>
          </div>
        )}

        {post.lang === "pl" && polishLedeBySlug[post.slug] && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            <p>Wiele par zauważa problemy na długo zanim staną się kryzysem. Te same konflikty mogą się powtarzać, komunikacja może stawać się coraz trudniejsza, a bliskość może stopniowo zanikać.</p>
            <p>Często nie chodzi o jedno duże wydarzenie, lecz o wzorce, które rozwijają się z czasem. Jedna osoba się wycofuje, podczas gdy druga coraz mocniej stara się nawiązać kontakt. Obie strony mogą czuć się niezrozumiane.</p>
            <p>Im wcześniej rozpoznacie takie wzorce, tym łatwiej może być się nimi zająć.</p>
          </div>
        )}

        <div className="mt-4">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {post.relatedService && <BlogCta relatedService={post.relatedService} language={post.lang} />}
      </article>
    </BlogShell>
  );
}
