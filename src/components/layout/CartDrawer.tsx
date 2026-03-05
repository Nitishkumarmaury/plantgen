"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Gift } from "lucide-react";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-neutral-900" />
                <h2 className="text-lg font-semibold text-neutral-900">
                  Your Gift Bag
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-1.5 text-neutral-400 hover:text-neutral-600 transition-colors rounded-lg hover:bg-neutral-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Gift className="w-16 h-16 text-neutral-200 mb-4" />
                  <p className="text-neutral-600 font-medium mb-2">
                    Your gift bag is empty
                  </p>
                  <p className="text-neutral-400 text-sm mb-6">
                    Find the perfect plant gift for someone special
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Browse Gifts
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 p-3 bg-neutral-50 rounded-xl"
                    >
                      <div className="w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-neutral-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {item.product.category}
                        </p>
                        <p className="text-sm font-semibold text-neutral-900 mt-1">
                          ₹{item.product.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="w-6 h-6 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-neutral-400 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium text-neutral-800 w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            aria-label="Increase quantity"
                            className="w-6 h-6 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-neutral-400 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`Remove ${item.product.name}`}
                            className="ml-auto text-xs text-neutral-400 hover:text-red-500 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-100 px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-lg font-semibold text-neutral-900">
                    ₹{total}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Delivery charges calculated at checkout. COD only.
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
