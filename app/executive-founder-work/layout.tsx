import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Aether Practice | Executive & Founder Coaching in NYC & California",
  description:
    "Online executive and founder coaching for clients in New York City, California, and Norway, with thoughtful support for pressure, decision-making, leadership, and personal growth.",
  path: "/executive-founder-work",
})

export default function ExecutiveFounderWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
