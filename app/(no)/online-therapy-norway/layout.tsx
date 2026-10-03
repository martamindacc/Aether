import { pageMetadata } from "@/lib/seo"
import { norwayFaq } from "./faq-data"

export const metadata = pageMetadata({
  title: "Online terapi og coaching i Norge | Aether Practice",
  description:
    "Online terapi, parterapi og coaching for enkeltpersoner, par, familier, ledere og gründere i Norge. Fokus på kommunikasjon, relasjoner og utvikling.",
  path: "/online-therapy-norway",
  locale: "nb_NO",
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
