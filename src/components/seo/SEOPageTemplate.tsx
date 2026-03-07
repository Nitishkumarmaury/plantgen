/**
 * SEOPageTemplate — Shared server component that renders all programmatic SEO pages.
 *
 * Feed it page definition + generated content and it renders:
 * - H1 with intro
 * - Benefits grid
 * - Product recommendations
 * - Care tips
 * - FAQs with accordion
 * - Internal links
 * - JSON-LD structured data
 */

import Link from "next/link";
import Image from "next/image";
import type { SEOPageDefinition } from "@/lib/seo/page-registry";
import { getRelatedPages } from "@/lib/seo/page-registry";
import type { PageContent } from "@/lib/seo/content-engine";
import { getRelevantProducts } from "@/lib/seo/content-engine";
import { generateAllSchemas } from "@/lib/seo/schema-generators";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import type { Product } from "@/types";

interface SEOPageProps {
  page: SEOPageDefinition;
  content: PageContent;
}

export default function SEOPageTemplate({ page, content }: SEOPageProps) {
  const products = getRelevantProducts(page, 8);
  const relatedPages = getRelatedPages(page, 8);
  const schemasJson = generateAllSchemas(page, content.faqs, products, content.intro);

  const routeLabels: Record<string, string> = {
    "plants-for": "Plants For",
    best: "Best Plants",
    "plant-gifts": "Plant Gifts",
    "plant-delivery": "Plant Delivery",
    guide: "Guides",
  };

  return (
    <div className="pt-24 pb-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemasJson }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
        >
          <Link href="/" className="hover:text-green-700 transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            href={`/${page.route}`}
            className="hover:text-green-700 transition-colors"
          >
            {routeLabels[page.route] || page.route}
          </Link>
          <span>›</span>
          <span className="text-neutral-800 font-medium truncate max-w-[200px]">
            {page.h1}
          </span>
        </nav>

        {/* H1 + Intro */}
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            {page.h1}
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
            {content.intro}
          </p>
        </header>

        {/* Benefits Grid */}
        {content.benefits.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Why Choose These Plants
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-xl"
                >
                  <span className="text-green-600 text-xl mt-0.5">✓</span>
                  <p className="text-neutral-700">{benefit}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Context Paragraph */}
        {content.contextParagraph && (
          <section className="mb-14">
            <p className="text-neutral-600 leading-relaxed">
              {content.contextParagraph}
            </p>
          </section>
        )}

        {/* Product Recommendations */}
        {products.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Recommended Plants
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductMiniCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
              >
                Browse All Plants →
              </Link>
            </div>
          </section>
        )}

        {/* Care Tips */}
        {content.careTips.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Care Tips
            </h2>
            <ol className="space-y-3">
              {content.careTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <p className="text-neutral-700 pt-0.5">{tip}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Buying Tips */}
        {content.buyingTips.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Buying Guide
            </h2>
            <ul className="space-y-2">
              {content.buyingTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-700">
                  <span className="text-green-600">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQs */}
        {content.faqs.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {content.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-neutral-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 transition-colors font-medium text-neutral-900">
                    {faq.question}
                    <span className="ml-2 text-neutral-400 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links */}
        {relatedPages.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
              Explore More
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {relatedPages.map((rp) => (
                <Link
                  key={rp.path}
                  href={rp.path}
                  className="block p-4 border border-neutral-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <p className="font-medium text-neutral-900 text-sm leading-tight">
                    {rp.h1}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="text-center py-12 bg-neutral-50 rounded-2xl">
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            Ready to Go Green?
          </h2>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            Explore our curated collection of plants with same-day delivery in
            Chandigarh & Tricity. Every plant comes with a care guide.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Shop Plants →
          </Link>
        </section>
      </div>
    </div>
  );
}

// ─── Mini Product Card ──────────────────────────────────────────────────────

function ProductMiniCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-neutral-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-neutral-900 text-sm truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-neutral-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-xs text-neutral-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
}
