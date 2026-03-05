import type { Metadata } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = `${product.name} — Plant Gift`;
  const description =
    product.shortDescription ||
    `Buy ${product.name} online. ${product.careLevel} care. Delivered fresh in Chandigarh & Tricity.`;

  return {
    title,
    description,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/product/${product.id}`,
      images: product.imageUrl
        ? [{ url: `${SITE_URL}${product.imageUrl}`, width: 600, height: 750, alt: product.name }]
        : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.imageUrl ? [`${SITE_URL}${product.imageUrl}`] : undefined,
    },
  };
}

// Product JSON-LD structured data
function ProductJsonLd({ id }: { id: string }) {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.imageUrl ? `${SITE_URL}${product.imageUrl}` : undefined,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Plantgen" },
    },
    aggregateRating: product.reviewCount > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <ProductJsonLd id={params.id} />
      {children}
    </>
  );
}
