import type { Metadata } from "next";
import { BlogShell } from "@/components/blog-shell";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { BlogIndexContent } from "@/components/blog-index-content";

export const metadata: Metadata = pageMetadata({
  title: "Blog | Aether Practice",
  description:
    "Guides and perspectives from Aether Practice on relationships, parterapi, individual growth, family life, and working well under pressure.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aether Practice Blog",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://aetherpractice.com/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <BlogIndexContent posts={posts} />
    </BlogShell>
  );
}
