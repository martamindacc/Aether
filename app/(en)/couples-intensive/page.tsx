import { getAllPosts, type BlogPostMeta } from "@/lib/blog";
import CouplesIntensivePage from "@/components/pages/couples-intensive-page";

/** The blog band's posts, in order: for someone deciding whether to book. */
const bandSlugs = ["intensive-vs-weekly-couples-therapy", "two-day-couples-intensive-hour-by-hour", "how-to-prepare-couples-intensive"];

export default function Page() {
  const posts = getAllPosts();
  const blogPosts = bandSlugs
    .map((slug) => posts.find((post) => post.slug === slug && post.lang === "en"))
    .filter((post): post is BlogPostMeta => Boolean(post));
  return <CouplesIntensivePage language="en" blogPosts={blogPosts} />;
}
