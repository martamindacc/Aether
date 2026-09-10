import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Aether Practice | Family Support Sessions Online in NYC & California",
  description:
    "Online family support sessions for clients in New York City, California, and Norway, focused on clearer communication, stronger connection, and practical support.",
  path: "/family-support",
})

export default function FamilySupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
