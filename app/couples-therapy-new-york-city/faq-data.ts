// Single source of truth for this page's FAQ content — used both to render
// the visible FAQ section (page.tsx) and to build matching FAQPage JSON-LD
// (layout.tsx). Keep them derived from here, not duplicated, so the two
// never drift out of sync (Google suppresses FAQ rich results on mismatch).
export const nycCouplesFaq: { question: string; answer: string }[] = [
  {
    question: "Are Couples Sessions held online?",
    answer:
      "Yes. Sessions are held entirely online, making it easier to meet consistently from New York City.",
  },
  {
    question: "What can we bring to the first session?",
    answer:
      "Bring the concerns, conversations, or patterns you would like to understand together. The first session is a place to begin.",
  },
  {
    question: "How do we book a Couples Session?",
    answer:
      "Use the Book your first session button below to choose a session and continue with online booking.",
  },
]
