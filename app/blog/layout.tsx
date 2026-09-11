import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Aether Practice | Blog — Relationships, Growth & Wellbeing",
  description:
    "Insights on couples, individual, and family therapy, plus executive and founder wellbeing, from the Aether Practice team.",
  path: "/blog",
})

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
