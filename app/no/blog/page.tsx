import type { Metadata } from "next";
import { BlogShell } from "@/components/blog-shell";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { BlogIndexContent } from "@/components/blog-index-content";

export const metadata: Metadata = pageMetadata({
  title: "Blogg | Aether Practice",
  description:
    "Artikler om relasjoner, parterapi, personlig utvikling og familieliv fra teamet i Aether Practice.",
  path: "/no/blog",
  locale: "nb_NO",
  languages: {
    no: "/no/blog",
    en: "/blog",
    "x-default": "/blog",
  },
});

const blogIndexLanguages = [
  { code: "en" as const, href: "/blog" },
  { code: "no" as const, href: "/no/blog" },
];

export default function NorwegianBlogIndexPage() {
  const posts = getAllPosts().filter((p) => p.lang === "no");
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aether Practice Blogg",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://aetherpractice.com/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <BlogShell language="no" articleLanguages={blogIndexLanguages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <BlogIndexContent posts={posts} language="no" />
    </BlogShell>
  );
}
