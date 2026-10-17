import Link from "next/link"
import { InstrumentMark, SpecList } from "@/components/instruments/instrument-ui"
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

const BASE_URL = "https://aetherpractice.com"

/**
 * Store listings. Empty until the app is released; set each to its listing URL
 * and the visible links, the SoftwareApplication schema's installUrl and the
 * "coming soon" line all follow. Nothing is invented in the meantime.
 */
const APP_STORE_URL = ""
const PLAY_STORE_URL = ""
const storeLinks = [
  { label: "App Store", href: APP_STORE_URL },
  { label: "Google Play", href: PLAY_STORE_URL },
].filter((link) => link.href)

export const metadata = pageMetadata({
  title: "AET01 Conflict: Rehearse an Argument With an AI That Pushes Back",
  description:
    "AET01 Conflict is a mobile app for practicing difficult conversations against an AI partner that holds a position instead of agreeing with you. Two-minute sessions, four difficulty levels, a score and the line you should have used. No account. Not therapy.",
  path: "/instruments/conflict",
  // The app's own dark social image (./og/route.tsx), not the practice's site image.
  image: {
    url: "/instruments/conflict/og",
    width: 1200,
    height: 630,
    alt: "AET01 Conflict — rehearse the argument before you have it. An Aether Instrument.",
  },
})

const intro = [
  "You have never lost a negotiation. You lose this one on a Tuesday, about the dishwasher.",
  "Every model you have ever used was built to agree with you. This one was built to hold a position. Pick the fight. It takes the other side and stays there — through the deflection, the reasonable voice, the thing you say to make it stop. Then it tells you which sentence lost you the room.",
]

const definition =
  "AET01 Conflict is a mobile app for rehearsing a difficult conversation against an AI partner that holds a position instead of agreeing with you, and then scores the exchange against a fixed standard. Clear, respectful and immovable scores highest. Aggression loses points. So does giving in to make it stop."

const protocols = [
  {
    number: "01",
    name: "Practice",
    description: [
      "Start with an easy challenge or face a partner who pushes hard. Practise the fight before it happens, see where it breaks down, and try again.",
      "The goal isn't to win. It's to find words you can stand behind when the pressure rises.",
    ],
  },
  {
    number: "02",
    name: "Spiral",
    description: [
      "Already in the argument? Step out of the loop.",
      "A guided pause to slow things down and decide what you want to say next.",
    ],
  },
  {
    number: "03",
    name: "Debrief",
    description: [
      "The conflict is over. Look at what happened.",
      "Where did you hold your position? Where did you escalate? Where did you trade something important for temporary peace?",
      "Turn the pattern into practice for next time.",
    ],
  },
]

const firmIsNotAFail = [
  "Every piece of advice about conflict optimizes for one outcome: de-escalation. Soften it. Lead with empathy. Assume good intent.",
  "Follow that far enough and you have agreed, warmly, for years, to things you do not agree with. It looks like maturity. It compounds like debt.",
  "Peace at any price is still a price.",
  "So this scores both failures. Aggression is marked. So is the quiet trade — the apology that was not yours, the request withdrawn because the volume went up. Clear, respectful and immovable scores highest, which is a thing almost nothing else will tell you.",
  "Discomfort is not evidence of error.",
]

const session = [
  { label: "Length", value: "two minutes" },
  { label: "Levels", value: "warm-up, easy, medium, hard" },
  { label: "Account", value: "none" },
  { label: "Platforms", value: "iOS and Android" },
]

/** A run of answer text, or a linked phrase within it. */
type AnswerPart = string | { text: string; href: string }

/**
 * Visible FAQ and FAQPage schema come from this one list. An answer with links
 * is written as parts; the schema gets the same words as plain text.
 */
const faq: { question: string; answer: string | AnswerPart[] }[] = [
  {
    question: "What is AET01 Conflict?",
    answer: [
      "AET01 Conflict is a mobile app for rehearsing a difficult conversation before you have it. You pick the fight and a partner at one of four levels; an AI takes the other side and holds its position instead of agreeing with you. Afterwards it scores the exchange against a fixed standard and shows you the sentence where it went wrong, and the line that would have held. It is an ",
      { text: "Aether Instrument", href: "/instruments" },
      ": one conversation, one standard, two minutes. Made by Aether Practice, which also works with the people on the other side of these conversations — ",
      { text: "co-founders", href: "/co-founder-coaching" },
      " and ",
      { text: "couples", href: "/couples-therapy" },
      ".",
    ],
  },
  {
    question: "How is it different from role-playing with ChatGPT or another assistant?",
    answer:
      "Assistants are built to be agreeable; push and they fold, which teaches you nothing. The partner in AET01 Conflict is built to hold a position through deflection and pressure. It also scores against a standard that stays fixed between sessions, and it marks both ways of losing: escalating, and quietly giving in.",
  },
  {
    question: "What does the score measure?",
    answer:
      "Whether you held your position, kept it respectful, and avoided both failures. Aggression is marked down. So is the quiet trade: the apology that was not yours, the request withdrawn because the volume went up. Clear, respectful and immovable scores highest. The score comes with the exact failure and the line you should have used.",
  },
  {
    question: "Who it is for",
    answer:
      "Anyone preparing for a conversation they expect to lose: co-founders before an equity or performance conversation, partners before the recurring argument about money or housework, managers before a hard review, anyone who has to hold a line with family. It is not limited to workplace scenarios.",
  },
  {
    question: "How long is a session, and do I need an account?",
    answer: "Two minutes, at one of four levels: warm-up, easy, medium or hard. No account is required.",
  },
]

const answerText = (answer: string | AnswerPart[]) =>
  typeof answer === "string" ? answer : answer.map((part) => (typeof part === "string" ? part : part.text)).join("")

const label = "font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-[#93857B]"
const sectionHeading =
  "font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight text-[#F3E6DD] sm:text-5xl"
const bodyText = "font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A3968C]"

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Instruments", path: "/instruments" },
  { name: "AET01 Conflict", path: "/instruments/conflict" },
])

/**
 * The app as a SoftwareApplication (the mobile-app subtype, since it ships on
 * iOS and Android), published by the practice under the Aether Instruments
 * brand declared on the hub. No offers block until the price is public, and
 * no installUrl until the listings exist; both follow the constants above.
 */
const appLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "MobileApplication"],
      "@id": `${BASE_URL}/instruments/conflict#app`,
      name: "AET01 Conflict",
      alternateName: ["AET01", "Conflict by Aether Instruments"],
      url: `${BASE_URL}/instruments/conflict`,
      image: `${BASE_URL}/instruments/conflict/og`,
      description: definition,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "Communication practice",
      operatingSystem: "iOS, Android",
      inLanguage: "en",
      featureList: [
        "Two-minute rehearsal sessions against an AI partner that holds a position",
        "Four partner levels: warm-up, easy, medium, hard",
        "A score, the exact failure and the line you should have used",
        "Scores both aggression and quiet capitulation",
        "Three protocols: Practice, Spiral, Debrief",
        "No account required",
      ],
      ...(storeLinks.length ? { installUrl: storeLinks.map((link) => link.href) } : {}),
      author: { "@id": `${BASE_URL}/#organization` },
      publisher: { "@id": `${BASE_URL}/#organization` },
      brand: { "@id": `${BASE_URL}/instruments#instruments` },
      isPartOf: { "@id": `${BASE_URL}/instruments` },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/instruments/conflict#faq`,
      mainEntity: faq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answerText(answer) },
      })),
    },
  ],
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={appLd} />
    <div className="pb-24 pt-48">
      {/*
        A product masthead: the mark reads as the app's icon and sits beside the
        number and name rather than floating above them, with the line that says
        what it does, and the line that says where to get it, directly under.
      */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <InstrumentMark className="w-24 rounded-[22%] sm:w-28" />
        <h1 className="flex flex-wrap items-baseline gap-x-4 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium leading-[0.95] tracking-tight text-[#F3E6DD] sm:text-7xl">
          <span className="text-[#93857B]">AET01</span>
          <span>Conflict</span>
        </h1>
      </div>
      <p className="mt-10 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#A3968C] sm:text-2xl">
        Rehearse the argument before you have it.
      </p>
      {storeLinks.length ? (
        <div className="mt-5 flex gap-6 font-[Roboto,Arial,sans-serif] text-sm">
          {storeLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-[#D99148] transition-colors hover:text-[#F3E6DD]">
              {link.label} ↗
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-5 font-[Roboto,Arial,sans-serif] text-sm text-[#93857B]">
          Coming to the App Store and Google Play.
        </p>
      )}
      <div className="mt-10 max-w-4xl space-y-6">
        {intro.map((paragraph) => (
          <p key={paragraph} className={bodyText}>
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-20">
        <h2 className={sectionHeading}>Three protocols</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {protocols.map((protocol) => (
            <div key={protocol.name} className="rounded-2xl border border-[#2E2824] bg-[#28231F] p-8 sm:p-10">
              <p className={label}>{protocol.number}</p>
              <h3 className="mt-4 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium text-[#F3E6DD]">
                {protocol.name}
              </h3>
              <div className="mt-4 space-y-4">
                {protocol.description.map((paragraph) => (
                  <p key={paragraph} className={bodyText}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Firm is not a fail</h2>
        <div className="mt-6 max-w-4xl space-y-6">
          {firmIsNotAFail.map((paragraph) => (
            <p key={paragraph} className={bodyText}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Two minutes</h2>
        <div className="mt-10 max-w-4xl">
          <SpecList items={session} />
        </div>
      </section>

      <section className="mt-20">
        <h2 className={sectionHeading}>Questions</h2>
        <div className="mt-6 max-w-4xl">
          {faq.map((item) => (
            <details key={item.question} className="border-t border-[#2E2824] py-8">
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-xl font-medium text-[#A3968C]">
                  {item.question}
                </h3>
              </summary>
              <p className={`mt-4 ${bodyText}`}>
                {typeof item.answer === "string"
                  ? item.answer
                  : item.answer.map((part) =>
                      typeof part === "string" ? (
                        part
                      ) : (
                        <Link
                          key={part.href}
                          href={part.href}
                          className="text-[#D99148] underline underline-offset-4 transition-colors hover:text-[#F3E6DD]"
                        >
                          {part.text}
                        </Link>
                      ),
                    )}
              </p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-20 max-w-4xl font-[Roboto,Arial,sans-serif] text-sm leading-[1.5] text-[#93857B]">
        AET01 Conflict is a communication practice tool. Not psychotherapy, medical care or crisis
        support. Model feedback can be wrong.
      </p>

      <div className="mt-10 flex gap-6 font-[Roboto,Arial,sans-serif] text-sm text-[#93857B]">
        <Link href="/instruments" className="transition-colors hover:text-[#A3968C]">
          All instruments
        </Link>
        <Link href="/instruments/conflict/privacy" className="transition-colors hover:text-[#A3968C]">
          Privacy
        </Link>
        <Link href="/instruments/conflict/support" className="transition-colors hover:text-[#A3968C]">
          Support
        </Link>
      </div>
    </div>
    </>
  )
}
