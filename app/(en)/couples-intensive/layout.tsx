import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"
import { JsonLd } from "@/components/json-ld"

export const metadata = pageMetadata({
  title: "Couples Intensive: Two-Day Online Program",
  description:
    "A two-day online couples intensive for partners in New York City, California and Norway: twelve hours of focused work to break a stuck pattern.",
  path: "/couples-intensive",
  languages: hreflangFor("intensive"),
})

const serviceLd = serviceJsonLd({
  name: "Couples Intensive",
  serviceType: "Couples therapy intensive",
  description:
    "A two-day online couples intensive: twelve hours of focused work across two consecutive days, with preparation and a follow-up session.",
  path: "/couples-intensive",
  areaServed: ["New York City", "California", "Norway"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Couples Intensive", path: "/couples-intensive" },
])

export default function CouplesIntensiveLayout({
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
