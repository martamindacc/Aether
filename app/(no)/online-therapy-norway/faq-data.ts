
// Single source of truth for this page's FAQ content, per language — used
// both to render the visible FAQ section (page.tsx) and to build matching
// FAQPage JSON-LD (layout.tsx, "no" only, matching the default server-
// rendered language). Keep derived from here, not duplicated, so the two
// never drift out of sync (Google suppresses FAQ rich results on mismatch).
export const norwayFaq: Record<"no", { question: string; answer: string }[]> = {
  no: [
    {
      question: "Holdes sesjonene online?",
      answer:
        "Ja. Sesjonene holdes helt digitalt, noe som gjør det lettere å møtes jevnlig uansett hvor du er i Norge.",
    },
    {
      question: "Hva kan jeg ta med til den første sesjonen?",
      answer:
        "Ta med det du ønsker å forstå bedre — bekymringer, samtaler eller mønstre. Den første sesjonen er ganske enkelt et sted å begynne.",
    },
    {
      question: "Hvordan bestiller jeg en sesjon fra Norge?",
      answer:
        "Bruk knappen Book din første sesjon nedenfor for å velge en sesjon og fortsette med digital booking.",
    },
  ],
};
