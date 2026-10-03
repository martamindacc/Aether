import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"
import { JsonLd } from "@/components/json-ld"

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
      <JsonLd data={breadcrumbLd} />
      {children}
    </>
  )
}
