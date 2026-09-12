import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Aether Practice | Executive & Founder Coaching in NYC & California",
  description:
    "Online executive and founder coaching for clients in New York City, California, and Norway, with thoughtful support for pressure, decision-making, leadership, and personal growth.",
  path: "/executive-founder-work",
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
