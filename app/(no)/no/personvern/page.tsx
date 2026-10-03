import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import PrivacyPage from "@/components/pages/privacy-page"

export const metadata = pageMetadata({
  title: "Personvern",
  description:
    "Hvordan Aether Practice behandler opplysninger sendt inn via kontaktskjemaet, og hvordan informasjonskapsler og analyse brukes på nettstedet.",
  path: localizedPaths.privacy.no,
  locale: "nb_NO",
  languages: hreflangFor("privacy"),
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Personvern", path: localizedPaths.privacy.no },
])

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <PrivacyPage language="no" />
    </>
  )
}
