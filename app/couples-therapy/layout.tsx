import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Aether Practice | Couples Counseling Online in NYC & California",
  description:
    "Online couples counseling for partners in New York City, California, and Norway, focused on communication, trust, conflict, and shared understanding.",
  path: "/couples-therapy",
})

export default function CouplesTherapyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
