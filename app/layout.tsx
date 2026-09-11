import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { ConsentBanner } from '@/components/consent-banner'
import { GoogleAnalytics } from '@/components/google-analytics'
import { PRODUCTS } from '@/lib/products'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://aetherpractice.com'),
  alternates: {
    canonical: 'https://aetherpractice.com/',
    languages: {
      en: 'https://aetherpractice.com/',
      no: 'https://aetherpractice.com/online-therapy-norway',
      'x-default': 'https://aetherpractice.com/',
    },
  },
  title: 'Aether Practice | Online Counseling & Coaching in NYC & California',
  description:
    'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  openGraph: {
    type: 'website',
    siteName: 'Aether Practice',
    locale: 'en_US',
    url: 'https://aetherpractice.com/',
    title: 'Aether Practice | Online Counseling & Coaching in NYC & California',
    description:
      'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aether Practice | Online Counseling & Coaching in NYC & California',
    description:
      'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  },
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

const productPrices = PRODUCTS.map((product) => product.priceInCents / 100)
const priceRange = `$${Math.min(...productPrices)}-$${Math.max(...productPrices)}`

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://aetherpractice.com/#organization',
      name: 'Aether Practice',
      url: 'https://aetherpractice.com/',
      logo: 'https://aetherpractice.com/logo-a.svg',
      image: 'https://aetherpractice.com/logo-a.svg',
      sameAs: ['https://www.instagram.com/aetherpractice/'],
      description:
        'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
      areaServed: [
        { '@type': 'City', name: 'New York City' },
        { '@type': 'State', name: 'California' },
        { '@type': 'Country', name: 'Norway' },
      ],
      priceRange,
      makesOffer: PRODUCTS.map((product) => ({
        '@type': 'Offer',
        price: (product.priceInCents / 100).toFixed(2),
        priceCurrency: 'USD',
        itemOffered: {
          '@type': 'Service',
          name: product.name,
          description: product.description,
        },
      })),
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
