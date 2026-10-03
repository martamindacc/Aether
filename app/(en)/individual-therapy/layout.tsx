import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Individual Therapy in NYC & California",
  description:
    "Online individual therapy for clients in New York City, California and Norway: support for stress, grief, identity, life transitions and growth.",
  path: "/individual-therapy",
  languages: hreflangFor("individual"),
})

const serviceLd = serviceJsonLd({
  name: "Individual Therapy",
  description:
    "Online individual sessions for clients in New York City, California, and Norway, with thoughtful support for stress, grief, identity, life transitions, and personal growth.",
  path: "/individual-therapy",
  areaServed: ["New York City", "California", "Norway"],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  )
}
