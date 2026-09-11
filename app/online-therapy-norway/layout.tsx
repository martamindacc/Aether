import { pageMetadata } from "@/lib/seo"
import { norwayFaq } from "./faq-data"

export const metadata = pageMetadata({
  title: "Aether Practice | Online terapi og coaching i Norge",
  description:
    "Online terapi, parterapi og coaching for enkeltpersoner, par, familier, ledere og gründere i Norge. Samtaler med fokus på kommunikasjon, relasjoner og personlig utvikling.",
  path: "/online-therapy-norway",
  locale: "nb_NO",
  languages: {
    en: "/",
    no: "/online-therapy-norway",
    "x-default": "/",
  },
})

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
