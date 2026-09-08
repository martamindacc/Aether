import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aether Practice | Our Approach to Counseling & Coaching",
  description:
    "Learn about Aether Practice’s thoughtful approach to individual, couples, family, and executive sessions online.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
