"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import {
  Truck, Gift, Shield, Star, Leaf, Recycle, TreePine, Heart,
  ChevronRight, MessageCircle, Banknote,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const bestSellers = products.filter((p) => p.bestSeller || p.featured).slice(0, 8);

const faqs = [
  {
    q: "Why are plant gifts considered eco-friendly?",
    a: "Plant gifts produce zero waste — no plastic wrapping, no dying flowers in the trash. They actively purify air, produce oxygen, and last for years. It's a gift that gives back to the planet.",
  },
  {
    q: "How are Plantgen gifts packaged?",
    a: "We use eco-friendly packaging materials — recycled paper bags, jute wrapping, and minimal plastic. Our gift wrapping is designed to look premium while staying sustainable.",
  },
  {
    q: "Are plant gifts cheaper than traditional gifts?",
    a: "Yes! Our plant gifts start at just ₹220 — often cheaper than flower bouquets (₹500+) or generic gift hampers (₹800+). And they last 1000x longer.",
  },
  {
    q: "Do you deliver eco-friendly gifts in Chandigarh?",
    a: "Yes! Same-day delivery across Chandigarh, Mohali, Panchkula, and Zirakpur. Cash on Delivery available.",
  },
  {
    q: "What's the best eco-friendly gift for Diwali?",
    a: "Lucky Bamboo, Money Plant, and Jade Plant are our top picks for Diwali gifting. They're considered auspicious, easy to maintain, and make beautiful yet sustainable Diwali gifts.",
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

export default function EcoFriendlyGiftsPage() {
  return (
    <div className="pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium">Eco-Friendly Gifts</span>
        </nav>

        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              Zero Waste Gifting
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight mb-5">
              Eco-Friendly Gifts — <span className="text-brand-600">Gift Green, Feel Good</span>
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-8">
              Every year, millions of plastic-wrapped gifts end up in landfills. Plantgen offers a
              better way — living plant gifts that purify air, brighten spaces, and create zero waste.
              Starting at ₹220 with eco-friendly packaging and same-day delivery in Chandigarh & Tricity.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all">
                <Leaf className="w-4 h-4" /> Shop Eco-Friendly Gifts
              </Link>
              <a href={WHATSAPP_URL("Hi Plantgen! I'm looking for eco-friendly gift ideas.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Same-Day Delivery", sub: "Chandigarh & Tricity" },
              { icon: Banknote, label: "Starting ₹220", sub: "Affordable & meaningful" },
              { icon: Recycle, label: "Eco Packaging", sub: "Zero plastic waste" },
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

        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            Why Plant Gifts Are the Most Eco-Friendly Choice
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            When you choose a plant gift, you&apos;re not just giving a present — you&apos;re making
            a statement about the kind of world you want to live in.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Recycle, title: "Zero Waste", desc: "No plastic wrapping, no dying flowers in the trash. A plant gift produces zero waste and actually improves the environment." },
              { icon: TreePine, title: "Air Purifying", desc: "Most of our plants are NASA-recommended air purifiers. You're gifting cleaner air along with a beautiful plant." },
              { icon: Heart, title: "Emotionally Meaningful", desc: "Unlike disposable gifts, a plant grows with your relationship. Every new leaf is a reminder of your thoughtfulness." },
              { icon: Leaf, title: "Carbon Positive", desc: "Plants absorb CO2 and release oxygen. Your gift literally makes the planet better. How many gifts can say that?" },
              { icon: Star, title: "Unique & Memorable", desc: "In a world of generic gift hampers, an eco-friendly plant gift stands out. Be the person everyone remembers." },
              { icon: Gift, title: "Beautiful Packaging", desc: "Eco-friendly doesn't mean boring. Our plants come in stunning jute and recycled paper gift wrapping." },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-white border border-neutral-100 rounded-2xl hover:shadow-md transition-shadow">
                <item.icon className="w-6 h-6 text-brand-600 mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact comparison */}
        <section className="mb-16 bg-gradient-to-br from-brand-50 to-teal-50 rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-4">
            The Environmental Impact of Gifting Choices
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {[
              { label: "Flower Bouquet", impact: "Dies in 3 days. Plastic wrapping goes to landfill. Chemical pesticides used in farming.", verdict: "High waste" },
              { label: "Generic Gift Hamper", impact: "Plastic boxes, synthetic ribbons, items used once. Most packaging is non-recyclable.", verdict: "Medium waste" },
              { label: "Plantgen Plant Gift", impact: "Lives for years. Purifies air. Eco-friendly packaging. Zero waste.", verdict: "Zero waste" },
            ].map((item) => (
              <div key={item.label} className="bg-white p-6 rounded-2xl border border-neutral-100">
                <h3 className="font-semibold text-neutral-900 mb-2">{item.label}</h3>
                <p className="text-sm text-neutral-600 mb-3">{item.impact}</p>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.verdict === "Zero waste" ? "bg-brand-50 text-brand-700" : "bg-red-50 text-red-700"}`}>
                  {item.verdict}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">Most Popular Eco-Friendly Plant Gifts</h2>
          <p className="text-neutral-600 mb-8">Beautiful, sustainable, and starting at just ₹220.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square bg-neutral-50">
                  <Image src={product.imageUrl} alt={`${product.name} — eco-friendly plant gift`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-neutral-900 text-sm truncate">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-neutral-600">{product.rating} ({product.reviewCount})</span>
                  </div>
                  <span className="font-semibold text-neutral-900 mt-1.5 block">₹{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">Eco-Friendly Gifting FAQs</h2>
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

        <section className="text-center bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 rounded-3xl p-10 sm:p-14">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Gift Green. Feel Good.</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Make your next gift one that matters — for the person and the planet. Starting at ₹220.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all">
              <Leaf className="w-4 h-4" /> Shop Eco-Friendly Gifts
            </Link>
            <a href={WHATSAPP_URL("Hi! I want to order eco-friendly plant gifts.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp Order
            </a>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Plant Bouquet", href: "/plant-bouquet" },
              { label: "Plant Gifts Chandigarh", href: "/plant-gifts-chandigarh" },
              { label: "Corporate Plant Gifts", href: "/corporate-plant-gifts" },
              { label: "Return Gift Plants", href: "/plant-return-gifts" },
              { label: "College Event Plants", href: "/college-event-plant-gifts" },
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
