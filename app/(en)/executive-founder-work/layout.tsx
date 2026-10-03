import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Executive & Founder Coaching Online | Aether Practice",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  )
}
