import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Aether Practice | Online terapi og coaching i Norge",
  description:
    "Online terapi, parterapi og coaching for enkeltpersoner, par, familier, ledere og gründere i Norge. Samtaler med fokus på kommunikasjon, relasjoner og personlig utvikling.",
  path: "/online-therapy-norway",
  locale: "nb_NO",
})

export default function OnlineTherapyNorwayLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
