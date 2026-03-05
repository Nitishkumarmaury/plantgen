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
} from "lucide-react";
import { motion } from "framer-motion";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80";

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            We couldn&apos;t find the plant you&apos;re looking for.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
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
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-green-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-green-600 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-green-600 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate">
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
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
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
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
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
                    className={`w-20 h-20 rounded-xl overflow-hidden bg-gray-100 relative border-2 transition-all ${
                      selectedImage === i
                        ? "border-green-600 shadow-md"
                        : "border-transparent hover:border-gray-300"
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
                    className="text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-full font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
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
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {product.rating}
              </span>
              <span className="text-sm text-gray-400">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Care Level</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {product.careLevel}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Type</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {product.plantType}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Stock</p>
                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    product.stock > 10
                      ? "text-green-600"
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
            <div className="border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Gift className="w-4 h-4 text-green-600" />
                Gift Options
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  Add gift wrapping (+₹49)
                </span>
              </label>
              <input
                type="text"
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Add a personal message (optional)"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all"
              />
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
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
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                  addedToCart
                    ? "bg-green-100 text-green-700"
                    : product.stock === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {addedToCart
                  ? "Added to Cart ✓"
                  : product.stock === 0
                  ? "Out of Stock"
                  : `Add to Cart — ₹${product.price * quantity}`}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Free delivery in Chandigarh</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Plant health guarantee</span>
              </div>
              {product.codAvailable && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-600 font-bold text-xs">₹</span>
                  <span>Cash on Delivery available</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Full Description */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            About This Plant
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {product.fullDescription}
          </p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
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
