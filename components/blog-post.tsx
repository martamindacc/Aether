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
import type { LanguageCode } from "@/lib/service-content";
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






function headingId(children: React.ReactNode) {
  return typeof children === "string"
    ? children.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : undefined;
}

function formatDate(date: string, lang: LanguageCode) {
  const localeMap: Record<LanguageCode, string> = { no: "nb-NO", en: "en-US" };
  return new Date(date).toLocaleDateString(localeMap[lang], {
    timeZone: "UTC",
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
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element -- MDX images have no known dimensions
    <img loading="lazy" decoding="async" className="mt-8 h-auto w-full rounded-2xl" {...props} />
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

/** Full article page body. The route decides which post to load; this renders it. */
export function BlogPost({ post, related }: { post: BlogPostData; related: BlogPostMeta[] }) {
  const schemaLangByLang: Record<LanguageCode, string> = { en: "en-US", no: "nb-NO" };
  const languageLinks = getTranslationsForPost(post).map((t) => ({
    code: t.lang,
    href: postPath(t),
  }));
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
