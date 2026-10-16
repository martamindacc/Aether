import { ImageResponse } from "next/og"

/** Social preview for AET01 Conflict: the app's masthead, in the section's dark tone. */
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
        <div style={{ fontSize: 36, letterSpacing: "0.02em", color: "#A3968C" }}>Aether Instruments</div>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div
            style={{
              width: 160,
              height: 160,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 36,
              border: "1px solid #2E2824",
              backgroundColor: "#28231F",
            }}
          >
            <svg viewBox="0 0 100 100" width="100" height="100">
              <circle cx="50" cy="50" r="26.5" fill="#D99148" />
              <rect x="20.5" y="62.25" width="59" height="2" rx="1" fill="#F3E6DD" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 28, fontSize: 96, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
            <span style={{ color: "#93857B" }}>AET01</span>
            <span>Conflict</span>
          </div>
        </div>
        <div style={{ fontSize: 40, color: "#F3E6DD", maxWidth: "1000px", lineHeight: 1.2 }}>
          Rehearse the argument before you have it.
        </div>
      </div>
    ),
    { ...size },
  )
}
