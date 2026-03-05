"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/Animations";
import { ArrowRight, Building2, Users, Gift } from "lucide-react";

export default function CorporateCTA() {
  return (
    <section className="py-20 bg-sage-900 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="corp-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#corp-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <span className="text-sm font-medium text-brand-400 tracking-wide uppercase">
              Corporate Gifting
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Make Your Brand
              <br />
              <span className="text-brand-400">Grow with Green</span>
            </h2>
            <p className="mt-4 text-sage-300 leading-relaxed max-w-lg">
              Impress clients, welcome new employees, and celebrate milestones
              with eco-friendly plant gifts. Custom branding options available
              for bulk orders.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop?category=Corporate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-500 transition-colors"
              >
                Explore Corporate Gifts
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/917888888888?text=Hi,%20I'm%20interested%20in%20corporate%20plant%20gifting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-sage-600 text-sage-200 font-medium rounded-xl hover:bg-sage-800 transition-colors"
              >
                Get Custom Quote
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Building2, stat: "50+", label: "Corporate Clients" },
                { icon: Users, stat: "1000+", label: "Plants Gifted" },
                { icon: Gift, stat: "100%", label: "Happy Recipients" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="text-center p-4 bg-sage-800/50 rounded-2xl"
                  >
                    <Icon className="w-8 h-8 text-brand-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">
                      {item.stat}
                    </div>
                    <div className="text-xs text-sage-400 mt-1">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
