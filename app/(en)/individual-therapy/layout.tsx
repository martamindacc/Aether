import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"
import { JsonLd } from "@/components/json-ld"

export const metadata = pageMetadata({
  title: "Individual Therapy in NYC & San Francisco",
  description:
    "Online individual therapy for clients in New York City, San Francisco and Norway: support for stress, grief, identity, life transitions and growth.",
  path: "/individual-therapy",
  languages: hreflangFor("individual"),
})

const serviceLd = serviceJsonLd({
  name: "Individual Therapy",
  description:
    "Online individual sessions for clients in New York City, the San Francisco Bay Area, and Norway, with thoughtful support for stress, grief, identity, life transitions, and personal growth.",
  path: "/individual-therapy",
  areaServed: ["New York City", "San Francisco Bay Area", "Norway"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Individual Therapy", path: "/individual-therapy" },
])

export default function IndividualTherapyLayout({
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
