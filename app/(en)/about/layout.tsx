import { pageMetadata } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Aether Practice | Our Approach to Counseling & Coaching",
  description:
    "Learn about Aether Practice’s thoughtful approach to individual, couples, family, and executive sessions online.",
  path: "/about",
  languages: hreflangFor("about"),
})

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
