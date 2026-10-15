export interface Product {
  id: string
  name: string
  description: string
  duration: string
  /** Price in US cents, shown on English pages and in the English schema. */
  priceInCents: number
  /** Price in whole Norwegian kroner, shown on Norwegian pages and in the Norwegian schema. */
  priceInNok: number
  calendlyUrl: string
  /**
   * Which language's booking flow and schema this session appears in.
   * Omitted means both. Family is Norwegian-only and Co-Founder English-only,
   * because each is offered in one market.
   */
  locales?: ("en" | "no")[]
}

/**
 * The Norwegian home page lists its service slabs in a different order than the
 * English one — individual and family work come before leadership work — so the
 * booking flow follows whichever page the reader arrived from.
 */
const NORWEGIAN_ORDER = [
  "couples-session",
  "couples-intensive",
  "individual-session",
  "family-session",
  "founder-session",
  "initial-consultation",
]

/** The sessions bookable in a given language, ordered as that home page lists them. */
export function productsFor(lang: "en" | "no"): Product[] {
  const offered = PRODUCTS.filter((product) => !product.locales || product.locales.includes(lang))
  // PRODUCTS is already in English slab order, so only Norwegian needs resorting.
  if (lang === "en") return offered
  // A session missing from the list sorts to the end rather than the front, so
  // adding one to PRODUCTS can never silently push it above Couples Session.
  const rank = (id: string) => {
    const index = NORWEGIAN_ORDER.indexOf(id)
    return index === -1 ? NORWEGIAN_ORDER.length : index
  }
  return [...offered].sort((a, b) => rank(a.id) - rank(b.id))
}

// This is the source of truth for all bookable sessions.
// All UI to display sessions should pull from this array.
// Stable ids; the booking modal and analytics events refer to products by these.
// Ordered for display in the booking flow, matching the service slabs on the
// English home page: couples first, individual last, free consultation after.

/** Price label for the booking flow: "$170" on English pages, "1 700 kr" on Norwegian ones. */
export function formatPrice(product: Product, lang: "en" | "no"): string | null {
  if (product.priceInCents <= 0) return null
  if (lang === "no") return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(product.priceInNok)
  return `$${(product.priceInCents / 100).toFixed(0)}`
}
export const PRODUCTS: Product[] = [
  {
    id: "couples-session",
    name: "Couples Session",
    description: "A 60 minute session for two.",
    duration: "60 min",
    priceInCents: 17000,
    priceInNok: 1700,
    calendlyUrl: "https://cal.com/aetherpractice/couples-session",
  },
  {
    id: "couples-intensive",
    name: "Couples Intensive",
    description: "A two-day online intensive for couples: twelve hours of focused work across two consecutive days.",
    duration: "2 days",
    priceInCents: 350000,
    priceInNok: 35000,
    calendlyUrl: "https://cal.com/aetherpractice/couples-intensive-inquiry",
  },
  {
    id: "cofounder-session",
    name: "Co-Founder Session",
    description: "A 60 minute session for two co-founders.",
    duration: "60 min",
    priceInCents: 17000,
    priceInNok: 1700,
    calendlyUrl: "https://cal.com/aetherpractice/co-founder-session",
    locales: ["en"],
  },
  {
    id: "founder-session",
    name: "Exec&Founder Session",
    description: "A 50 minute session for founders and executives.",
    duration: "50 min",
    priceInCents: 13000,
    priceInNok: 1300,
    calendlyUrl: "https://cal.com/aetherpractice/exec-founder-session",
  },
  {
    id: "individual-session",
    name: "Individual Session",
    description: "A 50 minute one-on-one session.",
    duration: "50 min",
    priceInCents: 13000,
    priceInNok: 1300,
    calendlyUrl: "https://cal.com/aetherpractice/individual-session",
  },
  {
    id: "family-session",
    name: "Family Session",
    description: "A 60 minute session for families.",
    duration: "60 min",
    priceInCents: 20000,
    priceInNok: 2000,
    calendlyUrl: "https://cal.com/aetherpractice/family-session",
    locales: ["no"],
  },
  {
    id: "initial-consultation",
    name: "Initial Consultation",
    description: "A free 15 minute introductory call.",
    duration: "15 min",
    priceInCents: 0,
    priceInNok: 0,
    calendlyUrl: "https://cal.com/aetherpractice/initial-consultation",
  },
]
