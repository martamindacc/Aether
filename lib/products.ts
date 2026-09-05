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
// IDs passed to the checkout session should be the same as IDs from this array.
export const PRODUCTS: Product[] = [
  {
    id: "individual-session",
    name: "Individual Session",
    description: "A 50 minute one-on-one session.",
    duration: "50 min",
    priceInCents: 10000,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
  {
    id: "couples-session",
    name: "Couples Session",
    description: "A 60 minute session for two.",
    duration: "60 min",
    priceInCents: 15000,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
  {
    id: "family-session",
    name: "Family Session",
    description: "A 60 minute session for families.",
    duration: "60 min",
    priceInCents: 15000,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
  {
    id: "founder-session",
    name: "Founder&Executive Session",
    description: "A 50 minute session for founders and executives.",
    duration: "50 min",
    priceInCents: 10000,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
  {
    id: "initial-consultation",
    name: "Initial Consultation",
    description: "A free 15 minute introductory call.",
    duration: "15 min",
    priceInCents: 0,
    calendlyUrl: "https://calendly.com/martamindacc",
  },
]
