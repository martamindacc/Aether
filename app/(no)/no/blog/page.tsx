import type { Metadata } from "next";
import { BlogShell } from "@/components/blog-shell";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { hreflangFor, languageLinksFor, localizedPaths, postPath } from "@/lib/locale-routes";
import { BlogIndexContent } from "@/components/blog-index-content";
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = pageMetadata({
  title: "Blogg",
  description:
    "Artikler om relasjoner, parterapi, personlig utvikling og familieliv fra teamet i Aether Practice.",
  path: localizedPaths.blog.no,
  locale: "nb_NO",
  languages: hreflangFor("blog"),
});

const blogIndexLanguages = languageLinksFor("blog");

export default function NorwegianBlogIndexPage() {
  const posts = getAllPosts().filter((p) => p.lang === "no");
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Hjem", path: localizedPaths.home.no },
    { name: "Blogg", path: localizedPaths.blog.no },
  ]);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aether Practice Blogg",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://aetherpractice.com${postPath(post)}`,
      name: post.title,
    })),
  };

  return (
    <BlogShell language="no" languageLinks={blogIndexLanguages}>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbLd} />
      <BlogIndexContent posts={posts} language="no" />
    </BlogShell>
  );
}
