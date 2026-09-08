import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aether Practice | Couples Counseling Online in NYC & California",
  description:
    "Online couples counseling for partners in New York City, California, and Norway, focused on communication, trust, conflict, and shared understanding.",
}

export default function CouplesTherapyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
