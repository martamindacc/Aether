import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aether Practice | Online Couples Counseling in New York City",
  description:
    "Online couples sessions for partners in New York City, focused on communication, trust, conflict, and shared understanding.",
  alternates: {
    canonical: "https://aetherpractice.com/couples-therapy-new-york-city",
  },
}

export default function CouplesTherapyNewYorkCityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
