import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { BlogPost, postMetadata } from "@/components/blog-post";
import { pickRelatedPosts } from "@/components/related-posts";

/** Only Norwegian posts live under /no/blog; English posts live under /blog. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => post.lang === "no" && post.kind === "post")
    .map((post) => ({ slug: post.slug }));
}

function loadPost(slug: string) {
  const post = getPostBySlug(slug);
  if (!post || post.lang !== "no" || post.kind !== "post") notFound();
  return post;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return postMetadata(loadPost(slug));
}

export default async function NorwegianBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = loadPost(slug);
  return <BlogPost post={post} related={pickRelatedPosts(post, getAllPosts())} />;
}
