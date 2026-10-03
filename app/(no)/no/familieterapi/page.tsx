import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import FamilySupportPage from "@/components/pages/family-support-page"

const path = localizedPaths.family.no
const description =
  "Familiesamtaler på nett for familier i Norge, med fokus på tydeligere kommunikasjon, sterkere tilknytning og praktisk støtte."

export const metadata = pageMetadata({
  title: "Familieterapi på nett i Norge | Aether Practice",
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
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Familieterapi", path },
])

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <FamilySupportPage language="no" />
    </>
  )
}
