import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogShell } from "@/components/blog-shell";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-components";
import { extractFaq } from "@/lib/blog-faq";
import { getHubTranslations, type HubPage as HubPageData } from "@/lib/hubs";
import { localizedPaths } from "@/lib/locale-routes";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { languages } from "@/lib/service-content";

const homeLabel = { en: "Home", no: "Hjem" } as const;
const serviceType = { en: "Couples therapy", no: "Parterapi" } as const;
const ogLocale = { en: "en_US", no: "nb_NO" } as const;

/**
 * hreflang map for a hub: its hub translations, plus any hand-declared alternate
 * (a service page in the other language). Undefined when the hub stands alone.
 */
export function hubLanguages(hub: HubPageData): Record<string, string> | undefined {
  const paths: Partial<Record<"en" | "no", string>> = { ...(hub.alternates ?? {}) };
  for (const t of getHubTranslations(hub)) paths[t.lang] = t.path;
  if (Object.keys(paths).length < 2 || !paths.en) return undefined;
  return { ...paths, "x-default": paths.en };
}

/** Metadata for a hub: canonical, and hreflang only when a genuine translation exists. */
export function hubMetadata(hub: HubPageData): Metadata {
  return pageMetadata({
    title: hub.seoTitle || hub.title,
    description: hub.description,
    path: hub.path,
    locale: ogLocale[hub.lang],
    ...(hubLanguages(hub) ? { languages: hubLanguages(hub) } : {}),
  });
}

/**
 * Service-style landing page rendered from MDX with the same typography as a
 * blog post. Emits Service + FAQPage + BreadcrumbList schema.
 */
export function HubPage({ hub }: { hub: HubPageData }) {
  const serviceLd = serviceJsonLd({
    name: hub.title,
    serviceType: serviceType[hub.lang],
    description: hub.description,
    path: hub.path,
    areaServed: hub.areaServed,
    inLanguage: hub.lang === "no" ? "nb" : "en",
  });
  const faqItems = extractFaq(hub);
  const faqLd = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }
    : null;
  const breadcrumbLd = breadcrumbJsonLd([
    { name: homeLabel[hub.lang], path: localizedPaths.home[hub.lang] },
    { name: hub.title, path: hub.path },
  ]);
  // Each language gets a destination: the translated hub when one exists,
  // otherwise that language's home page, so the menu never dead-ends.
  const alternates = hubLanguages(hub);
  const languageLinks = languages.map(({ code }) => ({ code, href: alternates?.[code] ?? localizedPaths.home[code] }));

  return (
    <BlogShell language={hub.lang} languageLinks={languageLinks}>
      <JsonLd data={serviceLd} />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd data={breadcrumbLd} />
      <article id="main-content" lang={hub.lang === "no" ? "nb" : "en"} className="mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-48">
        <h1 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium leading-[1.05] tracking-tight text-[#74382f] sm:text-6xl">
          {hub.title}
        </h1>
        {hub.lede && (
          <p className="mt-8 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">{hub.lede}</p>
        )}
        <div className="mt-4">
          <MDXRemote source={hub.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </article>
    </BlogShell>
  );
}
