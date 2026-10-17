import { getAllPosts, type BlogPostMeta } from "@/lib/blog";
import CouplesTherapyPage from "@/components/pages/couples-therapy-page";

/** The blog band's posts, in order: for someone deciding whether to book. */
const bandSlugs = ["couples-therapy-guide", "8-signs-need-couples-therapy", "how-many-sessions-couples-therapy"];

export default function Page() {
  const posts = getAllPosts();
  const blogPosts = bandSlugs
    .map((slug) => posts.find((post) => post.slug === slug && post.lang === "en"))
    .filter((post): post is BlogPostMeta => Boolean(post));
  return <CouplesTherapyPage language="en" blogPosts={blogPosts} />;
}
