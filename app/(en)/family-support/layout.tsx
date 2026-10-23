import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"
import { JsonLd } from "@/components/json-ld"

export const metadata = pageMetadata({
  title: "Online Family Therapy in NYC & San Francisco",
  description:
    "Online family therapy sessions for families in New York City, San Francisco and Norway, focused on clearer communication and stronger connection.",
  path: "/family-support",
  languages: hreflangFor("family"),
})

const serviceLd = serviceJsonLd({
  name: "Family Support",
  description:
    "Online family support sessions for clients in New York City, the San Francisco Bay Area, and Norway, focused on clearer communication, stronger connection, and practical support.",
  path: "/family-support",
  areaServed: ["New York City", "San Francisco Bay Area", "Norway"],
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
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd} />
      {children}
    </>
  )
}
