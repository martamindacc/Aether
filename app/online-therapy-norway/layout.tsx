import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aether Practice | Online Therapy & Coaching in Norway",
  description:
    "Online counseling and coaching sessions for individuals, couples, and families in Norway, focused on communication, trust, and shared understanding.",
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
