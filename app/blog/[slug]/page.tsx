import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogShell } from "@/components/blog-shell";
import { BlogCta } from "@/components/blog-cta";
import { BlogViewTracker } from "@/components/blog-view-tracker";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
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

  return pageMetadata({
    title: `${post.title} | Aether Practice`,
    description: post.description,
    path: `/blog/${post.slug}`,
    locale: post.lang === "no" ? "nb_NO" : "en_US",
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modifiedDate,
    section: "Parterapi",
    tags: post.tags,
  });
}

const backToBlogLabel: Record<"en" | "no", string> = {
  en: "← Back to Blog",
  no: "← Tilbake til bloggen",
};

function formatDate(date: string, lang: "en" | "no") {
  return new Date(date).toLocaleDateString(lang === "no" ? "nb-NO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-12 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium text-[#74382f]"
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
      className="mt-6 list-disc space-y-3 pl-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]"
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: `https://aetherpractice.com/blog/${post.slug}`,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modifiedDate,
    inLanguage: post.lang === "no" ? "nb-NO" : "en-US",
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
    about: [
      { "@type": "Thing", name: "Parterapi" },
      { "@type": "Place", name: "Oslo" },
    ],
  };

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <BlogShell language={post.lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BlogViewTracker slug={post.slug} title={post.title} />
      <article lang={post.lang === "no" ? "nb" : "en"} className="mx-auto flex max-w-3xl flex-col px-6 pb-24 pt-48">
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

        <div className="mt-4">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {post.relatedService && <BlogCta relatedService={post.relatedService} language={post.lang} />}
      </article>
    </BlogShell>
  );
}
