import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { ConsentBanner } from '@/components/consent-banner'
import { GoogleAnalytics } from '@/components/google-analytics'
import { ANALYTICS_REQUIRE_CONSENT } from '@/lib/analytics-config'
import { PRODUCTS } from '@/lib/products'
import { getPostBySlug, htmlLangFor } from '@/lib/blog'
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
  title: 'Aether Practice | Cognitive Wellbeing',
  description:
    'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  openGraph: {
    type: 'website',
    siteName: 'Aether Practice',
    locale: 'en_US',
    url: 'https://aetherpractice.com/',
    title: 'Aether Practice | Cognitive Wellbeing',
    description:
      'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aether Practice | Cognitive Wellbeing',
    description:
      'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  },
  icons: {
    icon: [
      {
        url: '/icon',
        type: 'image/png',
        sizes: '64x64',
      },
    ],
    shortcut: '/icon',
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = (await headers()).get('x-pathname') ?? ''
  const blogSlug = pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1]
  const blogPost = blogSlug ? getPostBySlug(blogSlug) : null
  const htmlLang = blogPost ? htmlLangFor(blogPost.lang) : 'en'

  return (
    <html lang={htmlLang}>
      <body className="overflow-x-hidden antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {children}
        {ANALYTICS_REQUIRE_CONSENT && <ConsentBanner />}
        <GoogleAnalytics />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
