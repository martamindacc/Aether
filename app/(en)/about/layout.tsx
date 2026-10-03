import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Our Approach to Therapy & Coaching",
  description:
    "Learn about Aether Practice's thoughtful approach to individual, couples, family and executive sessions online.",
  path: "/about",
  languages: hreflangFor("about"),
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
])

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  )
}
