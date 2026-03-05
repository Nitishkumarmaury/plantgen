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
}: {
  title: string;
  subtitle: string;
  products: Product[];
  link: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-10 sm:mb-14">
      {/* Header */}
      <div className="flex items-end justify-between mb-4 sm:mb-6 px-4 sm:px-0">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <Link
            href={link}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll Products */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 px-4 sm:px-0 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] lg:w-[250px] snap-start"
          >
            <ProductCard product={product} index={i} />
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
    <section className="py-10 sm:py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <ScrollableProductRow
          title="Bestsellers"
          subtitle="Our most-loved plants"
          products={bestSellers}
          link="/shop"
        />

        <ScrollableProductRow
          title="Featured Plants"
          subtitle="Handpicked by our experts"
          products={featured}
          link="/shop"
        />

        {priceDrops.length > 0 && (
          <ScrollableProductRow
            title="Price Drops 🔥"
            subtitle="Grab them before they sell out"
            products={priceDrops}
            link="/shop"
          />
        )}
      </div>
    </section>
  );
}
