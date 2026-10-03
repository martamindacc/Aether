import { pageMetadata } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import AboutPage from "@/components/pages/about-page"

export const metadata = pageMetadata({
  title: "Vår tilnærming til terapi og coaching | Aether Practice",
  description:
    "Les om Aether Practice sin tilnærming til individuell terapi, parterapi, familieterapi og coaching for ledere – alt på nett.",
  path: localizedPaths.about.no,
  locale: "nb_NO",
  languages: hreflangFor("about"),
})

export default function Page() {
  return <AboutPage language="no" />
}
