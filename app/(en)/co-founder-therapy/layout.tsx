import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

/**
 * English only for now, so no `languages` here: the page has no Norwegian
 * counterpart to point an hreflang pair at.
 */
export const metadata = pageMetadata({
  title: "Co-Founder Therapy & Sessions for Founding Teams",
  description:
    "Online co-founder sessions for founding teams in New York City, California and Norway — on how the two of you decide, disagree and divide the weight.",
  path: "/co-founder-therapy",
})

const serviceLd = serviceJsonLd({
  name: "Co-Founder Session",
  description:
    "Online sessions for co-founders in New York City, California, and Norway, focused on how founding partners decide, disagree and divide responsibility.",
  path: "/co-founder-therapy",
  areaServed: ["New York City", "California", "Norway"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Co-Founder Session", path: "/co-founder-therapy" },
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
