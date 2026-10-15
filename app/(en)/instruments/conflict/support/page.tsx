import Link from "next/link"
import { pageMetadata } from "@/lib/seo"

/**
 * Placeholder until the real support address exists. Swap this one constant and
 * both the visible text and the mailto link follow.
 */
const SUPPORT_EMAIL = "[SUPPORT EMAIL]"

export const metadata = {
  ...pageMetadata({
    title: "AET01 Conflict Support",
    description: "How to reach the Aether Instruments team about AET01 Conflict.",
    path: "/instruments/conflict/support",
    image: {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "AET01 Conflict — support",
    },
  }),
  // Placeholder address until the real one exists; keep it out of the index.
  robots: { index: false },
}

export default function Page() {
  return (
    <div className="pb-24 pt-48">
      <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#F3E6DD] sm:text-8xl">
        Support
      </h1>
      <p className="mt-12 max-w-4xl font-[Roboto,Arial,sans-serif] text-xl leading-[1.5] text-[#A3968C] sm:text-2xl">
        For AET01 Conflict.
      </p>

      <div className="mt-12 rounded-2xl border border-[#2E2824] bg-[#28231F] p-8 sm:p-10">
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-[Roboto,Arial,sans-serif] text-[19px] font-medium text-[#D99148] transition-colors hover:text-[#F3E6DD]"
        >
          {SUPPORT_EMAIL}
        </a>
      </div>

      <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A3968C]">
        Replies within a few business days.
      </p>

      <div className="mt-16 font-[Roboto,Arial,sans-serif] text-sm text-[#93857B]">
        <Link href="/instruments/conflict" className="transition-colors hover:text-[#A3968C]">
          ← AET01 Conflict
        </Link>
      </div>
    </div>
  )
}
