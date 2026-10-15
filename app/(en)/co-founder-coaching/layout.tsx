import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

/**
 * English only for now, so no `languages` here: the page has no Norwegian
 * counterpart to point an hreflang pair at.
 */
export const metadata = pageMetadata({
  title: "Co-Founder Coaching for Founding Teams",
  description:
    "Online co-founder coaching for founding teams in New York City, California and Norway — on how the two of you decide, disagree and divide the weight.",
  path: "/co-founder-coaching",
})

const serviceLd = serviceJsonLd({
  name: "Co-Founder Session",
  description:
    "Online coaching sessions for co-founders in New York City, California, and Norway, focused on how founding partners decide, disagree and divide responsibility.",
  path: "/co-founder-coaching",
  areaServed: ["New York City", "California", "Norway"],
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
