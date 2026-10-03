import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import CouplesIntensivePage from "@/components/pages/couples-intensive-page"
import { JsonLd } from "@/components/json-ld"

const path = localizedPaths.intensive.no
const description =
  "To dagers parintensiv på nett for par i Oslo og hele Norge: tolv timer med fokusert arbeid for å bryte et fastlåst mønster."

export const metadata = pageMetadata({
  title: "Parintensiv: to dagers forløp på nett",
  description,
  path,
  locale: "nb_NO",
  languages: hreflangFor("intensive"),
})

const serviceLd = serviceJsonLd({
  name: "Parintensiv",
  serviceType: "Parterapi-intensiv",
  description,
  path,
  areaServed: ["Norge"],
  inLanguage: "nb",
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Parintensiv", path },
])

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd} />
      <CouplesIntensivePage language="no" />
    </>
  )
}
