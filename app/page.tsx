import { getAllPosts } from "@/lib/blog";
import HomeClient from "@/components/home-client";

export default function Page() {
  const posts = getAllPosts();
  return <HomeClient posts={posts} />;
}
