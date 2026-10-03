import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { nycCouplesFaq } from "./faq-data"

export const metadata = pageMetadata({
  title: "Couples Therapy in New York City, Online",
  description:
    "Online couples sessions for partners in New York City, focused on communication, trust, conflict, and shared understanding.",
  path: "/couples-therapy-new-york-city",
})

const serviceLd = serviceJsonLd({
  name: "Couples Therapy in New York City",
  description:
    "Online couples sessions for partners in New York City, focused on communication, trust, conflict, and shared understanding.",
  path: "/couples-therapy-new-york-city",
  areaServed: ["New York City"],
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Couples Therapy", path: "/couples-therapy" },
  { name: "New York City", path: "/couples-therapy-new-york-city" },
])

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: nycCouplesFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function CouplesTherapyNewYorkCityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
