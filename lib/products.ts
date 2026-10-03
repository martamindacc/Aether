export interface Product {
  id: string
  name: string
  description: string
  duration: string
  priceInCents: number
  calendlyUrl: string
}

// This is the source of truth for all bookable sessions.
// All UI to display sessions should pull from this array.
// Stable ids; the booking modal and analytics events refer to products by these.
// Ordered for display in the booking flow (Couples Session first).
export const PRODUCTS: Product[] = [
  {
    id: "couples-session",
    name: "Couples Session",
    description: "A 60 minute session for two.",
    duration: "60 min",
    priceInCents: 17000,
    calendlyUrl: "https://calendly.com/martamindacc/couples-session",
  },
  {
    id: "individual-session",
    name: "Individual Session",
    description: "A 50 minute one-on-one session.",
    duration: "50 min",
    priceInCents: 13000,
    calendlyUrl: "https://calendly.com/martamindacc/individual-session",
  },
  {
    id: "family-session",
    name: "Family Session",
    description: "A 60 minute session for families.",
    duration: "60 min",
    priceInCents: 20000,
    calendlyUrl: "https://calendly.com/martamindacc/family-session",
  },
  {
    id: "founder-session",
    name: "Exec&Founder Session",
    description: "A 50 minute session for founders and executives.",
    duration: "50 min",
    priceInCents: 13000,
    calendlyUrl: "https://calendly.com/martamindacc/exec-founder-session",
  },
  {
    id: "couples-intensive",
    name: "Couples Intensive",
    description: "A two-day online intensive for couples: twelve hours of focused work across two consecutive days.",
    duration: "2 days",
    priceInCents: 350000,
    // Intensives start with a free consultation to confirm fit and plan the two days.
    calendlyUrl: "https://calendly.com/martamindacc/initial-consultation",
  },
  {
    id: "initial-consultation",
    name: "Initial Consultation",
    description: "A free 15 minute introductory call.",
    duration: "15 min",
    priceInCents: 0,
    calendlyUrl: "https://calendly.com/martamindacc/initial-consultation",
  },
]
