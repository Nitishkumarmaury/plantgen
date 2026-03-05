"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useUserAuth } from "@/context/UserAuthContext";
import { FadeIn } from "@/components/ui/Animations";
import { TIME_SLOTS } from "@/types";
import {
  MapPin,
  User,
  MessageSquare,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  ShoppingBag,
  LogIn,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { format, addDays } from "date-fns";

function getAvailableDates(): string[] {
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    dates.push(format(addDays(new Date(), i), "yyyy-MM-dd"));
  }
  return dates;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, loading: authLoading, openAuthModal } = useUserAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    alternatePhone: "",
    address: "",
    landmark: "",
    deliveryDate: "",
    timeSlot: "",
    messageNote: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || authLoading) return null;

  // Require login before checkout
  if (!user) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <FadeIn>
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-9 h-9 text-brand-700" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              Sign in to continue
            </h1>
            <p className="text-neutral-500 mb-2">
              Please login or create an account to place your order.
            </p>
            {items.length > 0 && (
              <p className="text-sm text-neutral-400 mb-6">
                You have {items.length} item{items.length > 1 ? "s" : ""} in your cart
              </p>
            )}
            <button
              onClick={openAuthModal}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10"
            >
              <Mail className="w-5 h-5" />
              Sign In / Sign Up
            </button>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }

  const total = totalPrice();
  const availableDates = getAvailableDates();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.deliveryDate) newErrors.deliveryDate = "Select a delivery date";
    if (!formData.timeSlot) newErrors.timeSlot = "Select a time slot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    setLoading(true);
    setOrderError("");

    try {
      // Send order to API (orderId is generated server-side)
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: items.map((item) => ({
            id: item.product.id,
            productId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            giftWrap: item.giftWrap || false,
          })),
          totalAmount: total,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderId(data.orderId || "");
        setSuccess(true);
        clearCart();
      } else {
        const data = await response.json().catch(() => ({}));
        setOrderError(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setOrderError(
        "Network error — please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Success Screen
  if (success) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <FadeIn>
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-brand-700" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              Order Placed Successfully! 🌿
            </h1>
            <p className="text-neutral-500 mb-6">
              Thank you for choosing Plantgen. Your gift will bring someone joy!
            </p>
            <div className="bg-neutral-50 rounded-xl p-6 mb-8 text-left">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Order ID</span>
                  <span className="font-semibold text-neutral-900">{orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Delivery Date</span>
                  <span className="font-medium text-neutral-800">
                    {formData.deliveryDate}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Time Slot</span>
                  <span className="font-medium text-neutral-800">
                    {TIME_SLOTS.find((s) => s.value === formData.timeSlot)?.label}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Payment</span>
                  <span className="font-medium text-neutral-800">
                    Cash on Delivery
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                href="/shop"
                className="block w-full px-6 py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Continue Shopping
              </Link>
              <a
                href={`https://wa.me/917888888888?text=Hi, I just placed order ${orderId}. Confirming my order!`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Confirm on WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 text-neutral-200 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-neutral-500 mb-6">
            Add some plant gifts before checking out
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Browse Gifts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
            Checkout
          </h1>
          <p className="text-neutral-500 mb-10">
            Cash on Delivery — Chandigarh & Tricity only
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.05}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-5 flex items-center gap-2">
                    <User className="w-5 h-5 text-brand-700" />
                    Contact Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all ${
                          errors.name ? "border-red-300" : "border-neutral-200"
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all ${
                          errors.phone ? "border-red-300" : "border-neutral-200"
                        }`}
                        placeholder="10-digit phone number"
                        maxLength={10}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Alternate Phone (optional)
                      </label>
                      <input
                        type="tel"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all"
                        placeholder="Alternate contact number"
                        maxLength={10}
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-5 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-700" />
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Full Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all resize-none ${
                          errors.address ? "border-red-300" : "border-neutral-200"
                        }`}
                        placeholder="House/flat number, street, sector, city"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Landmark (optional)
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all"
                        placeholder="Nearby landmark"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Schedule */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-5 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-700" />
                    Delivery Schedule
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Delivery Date *
                      </label>
                      <select
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all ${
                          errors.deliveryDate ? "border-red-300" : "border-neutral-200"
                        }`}
                      >
                        <option value="">Select date</option>
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {format(new Date(date), "EEEE, dd MMM yyyy")}
                            {date === availableDates[0] ? " (Today)" : ""}
                          </option>
                        ))}
                      </select>
                      {errors.deliveryDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.deliveryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                        Time Slot *
                      </label>
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-neutral-50 border rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all ${
                          errors.timeSlot ? "border-red-300" : "border-neutral-200"
                        }`}
                      >
                        <option value="">Select time</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                      {errors.timeSlot && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.timeSlot}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Gift Message */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-5 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-brand-700" />
                    Gift Note (optional)
                  </h2>
                  <textarea
                    name="messageNote"
                    value={formData.messageNote}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-200 focus:border-neutral-400 transition-all resize-none"
                    placeholder="Write a personal message for the gift recipient..."
                    maxLength={300}
                  />
                </div>

                {/* Submit (mobile) */}
                <div className="lg:hidden">
                  {orderError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                      {orderError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>Place Order — ₹{total}</>
                    )}
                  </button>
                </div>
              </form>
            </FadeIn>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.1}>
              <div className="sticky top-24 bg-white rounded-2xl p-6 border border-neutral-100">
                <h2 className="text-lg font-semibold text-neutral-900 mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-neutral-700 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-neutral-800 font-medium ml-3">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="text-neutral-800">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Delivery</span>
                    <span className="text-brand-700 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Payment</span>
                    <span className="text-neutral-600">COD</span>
                  </div>
                </div>

                <div className="border-t border-neutral-100 mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-neutral-900">Total</span>
                    <span className="text-xl font-bold text-neutral-900">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Submit (desktop) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    try {
                      const form = document.querySelector("form");
                      form?.requestSubmit();
                    } catch {
                      // Form validation may throw
                    }
                  }}
                  disabled={loading}
                  className="hidden lg:flex w-full items-center justify-center gap-2 mt-6 px-6 py-4 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>Place Order</>
                  )}
                </button>

                <p className="text-xs text-neutral-400 mt-4 text-center">
                  🌿 Available in Chandigarh & Tricity only
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
