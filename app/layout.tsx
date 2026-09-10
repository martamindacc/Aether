import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { ConsentBanner } from '@/components/consent-banner'
import { GoogleAnalytics } from '@/components/google-analytics'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://aetherpractice.com'),
  alternates: {
    canonical: 'https://aetherpractice.com/',
  },
  title: 'Aether Practice | Online Counseling & Coaching in NYC & California',
  description:
    'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo-a.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/logo-a.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://aetherpractice.com/#organization',
      name: 'Aether Practice',
      url: 'https://aetherpractice.com/',
      logo: 'https://aetherpractice.com/logo-a.svg',
      sameAs: ['https://www.instagram.com/aetherpractice/'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://aetherpractice.com/#website',
      url: 'https://aetherpractice.com/',
      name: 'Aether Practice',
      publisher: {
        '@id': 'https://aetherpractice.com/#organization',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {children}
        <ConsentBanner />
        <GoogleAnalytics />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
