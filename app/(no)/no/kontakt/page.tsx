import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import ContactPage from "@/components/pages/contact-page"

export const metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Ta kontakt med Aether Practice for å stille et spørsmål eller avtale individuell terapi, parterapi, familiesamtale eller coaching på nett.",
  path: localizedPaths.contact.no,
  locale: "nb_NO",
  languages: hreflangFor("contact"),
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Kontakt", path: localizedPaths.contact.no },
])

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ContactPage language="no" />
    </>
  )
}
