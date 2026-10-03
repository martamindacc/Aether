import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import FamilySupportPage from "@/components/pages/family-support-page"
import { JsonLd } from "@/components/json-ld"

const path = localizedPaths.family.no
const description =
  "Familiesamtaler på nett for familier i Norge, med fokus på tydeligere kommunikasjon, sterkere tilknytning og praktisk støtte."

export const metadata = pageMetadata({
  title: "Familieterapi på nett i Norge",
  description,
  path,
  locale: "nb_NO",
  languages: hreflangFor("family"),
})

const serviceLd = serviceJsonLd({
  name: "Familieterapi",
  description,
  path,
  areaServed: ["Norge"],
  inLanguage: "nb",
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Familieterapi", path },
])

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd} />
      <FamilySupportPage language="no" />
    </>
  )
}
