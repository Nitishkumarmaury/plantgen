"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProducts } from "@/context/ProductsContext";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import {
  Star,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Truck,
  Shield,
  Gift,
  ArrowLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/constants";
import { motion } from "framer-motion";

const FALLBACK_IMG = "/plants/indoor_plants/money_plant_pot_01.jpg";

export default function ProductDetailPage() {
  const params = useParams();
  const { getProductById, getProductsByCategory, getDiscountPercentage } =
    useProducts();
  const { addItem } = useCartStore();

  const productId = typeof params.id === "string" ? params.id : "";
  const product = getProductById(productId);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    setGiftWrap(false);
    setGiftMessage("");
    setAddedToCart(false);
    setImageError(false);
  }, [productId]);

  if (!product) {
    return (
      <div className="pt-28 pb-20 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-6xl mb-4">🌿</p>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-neutral-500 mb-6">
            We couldn&apos;t find the plant you&apos;re looking for.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse All Plants
          </Link>
        </div>
      </div>
    );
  }

  const discount = getDiscountPercentage(product);
  const images = [
    product.imageUrl,
    ...(product.imageUrl2 ? [product.imageUrl2] : []),
  ];
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, giftMessage || undefined, giftWrap);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-brand-700 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-brand-700 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 mb-3">
              <Image
                src={imageError ? FALLBACK_IMG : images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onError={() => setImageError(true)}
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? "fill-red-500 text-red-500" : "text-neutral-400"
                  }`}
                />
              </button>
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedImage(i);
                      setImageError(false);
                    }}
                    className={`w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 relative border-2 transition-all ${
                      selectedImage === i
                        ? "border-brand-600 shadow-md"
                        : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            {product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-xs px-2.5 py-1 bg-brand-50 text-brand-700 rounded-full font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-neutral-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {product.rating}
              </span>
              <span className="text-sm text-neutral-400">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-neutral-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-sm font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-neutral-600 mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-neutral-50 rounded-xl p-3 text-center">
                <p className="text-xs text-neutral-500">Care Level</p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">
                  {product.careLevel}
                </p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-3 text-center">
                <p className="text-xs text-neutral-500">Light</p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">
                  {product.lightRequirement}
                </p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-3 text-center">
                <p className="text-xs text-neutral-500">Watering</p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">
                  {product.wateringFrequency}
                </p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-3 text-center">
                <p className="text-xs text-neutral-500">Stock</p>
                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    product.stock > 10
                      ? "text-brand-600"
                      : product.stock > 0
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? `Only ${product.stock} left`
                    : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Gift Options */}
            <div className="border border-neutral-200 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
                <Gift className="w-4 h-4 text-brand-600" />
                Gift Options
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 text-brand-600 border-neutral-300 rounded focus:ring-brand-500"
                />
                <span className="text-sm text-neutral-700">
                  Add gift wrapping (+₹49)
                </span>
              </label>
              <input
                type="text"
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Add a personal message (optional)"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
              />
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                  addedToCart
                    ? "bg-brand-100 text-brand-700"
                    : product.stock === 0
                    ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98]"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {addedToCart
                  ? "Added to Cart ✓"
                  : product.stock === 0
                  ? "Out of Stock"
                  : `Add to Cart — ₹${(product.price + (giftWrap ? 49 : 0)) * quantity}`}
              </button>
            </div>

            {/* WhatsApp & Instagram CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={WHATSAPP_URL(`Hi Plantgen! I'm interested in ${product.name} (₹${product.price}). Is it available?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#25D366] text-white hover:bg-[#20BD5A] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90 active:scale-[0.98] transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Message on Instagram
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Truck className="w-4 h-4 text-brand-600" />
                <span>Free delivery in Chandigarh</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Shield className="w-4 h-4 text-brand-600" />
                <span>Plant health guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MessageCircle className="w-4 h-4 text-brand-600" />
                <span>Reply within 30 mins</span>
              </div>
              {product.codAvailable && (
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <span className="text-brand-600 font-bold text-xs">₹</span>
                  <span>Cash on Delivery available</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Full Description */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            About This Plant
          </h2>
          <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
            {product.fullDescription}
          </p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
