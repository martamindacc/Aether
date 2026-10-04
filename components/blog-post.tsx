import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogShell } from "@/components/blog-shell";
import { BlogCta } from "@/components/blog-cta";
import { BlogViewTracker } from "@/components/blog-view-tracker";
import { getTranslationsForPost, htmlLangFor, type BlogPost as BlogPostData, type BlogPostMeta } from "@/lib/blog";
import { extractFaq } from "@/lib/blog-faq";
import { formatReadingTime } from "@/lib/reading-time";
import { RelatedPosts } from "@/components/related-posts";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { blogIndexPathFor, localizedPaths, postPath } from "@/lib/locale-routes";
import { languages, type LanguageCode } from "@/lib/service-content";
import { headingId, mdxComponents } from "@/components/mdx-components";

function formatDate(date: string, lang: LanguageCode) {
  const localeMap: Record<LanguageCode, string> = { no: "nb-NO", en: "en-US" };
  return new Date(date).toLocaleDateString(localeMap[lang], {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
import { JsonLd } from "@/components/json-ld"

const ogLocale: Record<LanguageCode, string> = { no: "nb_NO", en: "en_US" };

/** Metadata for a post page: canonical, hreflang to its genuine translations, Open Graph article tags. */
export function postMetadata(post: BlogPostData): Metadata {

  const translations = getTranslationsForPost(post);
  const enTranslation = translations.find((t) => t.lang === "en");
  const languages =
    translations.length > 1
      ? {
          ...Object.fromEntries(translations.map((t) => [t.lang, postPath(t)])),
          ...(enTranslation ? { "x-default": postPath(enTranslation) } : {}),
        }
      : { [post.lang]: postPath(post) };

  return pageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    path: postPath(post),
    locale: ogLocale[post.lang],
    languages,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modifiedDate,
    tags: post.tags,
    image: post.image,
  });
}

const tocLabel: Record<LanguageCode, string> = { en: "Table of Contents", no: "Innhold" };

const backToBlogLabel: Record<LanguageCode, string> = {
  en: "← Back to Blog",
  no: "← Tilbake til bloggen",
};







/** Full article page body. The route decides which post to load; this renders it. */
export function BlogPost({ post, related }: { post: BlogPostData; related: BlogPostMeta[] }) {
  const schemaLangByLang: Record<LanguageCode, string> = { en: "en-US", no: "nb-NO" };
  // Each language gets a destination: the genuine translation when one exists,
  // otherwise that language's blog index, so the menu never dead-ends.
  const translations = getTranslationsForPost(post);
  const languageLinks = languages.map(({ code }) => {
    const translation = translations.find((t) => t.lang === code);
    return { code, href: translation ? postPath(translation) : localizedPaths.blog[code] };
  });
  const canonicalUrl = `https://aetherpractice.com${postPath(post)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: canonicalUrl,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modifiedDate,
    inLanguage: schemaLangByLang[post.lang],
    isAccessibleForFree: true,
    wordCount: post.wordCount,
    image: `https://aetherpractice.com${post.image ?? "/opengraph-image"}`,
    ...(post.tags.length ? { articleSection: post.tags[0] } : {}),
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
      "@id": canonicalUrl,
    },
  };

  const faqItems = post.faq ?? extractFaq(post);
  const faqJsonLd = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      }
    : null;

  const howToJsonLd = post.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.howTo.name,
        ...(post.howTo.description ? { description: post.howTo.description } : {}),
        inLanguage: schemaLangByLang[post.lang],
        step: post.howTo.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  const blogIndexPath = blogIndexPathFor(post);
  const blogIndexLabel = post.lang === "no" ? "Blogg" : "Blog";

  const breadcrumbLd = breadcrumbJsonLd([
    { name: post.lang === "no" ? "Hjem" : "Home", path: localizedPaths.home[post.lang] },
    { name: blogIndexLabel, path: blogIndexPath },
    { name: post.title, path: postPath(post) },
  ]);

  return (
    <BlogShell language={post.lang} languageLinks={languageLinks}>
      <JsonLd data={jsonLd} />
      {faqJsonLd && (
        <JsonLd data={faqJsonLd} />
      )}
      {howToJsonLd && <JsonLd data={howToJsonLd} />}
      <JsonLd data={breadcrumbLd} />
      <BlogViewTracker path={postPath(post)} title={post.title} />
      <article id="main-content" lang={htmlLangFor(post.lang)} className="mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-48">
        <Link
          href={blogIndexPath}
          className="font-[Roboto,Arial,sans-serif] text-sm text-zinc-600 hover:text-zinc-900"
        >
          {backToBlogLabel[post.lang]}
        </Link>
        <div className="mt-6 flex items-center gap-2 font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-zinc-600">
          <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
          {post.modifiedDate && post.modifiedDate !== post.date && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {post.lang === "no" ? "Oppdatert" : "Updated"}{" "}
                <time dateTime={post.modifiedDate}>{formatDate(post.modifiedDate, post.lang)}</time>
              </span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{formatReadingTime(post.wordCount, post.lang)}</span>
        </div>
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

        {post.lede && (
          <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">{post.lede}</p>
        )}

        {post.toc && post.toc.length > 0 && (
          <nav aria-label={tocLabel[post.lang]} className="mt-10 border-l-4 border-[#c9a87d] px-6 py-5 sm:px-8 sm:py-6">
            <h2 className="mt-0 font-[Roboto,Arial,sans-serif] text-sm font-medium uppercase tracking-[0.18em] text-[#74382f]">
              {tocLabel[post.lang]}
            </h2>
            <ol className="mt-4 grid gap-1.5 font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#6f5a46] sm:grid-cols-2">
              {post.toc.map((item, index) => (
                <li key={item.heading}>
                  <a href={`#${headingId(item.heading) ?? ""}`} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                    {index + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {post.intro && post.intro.length > 0 && (
          <div className="mt-10 space-y-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]">
            {post.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        <div className="mt-4">
          <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        {post.relatedService && <BlogCta relatedService={post.relatedService} language={post.lang} />}

        <RelatedPosts posts={related} language={post.lang} />
      </article>
    </BlogShell>
  );
}
