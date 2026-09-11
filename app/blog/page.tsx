import Link from "next/link";
import { BlogShell } from "@/components/blog-shell";
import { getAllPosts } from "@/lib/blog";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <BlogShell>
      <section className="mx-auto flex max-w-6xl flex-col px-6 pb-24 pt-48">
        <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#74382f] sm:text-8xl">
          Blog
        </h1>
        <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#383838] sm:text-2xl">
          Notes on relationships, individual growth, family life, and working well under pressure — from the Aether Practice team.
        </p>

        <div className="mt-20 flex flex-col gap-6">
          {posts.length === 0 && (
            <p className="font-[Roboto,Arial,sans-serif] text-lg text-[#383838]">
              New posts are on the way — check back soon.
            </p>
          )}
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-zinc-300/80 bg-gradient-to-br from-[#eee2db]/40 to-[#eee2db]/20 p-8 transition-colors hover:from-[#eee2db]/60 hover:to-[#eee2db]/30 sm:p-10"
            >
              <p className="font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-zinc-500">
                {formatDate(post.date)}
              </p>
              <h2 className="mt-3 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-2xl font-medium tracking-tight text-zinc-900 group-hover:underline sm:text-3xl">
                {post.title}
              </h2>
              <p
                className={`mt-4 max-w-3xl font-[Roboto,Arial,sans-serif] text-[17px] leading-[1.5] text-[#383838] ${
                  index === 0 ? "line-clamp-3" : ""
                }`}
              >
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </BlogShell>
  );
}
