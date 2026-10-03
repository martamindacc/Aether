import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import IndividualTherapyPage from "@/components/pages/individual-therapy-page"

const path = localizedPaths.individual.no
const description =
  "Individuelle samtaler på nett for personer i Norge, med støtte ved stress, sorg, identitet, livsoverganger og personlig utvikling."

export const metadata = pageMetadata({
  title: "Individuell terapi på nett i Norge",
  description,
  path,
  locale: "nb_NO",
  languages: hreflangFor("individual"),
})

const serviceLd = serviceJsonLd({
  name: "Individuell terapi",
  description,
  path,
  areaServed: ["Norge"],
  inLanguage: "nb",
})

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Hjem", path: localizedPaths.home.no },
  { name: "Individuell terapi", path },
])

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <IndividualTherapyPage language="no" />
    </>
  )
}
