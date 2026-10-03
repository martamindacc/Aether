import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Aether Practice to ask a question or arrange an individual, couples, family, or executive session online.",
  path: "/contact",
  languages: hreflangFor("contact"),
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
])

export default function ContactLayout({
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
