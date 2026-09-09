import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aether Practice | Online terapi og coaching i Norge",
  description:
    "Online terapi, parterapi og coaching for enkeltpersoner, par, familier, ledere og gründere i Norge. Samtaler med fokus på kommunikasjon, relasjoner og personlig utvikling.",
  alternates: {
    canonical: "https://aetherpractice.com/online-therapy-norway",
  },
}

export default function OnlineTherapyNorwayLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
