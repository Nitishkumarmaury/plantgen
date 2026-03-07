/**
 * Keyword Universe Generator Script
 *
 * Run: npx tsx scripts/generate-keywords.ts
 *
 * Generates 100k+ long-tail keywords by combining dimensions
 * and outputs them as CSV for SEO analysis / Google Keyword Planner upload.
 */

import {
  plantTypes,
  rooms,
  useCases,
  occasions,
  cities,
  careLevels,
} from "../src/data/seo/dimensions";
import {
  getAllPages,
  getTotalPageCount,
} from "../src/lib/seo/page-registry";
import * as fs from "fs";
import * as path from "path";

// ─── Keyword Pattern Generators ─────────────────────────────────────────────

function generateKeywords(): string[] {
  const keywords = new Set<string>();

  // Pattern 1: {plant} + {use case}
  for (const plant of plantTypes) {
    for (const uc of useCases) {
      keywords.add(`${plant.name.toLowerCase()} for ${uc.name.toLowerCase()}`);
      keywords.add(`best ${plant.name.toLowerCase()} for ${uc.name.toLowerCase()}`);
    }
  }

  // Pattern 2: {plant} + {room}
  for (const plant of plantTypes) {
    for (const room of rooms) {
      keywords.add(`${plant.name.toLowerCase()} for ${room.name.toLowerCase()}`);
      keywords.add(`best ${plant.name.toLowerCase()} for ${room.name.toLowerCase()}`);
      keywords.add(`${plant.name.toLowerCase()} in ${room.name.toLowerCase()}`);
    }
  }

  // Pattern 3: {plant} + {city}
  for (const plant of plantTypes) {
    for (const city of cities) {
      keywords.add(`buy ${plant.name.toLowerCase()} in ${city.name.toLowerCase()}`);
      keywords.add(`${plant.name.toLowerCase()} delivery ${city.name.toLowerCase()}`);
      keywords.add(`${plant.name.toLowerCase()} online ${city.name.toLowerCase()}`);
    }
  }

  // Pattern 4: {plant} + {gift occasion}
  for (const plant of plantTypes) {
    for (const occ of occasions) {
      keywords.add(`${plant.name.toLowerCase()} gift for ${occ.name.toLowerCase()}`);
      keywords.add(`${plant.name.toLowerCase()} ${occ.name.toLowerCase()} gift`);
    }
  }

  // Pattern 5: {use case} + {room}
  for (const uc of useCases) {
    for (const room of rooms) {
      keywords.add(`${uc.name.toLowerCase()} plants for ${room.name.toLowerCase()}`);
      keywords.add(`best ${uc.name.toLowerCase()} plants for ${room.name.toLowerCase()}`);
    }
  }

  // Pattern 6: {use case} + {city}
  for (const uc of useCases) {
    for (const city of cities) {
      keywords.add(`${uc.name.toLowerCase()} plants in ${city.name.toLowerCase()}`);
      keywords.add(`buy ${uc.name.toLowerCase()} plants ${city.name.toLowerCase()}`);
    }
  }

  // Pattern 7: {occasion} + {city}
  for (const occ of occasions) {
    for (const city of cities) {
      keywords.add(`${occ.name.toLowerCase()} plant gift in ${city.name.toLowerCase()}`);
      keywords.add(`send plant for ${occ.name.toLowerCase()} ${city.name.toLowerCase()}`);
    }
  }

  // Pattern 8: {care level} + {room}
  for (const cl of careLevels) {
    for (const room of rooms) {
      keywords.add(`plants for ${cl.name.toLowerCase()} in ${room.name.toLowerCase()}`);
      keywords.add(`${cl.name.toLowerCase()} ${room.name.toLowerCase()} plants`);
    }
  }

  // Pattern 9: Single dimension high-value keywords
  for (const room of rooms) {
    keywords.add(`best plants for ${room.name.toLowerCase()}`);
    keywords.add(`plants for ${room.name.toLowerCase()}`);
    keywords.add(`indoor plants for ${room.name.toLowerCase()}`);
    for (const kw of room.keywords) keywords.add(kw);
  }

  for (const uc of useCases) {
    keywords.add(`best ${uc.name.toLowerCase()} plants`);
    keywords.add(`top ${uc.name.toLowerCase()} plants`);
    for (const kw of uc.keywords) keywords.add(kw);
  }

  for (const occ of occasions) {
    keywords.add(`plant gift for ${occ.name.toLowerCase()}`);
    keywords.add(`best plant gift for ${occ.name.toLowerCase()}`);
    for (const kw of occ.keywords) keywords.add(kw);
  }

  for (const city of cities) {
    keywords.add(`plant delivery ${city.name.toLowerCase()}`);
    keywords.add(`buy plants online ${city.name.toLowerCase()}`);
    keywords.add(`best plants in ${city.name.toLowerCase()}`);
    for (const kw of city.keywords) keywords.add(kw);
  }

  // Pattern 10: Three-way combos (subset for realism)
  for (const plant of plantTypes.slice(0, 10)) {
    for (const room of rooms.slice(0, 5)) {
      for (const city of cities.slice(0, 5)) {
        keywords.add(`${plant.name.toLowerCase()} for ${room.name.toLowerCase()} in ${city.name.toLowerCase()}`);
      }
    }
  }

  for (const plant of plantTypes.slice(0, 10)) {
    for (const occ of occasions.slice(0, 5)) {
      for (const city of cities.slice(0, 5)) {
        keywords.add(`${plant.name.toLowerCase()} ${occ.name.toLowerCase()} gift in ${city.name.toLowerCase()}`);
      }
    }
  }

  return Array.from(keywords).sort();
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  console.log("🌱 Plantgen Keyword Universe Generator\n");

  // Generate keywords
  const keywords = generateKeywords();
  console.log(`✅ Generated ${keywords.length.toLocaleString()} unique keywords\n`);

  // Count pages
  const pageCount = getTotalPageCount();
  console.log(`📄 Total programmatic pages: ${pageCount.toLocaleString()}\n`);

  // Write keywords CSV
  const outDir = path.join(process.cwd(), "output");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const csvContent = "keyword\n" + keywords.map((k) => `"${k}"`).join("\n");
  const csvPath = path.join(outDir, "keywords.csv");
  fs.writeFileSync(csvPath, csvContent, "utf-8");
  console.log(`📁 Keywords saved to: ${csvPath}`);

  // Write page list CSV
  const pages = getAllPages();
  const pagesCsv =
    "slug,route,path,title,priority,keywords\n" +
    pages
      .sort((a, b) => b.priority - a.priority)
      .map(
        (p) =>
          `"${p.slug}","${p.route}","${p.path}","${p.title}",${p.priority},"${p.keywords.slice(0, 3).join("; ")}"`
      )
      .join("\n");
  const pagesPath = path.join(outDir, "pages.csv");
  fs.writeFileSync(pagesPath, pagesCsv, "utf-8");
  console.log(`📁 Pages saved to: ${pagesPath}`);

  // Summary by route
  console.log("\n── Page Distribution ──");
  const routeCounts: Record<string, number> = {};
  for (const p of pages) {
    routeCounts[p.route] = (routeCounts[p.route] || 0) + 1;
  }
  for (const [route, count] of Object.entries(routeCounts).sort(
    (a, b) => b[1] - a[1]
  )) {
    console.log(`  /${route}/[slug]  →  ${count.toLocaleString()} pages`);
  }

  console.log(`\n  TOTAL: ${pageCount.toLocaleString()} pages`);
  console.log(`  KEYWORDS: ${keywords.length.toLocaleString()} unique`);
}

main();
