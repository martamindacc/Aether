/**
 * Renders a JSON-LD script. "<" is escaped so no value can ever close the
 * script tag, even if content someday comes from outside the repository.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
