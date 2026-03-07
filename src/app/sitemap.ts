import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { CATEGORIES } from "@/types";
import { getAllPages } from "@/lib/seo/page-registry";
import { blogPosts } from "@/data/blog";

/**
 * Dynamic sitemap supporting 100k+ SEO pages.
 *
 * Next.js automatically generates a sitemap index when the array
 * exceeds 50,000 entries and splits into multiple sitemap files.
 *
 * Google supports up to 50,000 URLs per sitemap file and a sitemap
 * index can reference unlimited sitemap files.
 */
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

  // ── Category pages ──
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/shop?category=${encodeURIComponent(cat)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Product pages ──
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // ── Programmatic SEO pages (100k+) ──
  const seoPages: MetadataRoute.Sitemap = getAllPages().map((page) => ({
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

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages, ...seoPages];
}
