import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import CouplesTherapyPage from "@/components/pages/couples-therapy-page"
import { JsonLd } from "@/components/json-ld"

const path = localizedPaths.couples.no
const description =
  "Parterapi på nett for par i Oslo og hele Norge, med fokus på kommunikasjon, tillit, konflikt og gjensidig forståelse."

export const metadata = pageMetadata({
  title: "Parterapi på nett for par i Norge",
  description,
  path,
  locale: "nb_NO",
  languages: hreflangFor("couples"),
})

const serviceLd = serviceJsonLd({
  name: "Parterapi",
  description,
  path,
  areaServed: ["Norge"],
  inLanguage: "nb",
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Parterapi", path },
])

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd} />
      <CouplesTherapyPage language="no" />
    </>
  )
}
