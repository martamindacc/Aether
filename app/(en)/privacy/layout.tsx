import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Aether Practice handles information submitted through the contact form, and how cookies and analytics are used on this website.",
  path: "/privacy",
  languages: hreflangFor("privacy"),
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
])

export default function PrivacyLayout({
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
