import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"
import { JsonLd } from "@/components/json-ld"

export const metadata = pageMetadata({
  title: "Online Couples Therapy in NYC & San Francisco",
  description:
    "Online couples therapy for partners in New York City, San Francisco and Norway, focused on communication, trust, conflict and shared understanding.",
  path: "/couples-therapy",
  languages: hreflangFor("couples"),
})

const serviceLd = serviceJsonLd({
  name: "Couples Therapy",
  description:
    "Online couples counseling for partners in New York City, the San Francisco Bay Area, and Norway, focused on communication, trust, conflict, and shared understanding.",
  path: "/couples-therapy",
  areaServed: ["New York City", "San Francisco Bay Area", "Norway"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Couples Therapy", path: "/couples-therapy" },
])

export default function CouplesTherapyLayout({
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
