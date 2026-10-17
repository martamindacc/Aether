import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

/**
 * English only for now, so no `languages` here: the page has no Norwegian
 * counterpart to point an hreflang pair at.
 */
export const metadata = pageMetadata({
  title: "Co-Founder Coaching: San Francisco, New York, Online",
  description:
    "Online co-founder coaching for founding teams in San Francisco, New York and Norway. Both founders in the room, working on how you decide and disagree. US$170 per session.",
  path: "/co-founder-coaching",
})

const serviceLd = serviceJsonLd({
  name: "Co-Founder Session",
  serviceType: "Co-founder coaching",
  description:
    "Online co-founder coaching sessions for founding teams in San Francisco, New York City, California and Norway, focused on how founding partners decide, disagree and divide responsibility. Sometimes called co-founder therapy; delivered as coaching for a working partnership.",
  path: "/co-founder-coaching",
  areaServed: ["San Francisco Bay Area", "New York City", "California", "Norway"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Co-Founder Session", path: "/co-founder-coaching" },
])

export default function CofounderLayout({
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
