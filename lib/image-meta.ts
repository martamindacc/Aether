import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type ImageDimensions = { width: number; height: number };

/**
 * Reads the intrinsic size of an image under /public from its file header,
 * so article images can be rendered with width/height (no layout shift) and
 * described with real dimensions in Open Graph and JSON-LD. Supports JPEG,
 * PNG and WebP, which are the only formats used on the site. Server-only.
 */
export const getImageDimensions = cache((src: string): ImageDimensions | undefined => {
  if (!src.startsWith("/")) return undefined;
  const file = path.join(process.cwd(), "public", src);
  if (!fs.existsSync(file)) return undefined;
  const buf = fs.readFileSync(file);

  // PNG: IHDR right after the 8-byte signature.
  if (buf.length > 24 && buf.toString("ascii", 1, 4) === "PNG") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // WebP (VP8 / VP8L / VP8X).
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: 1 + (b & 0x3fff), height: 1 + ((b >> 14) & 0x3fff) };
    }
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }

  // JPEG: walk the segments to the first SOF marker.
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) return undefined;
      const marker = buf[offset + 1];
      if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01 || marker === 0xff) {
        offset += marker === 0xff ? 1 : 2;
        continue;
      }
      const length = buf.readUInt16BE(offset + 2);
      const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSof) return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      offset += 2 + length;
    }
  }

  return undefined;
});
