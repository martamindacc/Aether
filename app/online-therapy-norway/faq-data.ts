import { type LanguageCode } from "@/lib/service-content";

// Single source of truth for this page's FAQ content, per language — used
// both to render the visible FAQ section (page.tsx) and to build matching
// FAQPage JSON-LD (layout.tsx, "no" only, matching the default server-
// rendered language). Keep derived from here, not duplicated, so the two
// never drift out of sync (Google suppresses FAQ rich results on mismatch).
export const norwayFaq: Record<LanguageCode, { question: string; answer: string }[]> = {
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
  en: [
    {
      question: "Are sessions held online?",
      answer:
        "Yes. Sessions are held entirely online, making it easier to meet consistently no matter where you are in Norway.",
    },
    {
      question: "What can I bring to the first session?",
      answer:
        "Bring the concerns, conversations, or patterns you would like to understand better. The first session is simply a place to begin.",
    },
    {
      question: "How do I book a session from Norway?",
      answer:
        "Use the Book your first session button below to choose a session and continue with online booking.",
    },
  ],
  pl: [
    {
      question: "Czy sesje odbywają się online?",
      answer:
        "Tak. Sesje odbywają się w całości online, co pozwala łatwiej spotykać się regularnie, niezależnie od miejsca pobytu w Norwegii.",
    },
    {
      question: "Co mogę przynieść na pierwszą sesję?",
      answer:
        "Przynieś sprawy, rozmowy lub wzorce, które chciałbyś lepiej zrozumieć. Pierwsza sesja jest po prostu miejscem, w którym zaczynamy.",
    },
    {
      question: "Jak zarezerwować sesję z Norwegii?",
      answer:
        "Użyj przycisku Zarezerwuj pierwszą sesję poniżej, aby wybrać sesję i przejść do rezerwacji online.",
    },
  ],
};
