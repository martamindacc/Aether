import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aether Practice | Individual Sessions Online in NYC & California",
  description:
    "Online individual sessions for clients in New York City, California, and Norway, with thoughtful support for stress, grief, identity, life transitions, and personal growth.",
  alternates: {
    canonical: "https://aetherpractice.com/individual-therapy",
  },
};

export default function IndividualTherapyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
