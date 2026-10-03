import { rootMetadata, rootViewport, SiteRoot } from "@/components/site-root"

export const metadata = rootMetadata
export const viewport = rootViewport

/** Root layout for the English site (every URL outside /no). */
export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SiteRoot lang="en">{children}</SiteRoot>
}
