import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { preload } from 'react-dom'
import { ConsentBanner } from '@/components/consent-banner'
import { GoogleAnalytics } from '@/components/google-analytics'
import { JsonLd } from '@/components/json-ld'
import { ANALYTICS_REQUIRE_CONSENT } from '@/lib/analytics-config'
import { PRODUCTS } from '@/lib/products'
import { TITLE_TEMPLATE } from '@/lib/seo'
import '../app/globals.css'

/**
 * Site-wide metadata defaults, exported by the English root layout. The
 * Norwegian root layout sets its own; every page overrides title and
 * description through pageMetadata().
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL('https://aetherpractice.com'),
  alternates: {
    canonical: 'https://aetherpractice.com/',
    languages: {
      en: 'https://aetherpractice.com/',
      no: 'https://aetherpractice.com/no',
      'x-default': 'https://aetherpractice.com/',
    },
  },
  title: {
    default: 'Aether Practice | Online Couples & Individual Therapy',
    template: TITLE_TEMPLATE,
  },
  description:
    'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  openGraph: {
    type: 'website',
    siteName: 'Aether Practice',
    locale: 'en_US',
    url: 'https://aetherpractice.com/',
    title: 'Aether Practice | Online Couples & Individual Therapy',
    description:
      'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aether Practice | Online Couples & Individual Therapy',
    description:
      'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, California, and Norway.',
  },
}

export const rootViewport: Viewport = {
  // The design is light only; native controls and the browser chrome should match.
  colorScheme: 'light',
  themeColor: '#fafafb',
}

/** Organization + WebSite schema. Offers are priced in USD for the English site and NOK for the Norwegian one. */
function organizationJsonLd(lang: 'en' | 'nb') {
  const nok = lang === 'nb'
  const prices = PRODUCTS.map((product) => (nok ? product.priceInNok : product.priceInCents / 100))
  const paid = prices.filter((price) => price > 0)
  const priceRange = nok ? `${Math.min(...paid)}-${Math.max(...paid)} NOK` : `\$${Math.min(...paid)}-\$${Math.max(...paid)}`
  return {
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
        price: nok ? product.priceInNok.toFixed(2) : (product.priceInCents / 100).toFixed(2),
        priceCurrency: nok ? 'NOK' : 'USD',
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
}

/**
 * The <html> and <body> shell shared by both root layouts. Each route group
 * (English at the root, Norwegian under /no) renders it with its own lang,
 * so the language is fixed per URL and every page can be prerendered.
 */
export function SiteRoot({
  lang,
  children,
}: Readonly<{
  lang: 'en' | 'nb'
  children: React.ReactNode
}>) {
  // The two faces every page renders with; preloading them removes the font swap on first paint.
  for (const font of ['/fonts/NeueHaasDisplayRoman.ttf', '/fonts/Roboto-VariableFont.ttf']) {
    preload(font, { as: 'font', type: 'font/ttf', crossOrigin: 'anonymous' })
  }
  return (
    <html lang={lang}>
      <body className="overflow-x-hidden antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-zinc-900/20 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900"
        >
          {lang === 'nb' ? 'Hopp til innhold' : 'Skip to content'}
        </a>
        <JsonLd data={organizationJsonLd(lang)} />
        {children}
        {ANALYTICS_REQUIRE_CONSENT && <ConsentBanner />}
        <GoogleAnalytics />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
