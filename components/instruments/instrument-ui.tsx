/**
 * The pieces both Instruments pages share. Nothing here is used outside
 * /instruments/**, and nothing here loads a font or a dependency the rest of
 * the site does not already have.
 */

/**
 * The mark every instrument shares: one sun, one horizon. The line never
 * moves; only the disc color changes between instruments, so a range of
 * them reads as one range.
 */
export function InstrumentMark({
  className = "",
  discColor = "#D99148",
}: {
  className?: string
  /** The disc color for this instrument. The horizon stays #F3E6DD. */
  discColor?: string
}) {
  return (
    <div
      className={`flex aspect-square shrink-0 items-center justify-center border border-[#2E2824] bg-[#28231F] ${className}`}
    >
      <svg viewBox="0 0 100 100" className="h-[62%] w-[62%]" aria-hidden="true">
        <circle cx="50" cy="50" r="26.5" fill={discColor} />
        <rect x="20.5" y="62.25" width="59" height="2" rx="1" fill="#F3E6DD" />
      </svg>
    </div>
  )
}

/** Label-above-value pairs: the spec block on the hub and the session facts on AET01. */
export function SpecList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-[#93857B]">
            {item.label}
          </dt>
          <dd className="mt-2 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A3968C]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** The same line on every Instruments page. */
export function InstrumentDisclosure() {
  return (
    <p className="max-w-4xl font-[Roboto,Arial,sans-serif] text-sm leading-[1.5] text-[#93857B]">
      Instruments are communication practice tools. They are not therapy, treatment or diagnosis,
      and they do not replace care from a qualified professional.
    </p>
  )
}
