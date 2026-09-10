import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Aether Practice | Online Couples Counseling in New York City",
  description:
    "Online couples sessions for partners in New York City, focused on communication, trust, conflict, and shared understanding.",
  path: "/couples-therapy-new-york-city",
})

export default function CouplesTherapyNewYorkCityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
