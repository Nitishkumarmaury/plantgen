"use client";

import { Product } from "@/types";
import { useProducts } from "@/context/ProductsContext";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

const FALLBACK_IMG = "/plants/indoor_plants/money_plant_pot_01.jpg";

export default function ProductCard({ product, index = 0, priority = false }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { getDiscountPercentage } = useProducts();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const discount = getDiscountPercentage(product);

  const primaryImg = imageError ? FALLBACK_IMG : product.imageUrl;
  const secondaryImg = product.imageUrl2 || primaryImg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.6) }}
      className="group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <div className="bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <Link href={`/product/${product.id}`} className="block relative">
          <div className="aspect-square bg-neutral-50 relative overflow-hidden">
            {/* Primary Image */}
            <Image
              src={primaryImg}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-500 ${isHovered && product.imageUrl2 ? "opacity-0" : "opacity-100"}`}
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
              onError={() => setImageError(true)}
              priority={priority}
            />
            {/* Secondary Image (hover) */}
            {product.imageUrl2 && (
              <Image
                src={secondaryImg}
                alt={`${product.name} alternate view`}
                fill
                className={`object-cover transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
            )}

            {/* Discount Badge - Top Left */}
            {discount > 0 && (
              <div className="absolute top-2 left-2 z-10">
                <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-[11px] font-bold rounded-sm">
                  {discount}% OFF
                </span>
              </div>
            )}

            {/* Badges Row */}
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
              {product.bestSeller && (
                <span className="inline-block px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold rounded-sm">
                  BESTSELLER
                </span>
              )}
              {product.newArrival && (
                <span className="inline-block px-2 py-0.5 bg-brand-700 text-white text-[10px] font-bold rounded-sm">
                  NEW
                </span>
              )}
              {product.priceDrop && (
                <span className="inline-block px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-sm">
                  PRICE DROP
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setWishlisted(!wishlisted);
              }}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute bottom-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-3 flex flex-col flex-1">
          {/* Tag Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {product.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="text-[9px] font-medium text-brand-700 bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="text-[13px] sm:text-sm font-semibold text-neutral-800 leading-tight line-clamp-2 group-hover:text-brand-700 transition-colors min-h-[32px]">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-neutral-700 ml-0.5">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400">
              ({product.reviewCount})
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-base sm:text-lg font-bold text-neutral-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-semibold text-brand-700">
                {discount}% off
              </span>
            )}
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-1 min-h-[4px]" />

          {/* Add to Cart */}
          <button
            onClick={() => addItem(product)}
            className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-lg active:scale-[0.97] transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
