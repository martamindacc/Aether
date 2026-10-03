import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { localizedPaths } from "@/lib/locale-routes"
import { norwayFaq } from "./faq-data"
import { JsonLd } from "@/components/json-ld"

export const metadata = pageMetadata({
  title: "Online terapi og coaching i Norge",
  description:
    "Online terapi, parterapi og coaching for enkeltpersoner, par, familier, ledere og gründere i Norge. Fokus på kommunikasjon, relasjoner og utvikling.",
  path: "/online-therapy-norway",
  locale: "nb_NO",
})

const serviceLd = serviceJsonLd({
  name: "Online terapi og coaching i Norge",
  serviceType: "Terapi og coaching på nett",
  description:
    "Online terapi, parterapi og coaching for enkeltpersoner, par, familier, ledere og gründere i Norge.",
  path: "/online-therapy-norway",
  areaServed: ["Norge"],
  inLanguage: "nb",
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Online terapi i Norge", path: "/online-therapy-norway" },
])

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  // "no" matches the default server-rendered language on this page.
  mainEntity: norwayFaq.no.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function OnlineTherapyNorwayLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  )
}
