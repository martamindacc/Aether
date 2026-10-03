import { pageMetadata } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Aether Practice | Contact",
  description:
    "Get in touch with Aether Practice to ask a question or arrange an individual, couples, family, or executive session online.",
  path: "/contact",
  languages: hreflangFor("contact"),
})

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
