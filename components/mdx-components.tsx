/**
 * Shared MDX element styles for long-form content: blog posts and the
 * service-style hub pages under content/hubs. Keeping them in one place means
 * a hub page reads exactly like an article.
 */

import Image from "next/image";
import { getImageDimensions } from "@/lib/image-meta";

/** Slug for an H2 so tables of contents and in-page anchors can link to it. */
export function headingId(children: React.ReactNode) {
  return typeof children === "string"
    ? children.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : undefined;
}

/**
 * Article images. `![alt](/images/file.jpg "caption")` renders a <figure>
 * with the caption as <figcaption>, so the image carries its own context
 * for readers, screen readers and search/answer engines. Local images get
 * their intrinsic size read from disk and go through next/image, which
 * serves responsive AVIF/WebP variants, reserves space (no layout shift)
 * and lazy-loads by default.
 */
function MdxImage({ src, alt, title }: React.ComponentProps<"img">) {
  if (typeof src !== "string") return null;
  const dimensions = getImageDimensions(src);
  const className = "h-auto w-full rounded-2xl";
  const image = dimensions ? (
    <Image
      src={src}
      alt={alt ?? ""}
      width={dimensions.width}
      height={dimensions.height}
      sizes="(min-width: 816px) 720px, calc(100vw - 48px)"
      className={className}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- remote or unknown image without dimensions
    <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className={className} />
  );
  return (
    <figure className="mt-8">
      {image}
      {title && (
        <figcaption className="mt-3 font-[Roboto,Arial,sans-serif] text-sm leading-[1.5] text-zinc-600">{title}</figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      id={headingId(props.children)}
      className="mt-12 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-3xl font-medium tracking-tight text-[#74382f] sm:text-4xl"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 font-[Roboto,Arial,sans-serif] text-2xl font-medium text-zinc-900"
      {...props}
    />
  ),
  // FAQ questions (see lib/remark-faq-details.ts), styled like the Conflict page's FAQ.
  details: (props: React.ComponentProps<"details">) => (
    <details className="group mt-6 border-t border-zinc-300/80 py-8 [&+details]:mt-0 [&>summary+*]:mt-4" {...props} />
  ),
  summary: ({ children, ...props }: React.ComponentProps<"summary">) => (
    <summary
      className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden [&>h3]:mt-0 [&>h3]:font-[NeueHaasDisplayRoman,Arial,sans-serif] [&>h3]:text-xl [&>h3]:leading-[1.35] [&>h3]:text-[#383838]"
      {...props}
    >
      {children}
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
  ),
  p: (props: React.ComponentProps<"p">) => {
    // A paragraph holding only an image renders as the <figure> itself: <figure> inside <p> is invalid HTML.
    const only = props.children as React.ReactElement<{ src?: string }> | undefined;
    if (only && typeof only === "object" && "type" in only && only.type === MdxImage) {
      return only;
    }
    return (
      <p
        className="mt-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]"
        {...props}
      />
    );
  },
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className={`mt-6 space-y-3 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838] ${
        JSON.stringify(props.children).includes("☐") || JSON.stringify(props.children).includes("✓")
          ? "list-none pl-0"
          : "list-disc pl-6 marker:text-[#74382f]"
      }`}
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-3 pl-6 font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.6] text-[#383838]"
      {...props}
    />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-[#74382f] underline underline-offset-2 hover:no-underline" {...props} />
  ),
  img: MdxImage,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-4 border-[#C9A67D] pl-6 font-[Roboto,Arial,sans-serif] text-[19px] italic leading-[1.6] text-[#4a3d33] [&>p]:mt-0"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-[Roboto,Arial,sans-serif] font-medium" {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-left font-[Roboto,Arial,sans-serif] text-[16px] leading-[1.5] text-[#383838]" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => (
    <thead className="border-b border-zinc-300/80 font-[NeueHaasDisplayRoman,Arial,sans-serif] text-zinc-900" {...props} />
  ),
  tr: (props: React.ComponentProps<"tr">) => (
    <tr className="border-b border-zinc-300/80 align-top" {...props} />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="px-4 py-3 font-medium" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="px-4 py-3" {...props} />
  ),
};
