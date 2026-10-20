import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import ExecutiveFounderWorkPage from "@/components/pages/executive-founder-work-page"
import { JsonLd } from "@/components/json-ld"

const path = localizedPaths.executive.no
const description =
  "Coaching på nett for ledere og gründere i Norge, med støtte ved press, beslutninger, lederskap og personlig utvikling."

export const metadata = pageMetadata({
  title: "Coaching for gründere og ledere i Norge",
  description,
  path,
  locale: "nb_NO",
  languages: hreflangFor("executive"),
})

const serviceLd = serviceJsonLd({
  name: "Gründer- og ledercoaching",
  description,
  path,
  areaServed: ["Norge"],
  inLanguage: "nb",
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Grunnlegger- og Lederarbeid", path },
])

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={breadcrumbLd} />
      <ExecutiveFounderWorkPage language="no" />
    </>
  )
}
