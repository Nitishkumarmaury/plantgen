"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import {
  Truck, Gift, Star, Leaf, Home, Briefcase, Heart,
  ChevronRight, MessageCircle, Banknote, Users, CheckCircle2,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const giftProducts = products.filter((p) => p.price <= 600).slice(0, 8);
const displayProducts = giftProducts.length < 4
  ? products.filter((p) => p.bestSeller || p.featured).slice(0, 8)
  : giftProducts;

const faqs = [
  {
    q: "Why are plants a good welcome gift?",
    a: "Plants symbolize growth, fresh beginnings, and warmth. Unlike generic gifts, a plant sits on a desk or windowsill — welcoming them every day. It's a silent message: 'We care about your growth here.'",
  },
  {
    q: "Which plants are best for welcome kits?",
    a: "Money plants, small succulents, and jade plants are our top welcome gift picks. They're low-maintenance (perfect for busy new joiners), compact enough for any desk, and bring positive energy.",
  },
  {
    q: "Can you add our company branding?",
    a: "Yes! For orders of 25+, we offer custom message cards with your company logo. For 50+, we can add branded pot sleeves or custom labels.",
  },
  {
    q: "What's the lead time for bulk welcome kits?",
    a: "We recommend 5-7 days for bulk custom kits with branding. For standard plant gifts without customization, we can deliver within 24-48 hours.",
  },
  {
    q: "Do you deliver to IT parks and office complexes?",
    a: "Absolutely! We deliver to all IT parks (Chandigarh IT Park, Quark City, Infosys Chandigarh, Mohali Phase 8), office complexes, and co-working spaces across Chandigarh & Tricity.",
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

export default function WelcomePlantGiftsPage() {
  return (
    <div className="pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium">Welcome Plant Gifts</span>
        </nav>

        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              First Impressions That Grow
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight mb-5">
              Welcome Plant Gifts — <span className="text-brand-600">Start Every Chapter with Growth</span>
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-8">
              Welcome new employees, new neighbours, or honoured guests with a living plant gift.
              It says &ldquo;we&apos;re glad you&apos;re here&rdquo; in a way no card can. Bulk pricing from ₹199/plant
              with delivery across Chandigarh, Mohali, and Panchkula.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/custom-order" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all">
                <Gift className="w-4 h-4" /> Order Welcome Gifts
              </Link>
              <a href={WHATSAPP_URL("Hi Plantgen! I need welcome plant gifts.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp for Bulk
              </a>
            </div>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Office Delivery", sub: "IT parks & campuses" },
              { icon: Banknote, label: "From ₹199/plant", sub: "Bulk pricing" },
              { icon: Leaf, label: "Low Maintenance", sub: "Desk-friendly plants" },
              { icon: Gift, label: "Custom Branding", sub: "Logo & message cards" },
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

        {/* Use cases */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">
            Welcome Plant Gifts For Every Occasion
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Briefcase, title: "Employee Onboarding", color: "bg-blue-50 text-blue-600",
                desc: "Add a plant to your welcome kit. It sits on their new desk from Day 1 — a daily reminder that they've joined a company that cares. Perfect for startups and IT companies in Chandigarh.",
              },
              {
                icon: Home, title: "Housewarming Gifts", color: "bg-amber-50 text-amber-600",
                desc: "Welcome someone to their new home with a gift that makes it feel alive. Indoor plants are the most thoughtful housewarming gifts — better than showpieces that collect dust.",
              },
              {
                icon: Users, title: "Guest Welcome", color: "bg-teal-50 text-teal-600",
                desc: "Hotels, events, conferences — welcome guests with a green gift they can take home. Elevates the experience and creates lasting impressions.",
              },
              {
                icon: Heart, title: "New Neighbour Welcome", color: "bg-rose-50 text-rose-600",
                desc: "Moving to a new society or locality? Welcome new neighbours with a plant. It's warm, thoughtful, and starts relationships on the right note.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-neutral-100 hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${item.color} mb-4`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why section */}
        <section className="mb-16 bg-gradient-to-br from-brand-50 to-teal-50 rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">
            Why a Plant Says &ldquo;Welcome&rdquo; Better
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { check: "Grows with them — symbolises their new journey" },
              { check: "Sits on their desk or windowsill — daily reminder" },
              { check: "Low maintenance — won't add stress to a new start" },
              { check: "Eco-friendly — no plastic waste, zero guilt" },
              { check: "Customizable — add your brand or a personal message" },
              { check: "Budget-friendly — from ₹199, looks like ₹500+" },
            ].map((item) => (
              <div key={item.check} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-700">{item.check}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">Popular Welcome Gift Plants</h2>
          <p className="text-neutral-600 mb-8">Desk-friendly, low-maintenance, and beautifully packaged.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square bg-neutral-50">
                  <Image src={product.imageUrl} alt={`${product.name} — welcome plant gift`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
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
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">Welcome Gift FAQs</h2>
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
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Order Welcome Plant Gifts</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Bulk pricing from ₹199/plant. Custom branding available. Delivery to offices & IT parks across Chandigarh.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/custom-order" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all">
              <Gift className="w-4 h-4" /> Order Now
            </Link>
            <a href={WHATSAPP_URL("Hi! I need welcome plant gifts for my organization.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp Order
            </a>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Plant Bouquet", href: "/plant-bouquet" },
              { label: "Corporate Plant Gifts", href: "/corporate-plant-gifts" },
              { label: "Plant Return Gifts", href: "/plant-return-gifts" },
              { label: "Eco-Friendly Gifts", href: "/eco-friendly-gifts" },
              { label: "Plant Gifts Chandigarh", href: "/plant-gifts-chandigarh" },
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
