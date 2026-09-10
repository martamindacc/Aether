import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Aether Practice | Privacy Policy",
  description:
    "How Aether Practice handles information submitted through the contact form, and how cookies and analytics are used on this website.",
  path: "/privacy",
})

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
