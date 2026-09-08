import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aether Practice | Executive & Founder Coaching in NYC & California",
  description:
    "Online executive and founder coaching for clients in New York City, California, and Norway, with thoughtful support for pressure, decision-making, leadership, and personal growth.",
};

export default function ExecutiveFounderWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
