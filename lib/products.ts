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
}

// This is the source of truth for all bookable sessions.
// All UI to display sessions should pull from this array.
// Stable ids; the booking modal and analytics events refer to products by these.
// Ordered for display in the booking flow (Couples Session first).

/** Price label for the booking flow: "$170" on English pages, "1 700 kr" on Norwegian ones. */
export function formatPrice(product: Product, lang: "en" | "no"): string | null {
  if (product.priceInCents <= 0) return null
  if (lang === "no") return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(product.priceInNok)
  return `${(product.priceInCents / 100).toFixed(0)}`
}
export const PRODUCTS: Product[] = [
  {
    id: "couples-session",
    name: "Couples Session",
    description: "A 60 minute session for two.",
    duration: "60 min",
    priceInCents: 17000,
    priceInNok: 1700,
    calendlyUrl: "https://calendly.com/martamindacc/couples-session",
  },
  {
    id: "individual-session",
    name: "Individual Session",
    description: "A 50 minute one-on-one session.",
    duration: "50 min",
    priceInCents: 13000,
    priceInNok: 1300,
    calendlyUrl: "https://calendly.com/martamindacc/individual-session",
  },
  {
    id: "family-session",
    name: "Family Session",
    description: "A 60 minute session for families.",
    duration: "60 min",
    priceInCents: 20000,
    priceInNok: 2000,
    calendlyUrl: "https://calendly.com/martamindacc/family-session",
  },
  {
    id: "founder-session",
    name: "Exec&Founder Session",
    description: "A 50 minute session for founders and executives.",
    duration: "50 min",
    priceInCents: 13000,
    priceInNok: 1300,
    calendlyUrl: "https://calendly.com/martamindacc/exec-founder-session",
  },
  {
    id: "couples-intensive",
    name: "Couples Intensive",
    description: "A two-day online intensive for couples: twelve hours of focused work across two consecutive days.",
    duration: "2 days",
    priceInCents: 350000,
    priceInNok: 35000,
    calendlyUrl: "https://calendly.com/martamindacc/couples-intensive",
  },
  {
    id: "initial-consultation",
    name: "Initial Consultation",
    description: "A free 15 minute introductory call.",
    duration: "15 min",
    priceInCents: 0,
    priceInNok: 0,
    calendlyUrl: "https://calendly.com/martamindacc/initial-consultation",
  },
]
