import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"
import { JsonLd } from "@/components/json-ld"

export const metadata = pageMetadata({
  title: "Executive & Founder Coaching Online",
  description:
    "Online coaching for executives and founders in New York City, California and Norway: pressure, decision-making, leadership and personal growth.",
  path: "/executive-founder-work",
  languages: hreflangFor("executive"),
})

const serviceLd = serviceJsonLd({
  name: "Executive & Founder Work",
  description:
    "Online executive and founder coaching for clients in New York City, California, and Norway, with thoughtful support for pressure, decision-making, leadership, and personal growth.",
  path: "/executive-founder-work",
  areaServed: ["New York City", "California", "Norway"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Executive & Founder Work", path: "/executive-founder-work" },
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
