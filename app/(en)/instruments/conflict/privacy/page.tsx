import Link from "next/link"
import { pageMetadata } from "@/lib/seo"

export const metadata = {
  ...pageMetadata({
    title: "AET01 Conflict Privacy Policy",
    description:
      "The privacy policy for AET01 Conflict is being finalized and will be published before the instrument is released.",
    path: "/instruments/conflict/privacy",
    image: {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "AET01 Conflict — privacy policy",
    },
  }),
  // Placeholder content until the real policy ships; keep it out of the index.
  robots: { index: false },
}

/**
 * Reading column for the policy. The descendant variants style whatever prose is
 * pasted into it later — headings, paragraphs, lists and links — so the finished
 * policy needs no styling of its own. The only body copy today is the one
 * sentence below.
 */
const prose = [
  "max-w-4xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A39A8C]",
  "[&>*:first-child]:mt-0",
  "[&_h2]:mt-14 [&_h2]:font-[NeueHaasDisplayRoman,Arial,sans-serif] [&_h2]:text-4xl [&_h2]:font-medium [&_h2]:leading-[1.2] [&_h2]:tracking-tight sm:[&_h2]:text-5xl [&_h2]:text-[#F3EBDD]",
  "[&_h3]:mt-10 [&_h3]:font-[NeueHaasDisplayRoman,Arial,sans-serif] [&_h3]:text-2xl [&_h3]:font-medium [&_h3]:text-[#F3EBDD]",
  "[&_p]:mt-5",
  "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_li]:mt-2 [&_li]:pl-1",
  "[&_a]:text-[#D99148] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#F3EBDD]",
  "[&_strong]:font-medium [&_strong]:text-[#F3EBDD]",
].join(" ")

export default function Page() {
  return (
    <div className="pb-24 pt-48">
      <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-6xl font-medium leading-[0.95] tracking-tight text-[#F3EBDD] sm:text-8xl">
        Privacy Policy
      </h1>
      <p className="mt-8 font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-[#93857B]">
        AET01 Conflict
      </p>

      <div className={`mt-12 ${prose}`}>
        <p>
          This policy is being finalized and will be published before AET01 Conflict is released.
        </p>
      </div>

      <div className="mt-16 font-[Roboto,Arial,sans-serif] text-sm text-[#93857B]">
        <Link href="/instruments/conflict" className="transition-colors hover:text-[#A39A8C]">
          ← AET01 Conflict
        </Link>
      </div>
    </div>
  )
}
