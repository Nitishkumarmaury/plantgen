import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { getAllPages } from "@/lib/seo/page-registry";
import { blogPosts } from "@/data/blog";

/**
 * Realistic sitemap following Google Search Console best practices.
 *
 * Only includes pages with genuine unique content value:
 * - Static & landing pages
 * - Product pages
 * - Blog posts
 * - High-value SEO pages (priority ≥ 0.6 = single-dimension pages with
 *   real search intent like /plants-for/bedroom, /plant-gifts/birthday,
 *   /plant-delivery/chandigarh, /guide/snake-plant-care)
 *
 * Cross-product combination pages (e.g. snake-plant-in-bedroom) are
 * excluded from the sitemap to avoid thin content signals. They remain
 * accessible via internal links and can be crawled organically.
 *
 * Google guidelines:
 * - Submit only canonical, indexable URLs you want Google to crawl
 * - Avoid bloating sitemap with low-value/template pages
 * - Quality over quantity — protects crawl budget and site trust
 */

const MIN_SEO_PAGE_PRIORITY = 0.6;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://plantgen.live";
  const now = new Date();

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/custom-order`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/plant-gifts-chandigarh`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // ── Important landing pages ──
  const landingPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/plant-bouquet`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/corporate-plant-gifts`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/eco-friendly-gifts`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/plant-return-gifts`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/welcome-plant-gifts`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/college-event-plant-gifts`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/plant-delivery/chandigarh`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // ── Product pages ──
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // ── High-value SEO pages only (priority ≥ 0.6) ──
  // Includes: single-dimension pages (rooms, use cases, occasions, cities,
  // care levels, plant guides) that have real search intent.
  // Excludes: cross-product template pages (plant×room, usecase×room, etc.)
  // which are still accessible via internal links for organic discovery.
  const seoPages: MetadataRoute.Sitemap = getAllPages()
    .filter((page) => page.priority >= MIN_SEO_PAGE_PRIORITY)
    .map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    }));

  // ── Blog posts ──
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...landingPages, ...productPages, ...blogPages, ...seoPages];
}
