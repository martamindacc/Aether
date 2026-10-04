import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogShell } from "@/components/blog-shell";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-components";
import { extractFaq } from "@/lib/blog-faq";
import type { HubPage as HubPageData } from "@/lib/hubs";
import { localizedPaths } from "@/lib/locale-routes";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

/** Metadata for a hub: English only, no hreflang, since hubs have no translated counterpart. */
export function hubMetadata(hub: HubPageData): Metadata {
  return pageMetadata({
    title: hub.seoTitle || hub.title,
    description: hub.description,
    path: hub.path,
  });
}

/**
 * Service-style landing page rendered from MDX with the same typography as a
 * blog post. Emits Service + FAQPage + BreadcrumbList schema.
 */
export function HubPage({ hub }: { hub: HubPageData }) {
  const serviceLd = serviceJsonLd({
    name: hub.title,
    serviceType: "Couples therapy",
    description: hub.description,
    path: hub.path,
    areaServed: hub.areaServed,
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
    { name: "Home", path: localizedPaths.home.en },
    { name: hub.title, path: hub.path },
  ]);
  // No Norwegian twin: the language menu falls back to the Norwegian home page.
  const languageLinks = [
    { code: "en" as const, href: hub.path },
    { code: "no" as const, href: localizedPaths.home.no },
  ];

  return (
    <BlogShell language="en" languageLinks={languageLinks}>
      <JsonLd data={serviceLd} />
      {faqLd && <JsonLd data={faqLd} />}
      <JsonLd data={breadcrumbLd} />
      <article id="main-content" lang="en" className="mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-48">
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
