import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import AboutPage from "@/components/pages/about-page"

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <AboutPage language="no" />
    </>
  )
}
