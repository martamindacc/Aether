import { pageMetadata } from "@/lib/seo"
import { hreflangFor } from "@/lib/locale-routes"

export const metadata = pageMetadata({
  title: "Aether Practice | Privacy Policy",
  description:
    "How Aether Practice handles information submitted through the contact form, and how cookies and analytics are used on this website.",
  path: "/privacy",
  languages: hreflangFor("privacy"),
})

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
