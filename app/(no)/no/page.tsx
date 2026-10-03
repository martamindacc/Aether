import { pageMetadata } from "@/lib/seo"
import { hreflangFor, localizedPaths } from "@/lib/locale-routes"
import { getAllPosts } from "@/lib/blog"
import HomeClient from "@/components/home-client"

export const metadata = pageMetadata({
  title: "Terapi og coaching på nett i Norge",
  description:
    "Private samtaler på nett for par, enkeltpersoner, familier, ledere og gründere i Oslo og hele Norge: parterapi, individuell terapi og coaching.",
  path: localizedPaths.home.no,
  locale: "nb_NO",
  languages: hreflangFor("home"),
})

export default function Page() {
  const posts = getAllPosts()
  return <HomeClient posts={posts} language="no" />
}
