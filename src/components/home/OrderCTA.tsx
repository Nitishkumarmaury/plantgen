"use client";

import { FadeIn } from "@/components/ui/Animations";
import { MessageCircle, Clock, ShieldCheck, Truck } from "lucide-react";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/constants";

export default function OrderCTA() {
  return (
    <section className="py-14 sm:py-16 bg-gradient-to-br from-brand-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left — CTAs */}
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 bg-brand-100 px-3 py-1 rounded-full mb-4">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Order Easily
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                  Order Plants on WhatsApp
                </h2>
                <p className="text-neutral-500 text-sm sm:text-base mb-6 max-w-md">
                  No login needed. Simply message us on WhatsApp with the plant
                  you want, and we&apos;ll handle the rest — from packaging to
                  same-day delivery.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP_URL("Hello Plantgen, I want to order plants.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold text-sm rounded-full hover:bg-[#20BD5A] shadow-lg shadow-[#25D366]/20 transition-all active:scale-[0.97]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order on WhatsApp
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold text-sm rounded-full hover:opacity-90 transition-all active:scale-[0.97]"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Message on Instagram
                  </a>
                </div>
              </div>

              {/* Right — Trust signals */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageCircle, title: "Reply in 30 min", desc: "Quick responses during business hours" },
                  { icon: Truck, title: "Same-Day Delivery", desc: "Order before 2 PM for same-day delivery" },
                  { icon: ShieldCheck, title: "Plant Guarantee", desc: "Healthy plant or free replacement" },
                  { icon: Clock, title: "No Login Needed", desc: "Just message us — zero hassle ordering" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 bg-neutral-50 rounded-xl border border-neutral-100"
                  >
                    <Icon className="w-5 h-5 text-brand-600 mb-2" />
                    <p className="text-sm font-semibold text-neutral-900">
                      {title}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
