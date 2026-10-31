import { fillPrices } from "@/lib/products";
import type { LanguageCode } from "@/lib/service-content";

export type ServiceFaqItem = {
  question: string;
  /** Plain text: it is also the FAQPage schema answer. */
  answer: string;
  /** Optional further reading, rendered after the answer. */
  link?: { text: string; href: string };
};

type ServiceFaqs = Partial<Record<LanguageCode, ServiceFaqItem[]>>;

/**
 * The FAQ on each service page, rendered by components/service-faq.tsx with
 * FAQPage schema. Prices are tokens filled from lib/products.ts. Answers only
 * state what the rest of the site already says about how Aether works.
 */
const faqs: Record<"couples" | "intensive" | "individual" | "leadership" | "cofounder" | "family", ServiceFaqs> = {
  couples: {
    en: [
      {
        question: "How much does couples therapy cost?",
        answer:
          "A 60-minute couples session at Aether Practice is US${{price:couples-session:usd}} in the US and {{price:couples-session:nok}} NOK in Norway. Specialist couples therapists in both states typically charge US$200–450. Every booking starts with a free 15-minute consultation.",
        link: { text: "Couples therapy cost and insurance in NYC and San Francisco", href: "/guides/couples-therapy-cost-insurance-nyc-san-francisco" },
      },
      {
        question: "Does insurance cover couples therapy?",
        answer:
          "Usually not directly. Most couples specialists, including us, are private pay, because insurers often require a diagnosis and couples therapy is not one. If your plan has out-of-network benefits, it may reimburse part of the fee.",
      },
      {
        question: "How many sessions of couples therapy do you need?",
        answer:
          "Typically 8 to 20, with most of the change in the first eight to twelve. It depends on how long the pattern has been running. You get an honest estimate after the first session.",
      },
    ],
    no: [
      {
        question: "Hva koster parterapi?",
        answer:
          "En parterapisesjon på 60 minutter hos Aether Practice koster {{price:couples-session:kr}} kroner. Privat parterapi i Oslo koster vanligvis mellom 1 700 og 4 000 kroner per time. Alle bestillinger starter med en gratis 15-minutters samtale.",
        link: { text: "Hva koster parterapi i Oslo?", href: "/no/blog/parterapi-pris-oslo" },
      },
      {
        question: "Trenger man henvisning til parterapi?",
        answer:
          "Nei. Privat parterapi krever ingen henvisning fra fastlegen og ingen venteliste. Parterapi er heller ikke en diagnose, så fastlegen kan uansett ikke henvise til psykolog for det.",
      },
      {
        question: "Dekker HELFO eller NAV parterapi?",
        answer:
          "Nei, privat parterapi refunderes ikke av HELFO. Det gratis alternativet er familievernkontoret, som ikke krever henvisning, men har varierende ventetid.",
      },
    ],
  },
  intensive: {
    en: [
      {
        question: "How much does a couples intensive cost?",
        answer:
          "US${{price:couples-intensive:usd}} for couples in the US and {{price:couples-intensive:nok}} NOK in Norway. That includes the consultation and preparation, both days, a written summary and a follow-up session a few weeks later.",
      },
      {
        question: "How long is a couples intensive?",
        answer:
          "Two consecutive days, six hours a day with breaks: twelve hours in total, online. It covers ground that would take months of weekly sessions.",
      },
      {
        question: "Is a couples intensive worth it?",
        answer:
          "For couples in crisis, couples whose calendars defeat weekly sessions, and couples whose weekly therapy has stalled, often yes. It is not the right first step if one partner is unwilling, if there is violence or active substance misuse, or if an affair is still ongoing.",
        link: { text: "Intensive vs weekly couples therapy", href: "/blog/intensive-vs-weekly-couples-therapy" },
      },
    ],
    no: [
      {
        question: "Hva koster et parintensiv?",
        answer:
          "{{price:couples-intensive:kr}} kroner. Det inkluderer innledende samtale og forarbeid, begge dagene, en skriftlig oppsummering og en oppfølgingstime noen uker etterpå.",
      },
      {
        question: "Hvor lang tid tar et parintensiv?",
        answer:
          "To sammenhengende dager, seks timer hver dag med pauser: tolv timer totalt, på nett. Det tilsvarer måneder med ukentlige timer.",
      },
      {
        question: "Hvem passer intensiv parterapi for?",
        answer:
          "Par i krise, par der kalenderen gjør ukentlige timer umulig, og par der vanlig parterapi har stoppet opp. Det passer dårlig når én av dere ikke er motivert, når det er vold eller aktiv rus i forholdet, eller når en utenforrelasjon ikke er avsluttet.",
        link: { text: "Intensiv parterapi i Oslo", href: "/no/blog/intensiv-parterapi-oslo" },
      },
    ],
  },
  individual: {
    en: [
      {
        question: "How much does online therapy cost?",
        answer:
          "A 50-minute individual session at Aether Practice is US${{price:individual-session:usd}} in the US and {{price:individual-session:nok}} NOK in Norway. We are private pay, and you can start with a free 15-minute consultation.",
      },
      {
        question: "What can I talk about in therapy?",
        answer:
          "Anything that is weighing on you: stress, anxiety, grief, identity, a life transition, a decision you keep circling. You don't need a crisis to start, just a reason.",
      },
      {
        question: "What happens in the first therapy session?",
        answer:
          "It is a conversation about where you are now: what you want more of, what has been getting in the way, and what a good outcome would look like. From there you agree a clear focus for the work.",
      },
    ],
    no: [
      {
        question: "Hva koster en time hos terapeut?",
        answer:
          "En individuell time på 50 minutter hos Aether Practice koster {{price:individual-session:kr}} kroner. Du betaler privat og kan starte med en gratis 15-minutters samtale.",
      },
      {
        question: "Trenger jeg henvisning til terapi?",
        answer:
          "Nei, ikke til privat terapi. Du bestiller selv, slipper venteliste i det offentlige, og timene foregår på nett.",
      },
      {
        question: "Hva kan jeg snakke om i terapi?",
        answer:
          "Alt som tynger: stress, angst, sorg, identitet, en overgang i livet eller en beslutning du går i ring rundt. Du trenger ikke en krise for å begynne, bare en grunn.",
      },
    ],
  },
  leadership: {
    en: [
      {
        question: "How much does executive coaching cost?",
        answer:
          "A 50-minute founder or executive session at Aether Practice is US${{price:founder-session:usd}} in the US and {{price:founder-session:nok}} NOK in Norway. Private pay, with a free 15-minute consultation first.",
      },
      {
        question: "What is the difference between coaching and therapy?",
        answer:
          "Coaching works on your role: decisions, leadership and the pressure you carry, aimed at sharper judgment and a pace you can sustain. Therapy works on your inner life and relationships. When the strain is in your relationship at home, couples therapy is the better tool, and many leaders do both.",
        link: { text: "Couples therapy for executives and CEOs", href: "/couples-therapy-executives" },
      },
      {
        question: "Is executive coaching confidential?",
        answer:
          "Yes. Sessions are strictly confidential and private pay, so nothing goes through your company, board or investors.",
      },
    ],
    no: [
      {
        question: "Hva koster coaching for ledere?",
        answer:
          "En time på 50 minutter for ledere og gründere hos Aether Practice koster {{price:founder-session:kr}} kroner. Du betaler privat og kan starte med en gratis 15-minutters samtale.",
      },
      {
        question: "Hva er forskjellen på coaching og terapi?",
        answer:
          "Coaching arbeider med rollen din: beslutninger, ledelse og presset du bærer, med mål om skarpere dømmekraft og et tempo du tåler over tid. Terapi arbeider med det indre livet og relasjonene. Sitter belastningen i forholdet hjemme, er parterapi riktig verktøy, og mange ledere gjør begge deler.",
        link: { text: "Parterapi for gründere", href: "/no/parterapi-for-grundere" },
      },
      {
        question: "Er lederveiledning konfidensielt?",
        answer:
          "Ja. Samtalene er strengt konfidensielle, og fordi du betaler privat, går ingenting via selskapet, styret eller investorene.",
      },
    ],
  },
  cofounder: {
    en: [
      {
        question: "How much does co-founder coaching cost?",
        answer:
          "US${{price:cofounder-session:usd}} for a 60-minute online session with both founders present. There is a free 15-minute consultation first and no minimum engagement.",
        link: { text: "Co-founder coaching in San Francisco and New York", href: "/blog/co-founder-coaching-san-francisco-new-york" },
      },
      {
        question: "Do you offer co-founder coaching in San Francisco?",
        answer:
          "Yes. Aether Practice works online with founding teams across the San Francisco Bay Area, scheduled in Pacific time, with both founders in the session. A 60-minute session is US${{price:cofounder-session:usd}}, with a free 15-minute consultation first.",
        link: { text: "Co-founder coaching in San Francisco", href: "/co-founder-coaching-san-francisco" },
      },
      {
        question: "Do you work with founding teams in New York?",
        answer:
          "Yes. Aether Practice works online with founding teams across New York City, scheduled in Eastern time, with both founders in the session. A 60-minute session is US${{price:cofounder-session:usd}}, with a free 15-minute consultation first.",
        link: { text: "Co-founder coaching in New York City", href: "/co-founder-coaching-new-york-city" },
      },
      {
        question: "Is co-founder coaching the same as co-founder therapy?",
        answer:
          "People use both names for the same thing: both founders in the room, working on the partnership. What we offer is coaching for a working relationship, not clinical care, focused on how you decide, disagree and divide responsibility.",
      },
      {
        question: "How many sessions do co-founders need?",
        answer:
          "It depends on what is stuck. One avoided conversation can move in one or two sessions; a conflict that has built for years takes longer. Some teams come twice, others keep a standing session for a quarter.",
      },
    ],
  },
  family: {
    en: [
      {
        question: "What does family therapy help with?",
        answer:
          "Communication that keeps breaking down, roles that have become fixed, growing distance, and repair after conflict, a transition or grief. The focus is what happens between you and how to change it.",
      },
      {
        question: "Who should attend family therapy?",
        answer:
          "Whoever is part of the pattern you want to change, whether that is parents and children, adult siblings or a blended family.",
      },
      {
        question: "How does online family therapy work?",
        answer:
          "Sessions are 60 minutes by secure video, with the family together at one screen at home. No waiting room and no commute makes a regular rhythm easier to keep.",
      },
    ],
    no: [
      {
        question: "Hva koster familieterapi?",
        answer:
          "En familiesesjon på 60 minutter hos Aether Practice koster {{price:family-session:kr}} kroner. Dere betaler privat og kan starte med en gratis 15-minutters samtale.",
        link: { text: "Familieterapi: pris og gratis hjelp", href: "/no/blog/familieterapi-pris-pa-nett" },
      },
      {
        question: "Trenger man henvisning til familieterapi?",
        answer:
          "Nei. Privat familieterapi krever ingen henvisning. Familievernkontoret er gratis og krever heller ikke henvisning, men har varierende ventetid.",
      },
      {
        question: "Hvem deltar i familieterapi?",
        answer:
          "De som er en del av mønsteret dere vil endre, enten det er foreldre og barn, voksne søsken eller en sammensatt familie.",
      },
    ],
  },
};

export type ServiceFaqKey = keyof typeof faqs;

/** A service page's FAQ in one language, with prices filled in. Empty when the page has none. */
export function serviceFaq(service: ServiceFaqKey, language: LanguageCode): ServiceFaqItem[] {
  return (faqs[service][language] ?? []).map((item) => ({ ...item, answer: fillPrices(item.answer) }));
}
