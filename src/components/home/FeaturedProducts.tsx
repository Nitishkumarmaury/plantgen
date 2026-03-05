"use client";

import { useProducts } from "@/context/ProductsContext";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Product } from "@/types";

function ScrollableProductRow({
  title,
  subtitle,
  products,
  link,
  priorityImages = false,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  link: string;
  priorityImages?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-12 sm:mb-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 sm:mb-8 px-4 sm:px-0">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-neutral-900">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
          <Link
            href={link}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll Products */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 px-4 sm:px-0 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] lg:w-[260px] snap-start"
          >
            <ProductCard product={product} index={i} priority={priorityImages && i < 2} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const { getFeaturedProducts, getBestSellers, getPriceDropProducts } = useProducts();
  const featured = getFeaturedProducts().slice(0, 8);
  const bestSellers = getBestSellers().slice(0, 8);
  const priceDrops = getPriceDropProducts().slice(0, 8);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <ScrollableProductRow
          title="Bestsellers"
          subtitle="Our most-loved plants"
          products={bestSellers}
          link="/shop"
          priorityImages
        />

        <ScrollableProductRow
          title="Featured Plants"
          subtitle="Handpicked by our experts"
          products={featured}
          link="/shop"
        />

        {priceDrops.length > 0 && (
          <ScrollableProductRow
            title="Price Drops"
            subtitle="Grab them before they sell out"
            products={priceDrops}
            link="/shop"
          />
        )}
      </div>
    </section>
  );
}
