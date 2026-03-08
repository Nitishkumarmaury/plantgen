/**
 * Generate properly sized favicon files from the source PNG.
 *
 * Google requires favicons to be:
 *   - A multiple of 48px (48×48, 96×96, 192×192)
 *   - At least 48×48 (anything smaller is ignored)
 *   - Not blocked by robots.txt
 *   - Accessible at a consistent URL
 *
 * This script produces:
 *   public/favicon.ico         — 48×48 ICO (wrapped PNG) for legacy browsers
 *   public/favicon-48x48.png   — 48×48  (Google minimum)
 *   public/favicon-96x96.png   — 96×96  (high-DPI tabs)
 *   public/favicon-192x192.png — 192×192 (Android / PWA)
 *   public/favicon-512x512.png — 512×512 (PWA splash)
 *   public/apple-touch-icon.png— 180×180 (Apple devices)
 *   src/app/favicon.ico        — copy for Next.js App Router
 *   src/app/apple-icon.png     — copy for Next.js App Router
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SOURCE = path.join(__dirname, "..", "public", "favicon.png");
const PUBLIC = path.join(__dirname, "..", "public");
const APP = path.join(__dirname, "..", "src", "app");

/**
 * Build a minimal ICO file from a single PNG buffer.
 * ICO format: 6-byte header → 16-byte directory entry → raw PNG data.
 */
function buildIco(pngBuffer, width, height) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(1, 4); // 1 image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(width >= 256 ? 0 : width, 0);
  entry.writeUInt8(height >= 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2);   // no palette
  entry.writeUInt8(0, 3);   // reserved
  entry.writeUInt16LE(1, 4);  // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image size
  entry.writeUInt32LE(6 + 16, 12); // offset to image data

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Source file not found:", SOURCE);
    process.exit(1);
  }

  const source = sharp(SOURCE);
  const meta = await source.metadata();
  console.log(`Source: ${meta.width}×${meta.height}, ${meta.format}`);

  // 1. PNG variants
  const sizes = [
    { w: 48, h: 48, name: "favicon-48x48.png" },
    { w: 96, h: 96, name: "favicon-96x96.png" },
    { w: 192, h: 192, name: "favicon-192x192.png" },
    { w: 512, h: 512, name: "favicon-512x512.png" },
    { w: 180, h: 180, name: "apple-touch-icon.png" },
  ];

  for (const { w, h, name } of sizes) {
    const outPath = path.join(PUBLIC, name);
    await sharp(SOURCE).resize(w, h, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`  ✓ ${name} (${w}×${h}) — ${stat.size} bytes`);
  }

  // 2. ICO file (48×48 PNG inside ICO container)
  const png48Buf = await sharp(SOURCE).resize(48, 48, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
  const icoBuffer = buildIco(png48Buf, 48, 48);

  fs.writeFileSync(path.join(PUBLIC, "favicon.ico"), icoBuffer);
  console.log(`  ✓ favicon.ico (48×48 ICO) — ${icoBuffer.length} bytes`);

  // 3. Copy key files into src/app/ for Next.js App Router auto-detection
  fs.copyFileSync(path.join(PUBLIC, "favicon.ico"), path.join(APP, "favicon.ico"));
  console.log("  ✓ src/app/favicon.ico (copied)");

  fs.copyFileSync(path.join(PUBLIC, "apple-touch-icon.png"), path.join(APP, "apple-icon.png"));
  console.log("  ✓ src/app/apple-icon.png (copied)");

  // Keep the original high-res favicon.png as source
  console.log("\nDone! All favicon files generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
