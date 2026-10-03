import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Online Family Therapy in NYC & California",
  description:
    "Online family therapy sessions for families in New York City, California and Norway, focused on clearer communication and stronger connection.",
  path: "/family-support",
  languages: hreflangFor("family"),
})

const serviceLd = serviceJsonLd({
  name: "Family Support",
  description:
    "Online family support sessions for clients in New York City, California, and Norway, focused on clearer communication, stronger connection, and practical support.",
  path: "/family-support",
  areaServed: ["New York City", "California", "Norway"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Family Support", path: "/family-support" },
])

export default function FamilySupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  )
}
