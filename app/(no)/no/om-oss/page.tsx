import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import AboutPage from "@/components/pages/about-page"
import { JsonLd } from "@/components/json-ld"

export const metadata = pageMetadata({
  title: "Vår tilnærming til terapi og coaching",
  description:
    "Les om Aether Practice sin tilnærming til individuell terapi, parterapi, familieterapi og coaching for ledere – alt på nett.",
  path: localizedPaths.about.no,
  locale: "nb_NO",
  languages: hreflangFor("about"),
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Om oss", path: localizedPaths.about.no },
])

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <AboutPage language="no" />
    </>
  )
}
