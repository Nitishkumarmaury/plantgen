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
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80";

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
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
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <Link href={`/product/${product.id}`} className="block relative">
          <div className="aspect-square bg-gray-50 relative overflow-hidden">
            {/* Primary Image */}
            <Image
              src={primaryImg}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-500 ${isHovered && product.imageUrl2 ? "opacity-0" : "opacity-100"}`}
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
              onError={() => setImageError(true)}
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
                <span className="inline-block px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-sm">
                  BESTSELLER
                </span>
              )}
              {product.newArrival && (
                <span className="inline-block px-2 py-0.5 bg-green-600 text-white text-[10px] font-bold rounded-sm">
                  NEW
                </span>
              )}
              {product.priceDrop && (
                <span className="inline-block px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-sm">
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
                  className="text-[9px] font-medium text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="text-[13px] sm:text-sm font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-green-700 transition-colors min-h-[32px]">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-gray-700 ml-0.5">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[10px] text-gray-400">
              ({product.reviewCount})
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-semibold text-green-600">
                {discount}% off
              </span>
            )}
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-1 min-h-[4px]" />

          {/* Add to Cart */}
          <button
            onClick={() => addItem(product)}
            className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-semibold rounded-lg active:scale-[0.97] transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
