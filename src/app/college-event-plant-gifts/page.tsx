"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import {
  Truck, Gift, Star, Leaf, GraduationCap, Music, Heart,
  ChevronRight, MessageCircle, Banknote, Users, Sparkles,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const giftProducts = products.filter((p) => p.price <= 500).slice(0, 8);
const displayProducts = giftProducts.length < 4
  ? products.filter((p) => p.bestSeller || p.featured).slice(0, 8)
  : giftProducts;

const faqs = [
  {
    q: "Can you deliver to Chandigarh University campus?",
    a: "Absolutely! We deliver to Chandigarh University (CU), Chitkara, PEC, GGDSD, Punjab University, and all Tricity campuses. Same-day delivery for orders placed before 2 PM.",
  },
  {
    q: "What's the best plant gift for a college farewell?",
    a: "Small succulents and jade plants are the most popular farewell gifts. They symbolize growth and new beginnings — perfect for seniors moving to the next chapter.",
  },
  {
    q: "What's the minimum order for college events?",
    a: "We accept orders starting from 10 plants for events. For 25+ plants, we offer bulk pricing from ₹199/plant. Perfect for clubs and event committees on a budget.",
  },
  {
    q: "Can we customize the pots or message cards?",
    a: "Yes! For orders of 25+, we offer custom message cards with your club name, event theme, or personal message. Custom pot colors and branding available for 50+ orders.",
  },
  {
    q: "How far in advance should we order?",
    a: "We recommend ordering 3-5 days before your event for the best selection. However, we can handle last-minute orders with same-day delivery for available stock.",
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

export default function CollegeEventPlantGiftsPage() {
  return (
    <div className="pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium">College Event Plant Gifts</span>
        </nav>

        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              Campus Favourites
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight mb-5">
              Plant Gifts for College Events — <span className="text-brand-600">Gift Something They&apos;ll Keep in Their Room</span>
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-8">
              Farewell, freshers, fests, club events — stand out from boring gifts. Plant gifts are
              unique, budget-friendly, and actually get kept in hostel rooms and PGs. Bulk pricing
              from ₹199/plant with delivery to all Chandigarh &amp; Tricity campuses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/custom-order" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all">
                <Gift className="w-4 h-4" /> Order for Your Event
              </Link>
              <a href={WHATSAPP_URL("Hi Plantgen! I need bulk plant gifts for a college event.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Campus Delivery", sub: "All Tricity colleges" },
              { icon: Banknote, label: "From ₹199/plant", sub: "Bulk pricing" },
              { icon: Users, label: "10+ Plants", sub: "Min. event order" },
              { icon: Gift, label: "Gift-Ready", sub: "No wrapping needed" },
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

        {/* College event types */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">
            Perfect For Every College Occasion
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: GraduationCap, title: "Farewell Gifts", color: "bg-amber-50 text-amber-600",
                desc: "Give seniors a gift that symbolizes growth & new beginnings. Small succulents and jade plants are farewell favourites — they'll keep them at their new apartment or office.",
              },
              {
                icon: Sparkles, title: "Freshers Party Gifts", color: "bg-purple-50 text-purple-600",
                desc: "Welcome juniors with a plant — a refreshing change from the usual gifts. Mini money plants and terrariums are Instagram-worthy and hostel-room-friendly.",
              },
              {
                icon: Music, title: "Fest & Club Events", color: "bg-teal-50 text-teal-600",
                desc: "Awards, competitions, cultural fests — plant trophies and gifts that winners actually display. Perfect for eco-conscious clubs making a statement.",
              },
              {
                icon: Heart, title: "Appreciation & Thank-You", color: "bg-rose-50 text-rose-600",
                desc: "Thank volunteers, speakers, faculty, or sponsors with a living gift. More thoughtful than certificates, more lasting than flowers.",
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

        {/* Why plants section */}
        <section className="mb-16 bg-gradient-to-br from-brand-50 to-teal-50 rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">
            Why College Students Love Plant Gifts
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Leaf, title: "Low Maintenance", desc: "Students are busy. Our plants need water just once a week — perfect for hostel life." },
              { icon: Star, title: "Instagram-Worthy", desc: "Mini plants look great in photos. Your event gets free social media coverage." },
              { icon: Banknote, title: "Budget-Friendly", desc: "From ₹199/plant. A committee-approved budget that looks 10x more premium." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-5 rounded-2xl border border-neutral-100">
                <item.icon className="w-6 h-6 text-brand-600 mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">Top Picks for College Events</h2>
          <p className="text-neutral-600 mb-8">Budget-friendly, hostel-friendly, and gift-ready.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square bg-neutral-50">
                  <Image src={product.imageUrl} alt={`${product.name} — college event plant gift`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
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
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">
            College Event Plant Gift FAQs
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

        <section className="text-center bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 rounded-3xl p-10 sm:p-14">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Plan Your College Event Gifts</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Bulk pricing from ₹199/plant. Direct delivery to all Chandigarh & Tricity campuses.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/custom-order" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all">
              <Gift className="w-4 h-4" /> Order Now
            </Link>
            <a href={WHATSAPP_URL("Hi! I need plant gifts for a college event.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp Order
            </a>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Plant Bouquet", href: "/plant-bouquet" },
              { label: "Plant Return Gifts", href: "/plant-return-gifts" },
              { label: "Corporate Plant Gifts", href: "/corporate-plant-gifts" },
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
