import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import type { ServiceFaqItem } from "@/lib/service-faq";
import type { LanguageCode } from "@/lib/service-content";

const heading: Record<LanguageCode, string> = { en: "Frequently asked questions", no: "Vanlige spørsmål" };

/**
 * A service page's FAQ: collapsible questions styled like the blog and hub
 * FAQs (components/mdx-components.tsx), with matching FAQPage schema. The
 * answers are in the server-rendered HTML whether or not they are open.
 */
export function ServiceFaq({ items, language }: { items: ServiceFaqItem[]; language: LanguageCode }) {
  if (!items.length) return null;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <div className="mt-24">
      <JsonLd data={faqLd} />
      <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-4xl font-medium tracking-tight sm:text-5xl">
        {heading[language]}
      </h2>
      <div className="mt-12 max-w-4xl">
        {items.map((item) => (
          <details key={item.question} className="group border-t border-zinc-300/80 py-8">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-xl font-medium leading-[1.35] text-[#383838]">
                {item.question}
              </h3>
              {/* Chevron flips when the answer is open, so readers can tell the question expands. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="mt-0.5 h-5 w-5 shrink-0 text-[#74382f] transition-transform duration-200 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 7.5l5 5 5-5" />
              </svg>
            </summary>
            <p className="mt-4 max-w-3xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#383838]">
              {item.answer}
              {item.link && (
                <>
                  {" "}
                  <Link href={item.link.href} className="text-[#74382f] underline underline-offset-2 hover:no-underline">
                    {item.link.text} →
                  </Link>
                </>
              )}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
