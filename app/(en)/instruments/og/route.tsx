import { ImageResponse } from "next/og"

/**
 * Social preview for the Instruments hub. Dark like the section itself, with
 * the range mark (one sun, one horizon) and the line that says what
 * Instruments are, so a shared link reads as Instruments rather than as the
 * practice's light-toned site image.
 */
/**
 * A route handler rather than the opengraph-image file convention: the
 * convention appends a content hash to nested routes' image URLs, and the
 * page metadata and schema need a stable address to point at.
 */
const size = { width: 1200, height: 630 }
export const dynamic = "force-static"

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141210",
          backgroundImage: "radial-gradient(ellipse 90% 60% at 22% 10%, rgba(209,184,168,0.14) 0%, rgba(20,18,16,0) 60%)",
          color: "#F3E6DD",
          padding: "80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 96,
              height: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 22,
              border: "1px solid #2E2824",
              backgroundColor: "#28231F",
            }}
          >
            <svg viewBox="0 0 100 100" width="60" height="60">
              <circle cx="50" cy="50" r="26.5" fill="#D99148" />
              <rect x="20.5" y="62.25" width="59" height="2" rx="1" fill="#F3E6DD" />
            </svg>
          </div>
          <div style={{ fontSize: 40, letterSpacing: "0.02em", color: "#A3968C" }}>Aether Instruments</div>
        </div>
        <div style={{ display: "flex", fontSize: 72, lineHeight: 1.05, fontWeight: 600, maxWidth: "1000px", letterSpacing: "-0.02em" }}>
          Tools for the human condition.
        </div>
        <div style={{ fontSize: 32, color: "#A3968C", maxWidth: "1000px" }}>
          Rehearsal tools for the conversations that decide how your life goes. Not therapy.
        </div>
      </div>
    ),
    { ...size },
  )
}
