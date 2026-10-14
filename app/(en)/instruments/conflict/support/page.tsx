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
    <div className="pb-24 pt-20">
      <h1 className="text-[44px] font-medium leading-[1.0] tracking-[-0.02em] text-[#F3EBDD] sm:text-[56px]">
        Support
      </h1>
      <p className="mt-6 font-[Roboto,Arial,sans-serif] text-[1.1rem] font-light leading-[1.7] text-[#A39A8C]">
        For AET01 Conflict.
      </p>

      <div className="mt-14 border border-[#2E2A24] bg-[#28251F] p-8">
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-[Roboto,Arial,sans-serif] text-[1.05rem] text-[#D99148] transition-colors hover:text-[#F3EBDD]"
        >
          {SUPPORT_EMAIL}
        </a>
      </div>

      <p className="mt-8 font-[Roboto,Arial,sans-serif] text-[15px] font-light leading-[1.7] text-[#A39A8C]">
        Replies within a few business days.
      </p>

      <div className="mt-16 font-[Roboto,Arial,sans-serif] text-[13px] text-[#6A635A]">
        <Link href="/instruments/conflict" className="transition-colors hover:text-[#A39A8C]">
          ← AET01 Conflict
        </Link>
      </div>
    </div>
  )
}
