"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import {
  Truck,
  Gift,
  Shield,
  Star,
  Leaf,
  Heart,
  Clock,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Banknote,
  CheckCircle2,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const bestSellers = products
  .filter((p) => p.bestSeller || p.featured)
  .slice(0, 8);

const faqs = [
  {
    q: "What is a plant bouquet?",
    a: "A plant bouquet replaces traditional flower bouquets with living plants in beautiful gift packaging. Instead of flowers that die in 3 days, you gift a plant that grows for years — a living, breathing reminder of the person who gave it.",
  },
  {
    q: "How is a plant bouquet different from a flower bouquet?",
    a: "A flower bouquet costs ₹500-1000 and lasts 3-5 days before ending up in the trash. A plant bouquet from Plantgen starts at just ₹220, comes in premium gift wrapping, and lives for years. Every time the receiver waters it, they remember you.",
  },
  {
    q: "What plants are used in plant bouquets?",
    a: "We use a curated mix of indoor plants perfect for gifting — Money Plants, Snake Plants, Peace Lilies, Lucky Bamboo, Succulents, Jade Plants, and more. Each one is selected for beauty, low maintenance, and air-purifying qualities.",
  },
  {
    q: "Can I get a plant bouquet delivered same-day?",
    a: "Yes! We offer same-day plant bouquet delivery across Chandigarh, Mohali, Panchkula, and Zirakpur for orders placed before 2 PM. All deliveries include free gift wrapping and a personalized message card.",
  },
  {
    q: "Are plant bouquets good for corporate events?",
    a: "Absolutely! Plant bouquets are perfect for corporate events, employee welcome kits, client appreciation, and event return gifts. We offer bulk pricing starting at ₹199/plant with custom branding options.",
  },
  {
    q: "How do I order a plant bouquet?",
    a: "Simply browse our collection on the website, choose your plant, add it to cart, and checkout with a delivery address. You can also order directly via WhatsApp — no login needed!",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function PlantBouquetPage() {
  return (
    <div className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium">Plant Bouquet</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              The Future of Gifting
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight mb-5">
              Plant Bouquet — <span className="text-brand-600">A Gift That Grows</span>
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-8">
              Flowers die in 3 days. A plant bouquet from Plantgen lives for years. Instead of a
              ₹500 flower arrangement that ends up in the dustbin, gift a living plant that purifies
              air, brightens spaces, and reminds them of you every single day. Starting at just ₹220
              with free gift wrapping and same-day delivery.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all">
                <Gift className="w-4 h-4" />
                Shop Plant Bouquets
              </Link>
              <a href={WHATSAPP_URL("Hi Plantgen! I want to order a plant bouquet.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </a>
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Same-Day Delivery", sub: "Order before 2 PM" },
              { icon: Banknote, label: "Cash on Delivery", sub: "Pay when delivered" },
              { icon: Gift, label: "Free Gift Wrapping", sub: "Premium packaging" },
              { icon: Shield, label: "Plant Guarantee", sub: "Healthy or replaced" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <item.icon className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">{item.label}</p>
                  <p className="text-xs text-neutral-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Why Plant Bouquets Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            Why a Plant Bouquet is Better Than Flowers
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            Think about every flower bouquet you&apos;ve ever received. Beautiful in the moment —
            forgotten in a week. Now imagine receiving a plant instead. You water it, watch it grow,
            and every new leaf reminds you of the person who gifted it. That&apos;s the Plantgen difference.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Clock, title: "Lasts Years, Not Days", desc: "A ₹300 plant outlasts a ₹500 flower bouquet by 1,000x. That's not a gift — that's an investment in a memory." },
              { icon: Heart, title: "Creates Emotional Bonds", desc: "Every watering, every new leaf, every bloom — they think of you. A plant bouquet creates ongoing emotional connection." },
              { icon: Leaf, title: "Eco-Friendly & Zero Waste", desc: "No plastic wrapping that goes to landfill. No dying flowers in the trash. A plant bouquet is fully sustainable." },
              { icon: Sparkles, title: "Premium Gift Experience", desc: "Every plant bouquet comes in beautiful packaging with a handwritten message card and easy care instructions." },
              { icon: Star, title: "Unique & Memorable", desc: "While everyone else gives the same flower bouquet, you give something no one forgets. Be the person they remember." },
              { icon: Shield, title: "Air-Purifying Benefits", desc: "Most of our plants are NASA-recommended air purifiers. A gift that literally makes their life healthier." },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-white border border-neutral-100 rounded-2xl hover:shadow-md transition-shadow">
                <item.icon className="w-6 h-6 text-brand-600 mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Concept */}
        <section className="mb-16 bg-gradient-to-br from-brand-50 to-teal-50 rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-4">
            The Plant Bouquet Concept — How It Works
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Traditional Flower Bouquet</h3>
              <ul className="space-y-2 text-neutral-700">
                {[
                  "Costs ₹500-1,500",
                  "Dies in 2-3 days",
                  "Ends up in the dustbin",
                  "Forgotten within a week",
                  "Creates plastic waste from wrapping",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Plantgen Plant Bouquet</h3>
              <ul className="space-y-2 text-neutral-700">
                {[
                  "Starts at just ₹220",
                  "Lives and grows for years",
                  "Purifies air in their home/office",
                  "Reminds them of you every day",
                  "100% eco-friendly, zero waste",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Best Plant Bouquets */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            Our Most Popular Plant Bouquets
          </h2>
          <p className="text-neutral-600 mb-8">
            Handpicked plants that make perfect bouquet alternatives — beautiful, easy to care for, and full of meaning.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square bg-neutral-50">
                  <Image src={product.imageUrl} alt={`${product.name} plant bouquet`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
                  {product.originalPrice && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-neutral-900 text-sm truncate">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-neutral-600">{product.rating} ({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-semibold text-neutral-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors">
              View All Plant Bouquets <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Plant Bouquet Occasions */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            Plant Bouquets for Every Occasion
          </h2>
          <p className="text-neutral-600 mb-8">
            Wherever people give flower bouquets, a plant bouquet is a better choice.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { name: "Birthday Bouquets", emoji: "🎂", href: "/plant-gifts/birthday", desc: "A gift that grows with them" },
              { name: "College Events", emoji: "🎓", href: "/college-event-plant-gifts", desc: "Farewell, freshers, fests" },
              { name: "Corporate Events", emoji: "🏢", href: "/corporate-plant-gifts", desc: "Welcome kits & event favours" },
              { name: "Wedding Return Gifts", emoji: "💍", href: "/plant-return-gifts", desc: "Unique, memorable return gifts" },
              { name: "Welcome Ceremonies", emoji: "🌟", href: "/welcome-plant-gifts", desc: "Replace generic garlands" },
              { name: "Festival Gifting", emoji: "🪔", href: "/plant-gifts/diwali", desc: "Eco-friendly Diwali gifts" },
            ].map((occ) => (
              <Link key={occ.name} href={occ.href} className="p-5 bg-neutral-50 border border-neutral-100 rounded-2xl hover:bg-brand-50 hover:border-brand-200 transition-all group">
                <span className="text-3xl mb-3 block">{occ.emoji}</span>
                <h3 className="font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors">{occ.name}</h3>
                <p className="text-sm text-neutral-500 mt-1">{occ.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About Plant Bouquets
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-neutral-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 transition-colors font-medium text-neutral-900">
                  {faq.q}
                  <span className="ml-2 text-neutral-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-4 pb-4 text-neutral-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 rounded-3xl p-10 sm:p-14">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            Ready to Gift a Plant Bouquet?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Starting at ₹220. Free gift wrapping. Same-day delivery in Chandigarh & Tricity.
            Give a gift they&apos;ll remember every time they water it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all">
              <Gift className="w-4 h-4" /> Shop Plant Bouquets
            </Link>
            <a href={WHATSAPP_URL("Hi! I want to order a plant bouquet.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp Order
            </a>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Plant Gifts Chandigarh", href: "/plant-gifts-chandigarh" },
              { label: "Corporate Plant Gifts", href: "/corporate-plant-gifts" },
              { label: "Eco-Friendly Gifts", href: "/eco-friendly-gifts" },
              { label: "Return Gift Plants", href: "/plant-return-gifts" },
              { label: "College Event Plants", href: "/college-event-plant-gifts" },
              { label: "Welcome Plant Gifts", href: "/welcome-plant-gifts" },
              { label: "Birthday Plant Gifts", href: "/plant-gifts/birthday" },
              { label: "Shop All Plants", href: "/shop" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-4 py-2 bg-neutral-50 border border-neutral-200 text-neutral-700 text-sm rounded-full hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
