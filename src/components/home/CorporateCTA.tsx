"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, CountUp } from "@/components/ui/Animations";
import {
  ArrowRight,
  Building2,
  Users,
  Gift,
  PartyPopper,
  Briefcase,
  Heart,
  MessageCircle,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const BULK_USE_CASES = [
  { icon: Building2, label: "Corporate Welcome Kits", description: "Impress new hires on day one" },
  { icon: PartyPopper, label: "Event & Party Favours", description: "Memorable green giveaways" },
  { icon: Briefcase, label: "Office Desk Plants", description: "Boost workplace wellness" },
  { icon: Heart, label: "Client Appreciation Gifts", description: "Stand out from generic gifts" },
];

export default function CorporateCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">
              Corporate & Bulk Gifting
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Make Your Brand
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-teal-400 to-brand-300">Grow with Green</span>
            </h2>
            <p className="mt-5 text-neutral-400 leading-relaxed max-w-lg text-sm sm:text-base">
              Impress clients, welcome new employees, and celebrate milestones
              with eco-friendly plant gifts. Custom branding & bulk pricing
              available for orders of 10+ plants.
            </p>

            {/* Bulk use cases */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BULK_USE_CASES.map(({ icon: Icon, label, description }) => (
                <div key={label} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Icon className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs text-neutral-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/custom-order"
                className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-brand-500 to-teal-500 text-white font-semibold text-sm rounded-full hover:from-brand-600 hover:to-teal-600 shadow-lg shadow-brand-500/20 transition-all duration-300"
              >
                Request Bulk Order
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={WHATSAPP_URL("Hi Plantgen! I'm interested in bulk/corporate plant gifting. Can you share details?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] text-white font-semibold text-sm rounded-full hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <Link
                href="/shop?category=Corporate%20Gifts"
                className="inline-flex items-center gap-2 px-7 py-3 border border-neutral-600 text-neutral-300 font-medium text-sm rounded-full hover:bg-neutral-800 transition-colors"
              >
                Explore Corporate Gifts
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-4">
              {/* Real Gifting Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
                <Image
                  src="/reviews/gifting-moment-1.jpg"
                  alt="Real corporate plant gifting moment — Plantgen Chandigarh"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold text-white/90 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Real Corporate Gifting
                  </span>
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Building2, stat: 50, suffix: "+", label: "Corporate Clients", iconColor: "text-brand-400" },
                { icon: Users, stat: 1000, suffix: "+", label: "Plants Gifted", iconColor: "text-teal-400" },
                { icon: Gift, stat: 100, suffix: "%", label: "Happy Recipients", iconColor: "text-warm-400" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-500/30 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <Icon className={`w-7 h-7 ${item.iconColor} mx-auto mb-3`} />
                    <div className="text-2xl font-bold text-white">
                      <CountUp target={item.stat} suffix={item.suffix} />
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1">
                      {item.label}
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
