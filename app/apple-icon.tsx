import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg width="156" height="156" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="160" r="148" fill="none" stroke="#18181b" strokeWidth="10" />
          <line x1="160" y1="12" x2="75" y2="281" stroke="#18181b" strokeWidth="10" strokeLinecap="square" />
          <line x1="160" y1="12" x2="245" y2="281" stroke="#18181b" strokeWidth="10" strokeLinecap="square" />
          <line x1="107" y1="179" x2="213" y2="179" stroke="#18181b" strokeWidth="10" strokeLinecap="square" />
        </svg>
      </div>
    ),
    size,
  );
}
