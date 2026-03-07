/**
 * JSON-LD Schema generators for structured data.
 * Produces BreadcrumbList, FAQPage, Product, and ItemList schemas.
 */

import type { SEOPageDefinition } from "./page-registry";
import type { FAQ } from "./content-engine";
import type { Product } from "@/types";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

// ─── Breadcrumb Schema ──────────────────────────────────────────────────────

export function generateBreadcrumbSchema(
  page: SEOPageDefinition
): object {
  const segments = page.path.split("/").filter(Boolean);
  const routeLabels: Record<string, string> = {
    "plants-for": "Plants For",
    best: "Best Plants",
    "plant-gifts": "Plant Gifts",
    "plant-delivery": "Plant Delivery",
    guide: "Guides",
  };

  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: routeLabels[segments[0]] || segments[0],
      item: `${SITE_URL}/${segments[0]}`,
    },
  ];

  if (segments.length > 1) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: page.h1,
      item: `${SITE_URL}${page.path}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

// ─── FAQ Schema ─────────────────────────────────────────────────────────────

export function generateFAQSchema(faqs: FAQ[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── Product List Schema ────────────────────────────────────────────────────

export function generateProductListSchema(
  products: Product[],
  page: SEOPageDefinition
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.shortDescription,
        image: product.imageUrl.startsWith("/")
          ? `${SITE_URL}${product.imageUrl}`
          : product.imageUrl,
        url: `${SITE_URL}/product/${product.id}`,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "INR",
          availability: product.stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: SITE_NAME,
          },
        },
        aggregateRating: product.reviewCount > 0
          ? {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            }
          : undefined,
      },
    })),
  };
}

// ─── Article / WebPage Schema ───────────────────────────────────────────────

export function generateWebPageSchema(
  page: SEOPageDefinition,
  intro: string
): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.metaDescription,
    url: `${SITE_URL}${page.path}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: page.h1,
      description: intro,
    },
    breadcrumb: generateBreadcrumbSchema(page),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
  };
}

// ─── Combine All Schemas For a Page ─────────────────────────────────────────

export function generateAllSchemas(
  page: SEOPageDefinition,
  faqs: FAQ[],
  products: Product[],
  intro: string
): string {
  const schemas = [
    generateWebPageSchema(page, intro),
    generateBreadcrumbSchema(page),
  ];

  if (faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  if (products.length > 0) {
    schemas.push(generateProductListSchema(products, page));
  }

  return JSON.stringify(schemas);
}
