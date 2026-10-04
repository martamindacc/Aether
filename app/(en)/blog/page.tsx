import type { Metadata } from "next";
import { BlogShell } from "@/components/blog-shell";
import { getAllPosts } from "@/lib/blog";
import { getAllHubs } from "@/lib/hubs";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { hreflangFor, languageLinksFor, localizedPaths, postPath } from "@/lib/locale-routes";
import { BlogIndexContent } from "@/components/blog-index-content";
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Guides and perspectives from Aether Practice on relationships, couples therapy, individual growth, family life, and working well under pressure.",
  path: localizedPaths.blog.en,
  languages: hreflangFor("blog"),
});

const blogIndexLanguages = languageLinksFor("blog");

export default function BlogIndexPage() {
  const posts = getAllPosts().filter((p) => p.market === "us");
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: localizedPaths.home.en },
    { name: "Blog", path: localizedPaths.blog.en },
  ]);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aether Practice Blog",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://aetherpractice.com${postPath(post)}`,
      name: post.title,
    })),
  };

  return (
    <BlogShell language="en" languageLinks={blogIndexLanguages}>
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbLd} />
      <BlogIndexContent posts={posts} hubs={getAllHubs().filter((hub) => hub.lang === "en")} language="en" />
    </BlogShell>
  );
}
