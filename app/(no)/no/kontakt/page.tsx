import { pageMetadata } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import ContactPage from "@/components/pages/contact-page"

export const metadata = pageMetadata({
  title: "Kontakt | Aether Practice",
  description:
    "Ta kontakt med Aether Practice for å stille et spørsmål eller avtale individuell terapi, parterapi, familiesamtale eller coaching på nett.",
  path: localizedPaths.contact.no,
  locale: "nb_NO",
  languages: hreflangFor("contact"),
})

export default function Page() {
  return <ContactPage language="no" />
}
