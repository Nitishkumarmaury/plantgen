"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import {
  Truck, Gift, Shield, Star, Building2, Users, Award, Calendar,
  ChevronRight, MessageCircle, Banknote, CheckCircle2,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const corporateProducts = products
  .filter((p) => p.category === "Corporate Gifts" || p.tags?.includes("corporate") || p.tags?.includes("office"))
  .slice(0, 8);

const fallbackProducts = corporateProducts.length < 4
  ? products.filter((p) => p.bestSeller || p.featured).slice(0, 8)
  : corporateProducts;

const faqs = [
  {
    q: "What is the minimum order for corporate plant gifts?",
    a: "We offer corporate plant gifts starting from just 10 plants. For orders of 25+, we provide special bulk pricing starting at ₹199/plant. Contact us for custom quotes on larger orders.",
  },
  {
    q: "Can you add our company branding to the plants?",
    a: "Yes! We offer custom branding options including branded plant pots, company logo cards, and custom message inserts. Available for orders of 25+ plants.",
  },
  {
    q: "What types of plants work best for corporate gifting?",
    a: "Desk plants like Money Plant, Snake Plant, and Lucky Bamboo are most popular for corporate gifts. They're low maintenance, air-purifying, and fit perfectly on office desks.",
  },
  {
    q: "Do you deliver to IT Park Chandigarh and business offices?",
    a: "Yes! We deliver to all offices in IT Park Chandigarh, Industrial Area, Elante mall area, and all sectors in Chandigarh, Mohali, Panchkula, and Zirakpur.",
  },
  {
    q: "How do I place a bulk corporate order?",
    a: "Simply fill out our custom order form or WhatsApp us with your requirements — number of plants, budget, occasion, and delivery date. We'll share a custom quote within 2 hours.",
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

export default function CorporatePlantGiftsPage() {
  return (
    <div className="pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium">Corporate Plant Gifts</span>
        </nav>

        {/* Hero */}
        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              50+ Companies Trust Plantgen
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight mb-5">
              Corporate Plant Gifts — <span className="text-brand-600">Impress Without the Waste</span>
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-8">
              Stop giving mugs and diaries that end up in drawers. Start giving desk plants that sit
              on employee desks for years — reminding them of your brand every single day. Bulk
              pricing from ₹199/plant. Custom branding available. Same-day delivery across Chandigarh & Tricity.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/custom-order" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all">
                <Gift className="w-4 h-4" /> Request Bulk Quote
              </Link>
              <a href={WHATSAPP_URL("Hi Plantgen! I need corporate plant gifts for my company.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp for Bulk Order
              </a>
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Same-Day Delivery", sub: "Offices & events" },
              { icon: Banknote, label: "From ₹199/plant", sub: "Bulk pricing" },
              { icon: Gift, label: "Custom Branding", sub: "Logo & message cards" },
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

        {/* Corporate Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            How Companies Use Plantgen
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            From IT startups to established enterprises — here&apos;s how businesses across Chandigarh
            use plant gifts to build culture, impress clients, and stand out.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Users, title: "Employee Welcome Kits", desc: "Make day one memorable. A desk plant in a branded pot says 'we care about you.' New joiners remember this for years.", price: "From ₹249/plant" },
              { icon: Building2, title: "Client Appreciation", desc: "Stop sending generic hampers. A premium plant gift on a client's desk reminds them of your brand every day. Way better than a diary.", price: "From ₹349/plant" },
              { icon: Award, title: "Event Return Gifts", desc: "Conferences, seminars, award ceremonies — end with a green gift that attendees actually keep and talk about.", price: "From ₹199/plant" },
              { icon: Calendar, title: "Festival & Occasion Gifting", desc: "Diwali, New Year, Holi, Christmas — replace generic gift boxes with plant gifts that are unique, eco-friendly, and unforgettable.", price: "From ₹299/plant" },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white border border-neutral-100 rounded-2xl hover:shadow-md transition-shadow">
                <item.icon className="w-7 h-7 text-brand-600 mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 mb-3">{item.desc}</p>
                <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="mb-16 bg-gradient-to-br from-brand-50 to-teal-50 rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-4">
            Corporate Bulk Pricing
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {[
              { range: "10-24 Plants", price: "₹249/plant", features: ["Free gift wrapping", "Message cards", "Same-day delivery"] },
              { range: "25-49 Plants", price: "₹219/plant", features: ["Everything in 10-24", "Custom branded cards", "Priority delivery"] },
              { range: "50+ Plants", price: "₹199/plant", features: ["Everything in 25-49", "Branded pots available", "Dedicated coordinator"] },
            ].map((tier) => (
              <div key={tier.range} className="bg-white p-6 rounded-2xl border border-neutral-100">
                <h3 className="font-semibold text-neutral-900 mb-1">{tier.range}</h3>
                <p className="text-2xl font-bold text-brand-600 mb-4">{tier.price}</p>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/custom-order" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 transition-all">
              Get Custom Quote <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            Popular Corporate Gift Plants
          </h2>
          <p className="text-neutral-600 mb-8">Low maintenance. Desk-friendly. Air-purifying. Perfect for offices.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {fallbackProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square bg-neutral-50">
                  <Image src={product.imageUrl} alt={`${product.name} — corporate plant gift`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
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

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">Corporate Plant Gifting FAQs</h2>
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

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 rounded-3xl p-10 sm:p-14">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Elevate Your Corporate Gifting</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Join 50+ companies in Chandigarh who&apos;ve switched to plant gifting. Bulk pricing from ₹199/plant.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/custom-order" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all">
              <Gift className="w-4 h-4" /> Request Bulk Quote
            </Link>
            <a href={WHATSAPP_URL("Hi! I need corporate plant gifts for my company.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp Order
            </a>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Plant Bouquet", href: "/plant-bouquet" },
              { label: "Plant Gifts Chandigarh", href: "/plant-gifts-chandigarh" },
              { label: "Eco-Friendly Gifts", href: "/eco-friendly-gifts" },
              { label: "Return Gift Plants", href: "/plant-return-gifts" },
              { label: "Welcome Plant Gifts", href: "/welcome-plant-gifts" },
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
