import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"
import { JsonLd } from "@/components/json-ld"

export const metadata = pageMetadata({
  title: "Founder & Executive Coaching Online",
  description:
    "Online coaching for executives and founders in New York City, San Francisco and Norway: pressure, decision-making, leadership and personal growth.",
  path: "/executive-founder-work",
  languages: hreflangFor("executive"),
})

const serviceLd = serviceJsonLd({
  name: "Founder & Executive Work",
  description:
    "Online founder and executive coaching for clients in New York City, the San Francisco Bay Area, and Norway, with thoughtful support for pressure, decision-making, leadership, and personal growth.",
  path: "/executive-founder-work",
  areaServed: ["New York City", "San Francisco Bay Area", "Norway"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Founder & Executive Work", path: "/executive-founder-work" },
])

export default function ExecutiveFounderWorkLayout({
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
