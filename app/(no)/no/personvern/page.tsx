import { pageMetadata } from "@/lib/seo"
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

export default function Page() {
  return <PrivacyPage language="no" />
}
