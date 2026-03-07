/**
 * Quick smoke test for the SEO pipeline.
 * Run: node --import tsx scripts/test-seo.ts
 */

import { getPageByRouteAndSlug, getTotalPageCount, getRelatedPages } from "../src/lib/seo/page-registry";
import { generatePageContent, getRelevantProducts } from "../src/lib/seo/content-engine";
import { generateAllSchemas } from "../src/lib/seo/schema-generators";

const TESTS = [
  { route: "plants-for" as const, slug: "bedroom" },
  { route: "plants-for" as const, slug: "air-purifying" },
  { route: "plants-for" as const, slug: "snake-plant-in-bedroom" },
  { route: "best" as const, slug: "air-purifying-plants" },
  { route: "plant-gifts" as const, slug: "birthday" },
  { route: "plant-gifts" as const, slug: "birthday-in-chandigarh" },
  { route: "plant-delivery" as const, slug: "chandigarh" },
  { route: "plant-delivery" as const, slug: "snake-plant-in-delhi" },
  { route: "guide" as const, slug: "snake-plant-care" },
];

let passed = 0;
let failed = 0;

for (const t of TESTS) {
  const page = getPageByRouteAndSlug(t.route, t.slug);
  if (!page) {
    console.log(`❌ FAIL: ${t.route}/${t.slug} — page not found`);
    failed++;
    continue;
  }

  const content = generatePageContent(page);
  const products = getRelevantProducts(page, 8);
  const related = getRelatedPages(page, 4);
  const schemas = generateAllSchemas(page, content.faqs, products, content.intro);

  const errors: string[] = [];
  if (!page.title) errors.push("missing title");
  if (!page.metaDescription) errors.push("missing meta desc");
  if (!page.h1) errors.push("missing h1");
  if (!page.path) errors.push("missing path");
  if (!content.intro) errors.push("missing intro");
  if (content.benefits.length === 0) errors.push("no benefits");
  if (content.faqs.length === 0) errors.push("no FAQs");
  if (!schemas) errors.push("schema gen failed");

  if (errors.length > 0) {
    console.log(`❌ FAIL: ${t.route}/${t.slug} — ${errors.join(", ")}`);
    failed++;
  } else {
    console.log(`✅ PASS: ${page.path}`);
    console.log(`   Title: ${page.title}`);
    console.log(`   Products: ${products.length} | FAQs: ${content.faqs.length} | Related: ${related.length}`);
    passed++;
  }
}

console.log(`\n── Summary ──`);
console.log(`Total pages: ${getTotalPageCount().toLocaleString()}`);
console.log(`Tests: ${passed} passed, ${failed} failed out of ${TESTS.length}`);
console.log(failed === 0 ? "\n🟢 ALL SYSTEMS GO — SEO pipeline is fully functional" : "\n🔴 SOME TESTS FAILED");
