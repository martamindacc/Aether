import { ImageResponse } from "next/og"
import { OG_IMAGE_ALT } from "@/lib/seo"

// Site-wide social preview image. Next.js attaches this to og:image and
// twitter:image for every route automatically.
export const alt = OG_IMAGE_ALT
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#74382f",
          color: "#fafafb",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 40, letterSpacing: "0.02em" }}>Aether Practice</div>
        <div
          style={{
            display: "flex",
            fontSize: 66,
            lineHeight: 1.15,
            fontWeight: 600,
            maxWidth: "960px",
          }}
        >
          Online counseling &amp; coaching for couples, individuals, families,
          executives, and founders
        </div>
        <div style={{ fontSize: 30, opacity: 0.85 }}>
          New York City · California · Norway
        </div>
      </div>
    ),
    { ...size },
  )
}
