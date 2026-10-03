import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Aether Practice | Couples Counseling Online in NYC & California",
  description:
    "Online couples counseling for partners in New York City, California, and Norway, focused on communication, trust, conflict, and shared understanding.",
  path: "/couples-therapy",
  languages: hreflangFor("couples"),
})

const serviceLd = serviceJsonLd({
  name: "Couples Therapy",
  description:
    "Online couples counseling for partners in New York City, California, and Norway, focused on communication, trust, conflict, and shared understanding.",
  path: "/couples-therapy",
  areaServed: ["New York City", "California", "Norway"],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  )
}
