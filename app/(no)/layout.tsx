import type { Metadata } from "next"
import { rootViewport, SiteRoot } from "@/components/site-root"
import { pageMetadata } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"

/** Norwegian site defaults; every page under /no overrides title and description through pageMetadata(). */
export const metadata: Metadata = {
  metadataBase: new URL("https://aetherpractice.com"),
  ...pageMetadata({
    title: "Terapi og coaching på nett i Norge | Aether Practice",
    description:
      "Private samtaler på nett for par, enkeltpersoner, familier, ledere og gründere i Oslo og hele Norge. Parterapi, individuell terapi, familieterapi og coaching.",
    path: localizedPaths.home.no,
    locale: "nb_NO",
    languages: hreflangFor("home"),
  }),
}
export const viewport = rootViewport

/** Root layout for the Norwegian site (/no and the Norway landing page). */
export default function NorwegianRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SiteRoot lang="nb">{children}</SiteRoot>
}
