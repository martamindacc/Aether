import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { preload } from 'react-dom'
import { ConsentBanner } from '@/components/consent-banner'
import { GoogleAnalytics } from '@/components/google-analytics'
import { JsonLd } from '@/components/json-ld'
import { ANALYTICS_REQUIRE_CONSENT } from '@/lib/analytics-config'
import { productsFor } from '@/lib/products'
import { OG_IMAGE_ALT, TITLE_TEMPLATE } from '@/lib/seo'
import '../app/globals.css'

/**
 * Site-wide metadata defaults, exported by the English root layout. The
 * Norwegian root layout sets its own; every page overrides title and
 * description through pageMetadata().
 */
const HOME_TITLE = TITLE_TEMPLATE.replace('%s', 'Online Couples & Individual Therapy')
// Set explicitly: the English home page has no pageMetadata() call, so without it the page shares with no image.
const HOME_IMAGE = { url: '/opengraph-image?v=2', width: 1200, height: 630, alt: OG_IMAGE_ALT }

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
    default: HOME_TITLE,
    template: TITLE_TEMPLATE,
  },
  description:
    'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, the San Francisco Bay Area, and Norway.',
  openGraph: {
    type: 'website',
    siteName: 'Aether Practice',
    locale: 'en_US',
    url: 'https://aetherpractice.com/',
    title: HOME_TITLE,
    description:
      'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, the San Francisco Bay Area, and Norway.',
    images: [HOME_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description:
      'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, the San Francisco Bay Area, and Norway.',
    images: [{ url: HOME_IMAGE.url, alt: HOME_IMAGE.alt }],
  },
}

export const rootViewport: Viewport = {
  // The design is light only; native controls and the browser chrome should match.
  colorScheme: 'light',
  themeColor: '#FBF8F5',
}

/** Organization + WebSite schema. Offers are priced in USD for the English site and NOK for the Norwegian one. */
function organizationJsonLd(lang: 'en' | 'nb') {
  const nok = lang === 'nb'
  const offered = productsFor(nok ? 'no' : 'en')
  const prices = offered.map((product) => (nok ? product.priceInNok : product.priceInCents / 100))
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
        'Online counseling & coaching for couples, individuals, families, executives, and founders in New York City, the San Francisco Bay Area, and Norway.',
      areaServed: [
        { '@type': 'City', name: 'New York City' },
        { '@type': 'Place', name: 'San Francisco Bay Area' },
        { '@type': 'Country', name: 'Norway' },
      ],
      priceRange,
      makesOffer: offered.map((product) => ({
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
