"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import {
  Truck, Gift, Shield, Star, Leaf, Heart, Users, Sparkles,
  ChevronRight, MessageCircle, Banknote,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const returnGiftProducts = products.filter((p) => p.price <= 400).slice(0, 8);
const displayProducts = returnGiftProducts.length < 4
  ? products.filter((p) => p.bestSeller || p.featured).slice(0, 8)
  : returnGiftProducts;

const faqs = [
  {
    q: "What makes plants a good return gift?",
    a: "Plants are unique, eco-friendly, and memorable. Unlike generic chocolates or plastic items, a plant sits on their desk or windowsill — reminding them of your event for months. They're the return gift people actually keep.",
  },
  {
    q: "What is the minimum order for bulk return gifts?",
    a: "We accept return gift orders starting from 10 plants. For 25+ plants, we offer bulk pricing from ₹199/plant. For 50+, we provide further discounts with custom branding.",
  },
  {
    q: "Which plants work best as return gifts?",
    a: "Small succulents, money plants, and jade plants are our most popular return gifts. They're compact, beautiful, easy to care for, and fit any budget.",
  },
  {
    q: "Can you deliver return gifts to event venues in Chandigarh?",
    a: "Yes! We deliver to all event venues, hotels, banquet halls, and community centres across Chandigarh, Mohali, Panchkula, and Zirakpur. Same-day delivery for orders placed before 2 PM.",
  },
  {
    q: "Do return gift plants come with packaging?",
    a: "Every plant return gift comes in beautiful eco-friendly packaging — ready to hand out to guests. No additional wrapping needed. Custom message cards available for bulk orders.",
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

export default function PlantReturnGiftsPage() {
  return (
    <div className="pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium">Plant Return Gifts</span>
        </nav>

        <header className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              Return Gifts That Get Talked About
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight mb-5">
              Plant Return Gifts — <span className="text-brand-600">The Gift Guests Actually Keep</span>
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-8">
              Stop giving return gifts that end up in drawers. Plant return gifts sit on desks,
              windowsills, and balconies — reminding every guest of your event for months. Perfect
              for weddings, birthdays, corporate events, and parties. Bulk pricing from ₹199/plant.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/custom-order" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all">
                <Gift className="w-4 h-4" /> Order Return Gifts
              </Link>
              <a href={WHATSAPP_URL("Hi Plantgen! I need plant return gifts for my event.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp for Bulk
              </a>
            </div>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: "Venue Delivery", sub: "Events & venues" },
              { icon: Banknote, label: "From ₹199/plant", sub: "Bulk pricing" },
              { icon: Gift, label: "Ready Packaging", sub: "Gift-ready plants" },
              { icon: Shield, label: "Freshness Guarantee", sub: "Same-day packaging" },
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
            Why Plant Return Gifts Win Every Time
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Heart, title: "Guests Actually Keep Them", desc: "Unlike chocolates that get eaten or trinkets that get tossed, plants get placed on desks and windowsills. Guests remember your event every time they see it." },
              { icon: Users, title: "Talk of the Event", desc: "When was the last time someone talked about a return gift? Plant gifts start conversations. Your guests will share photos and tell friends about your unique idea." },
              { icon: Sparkles, title: "Instagram-Worthy", desc: "Beautiful plant gifts in premium packaging = photos on Instagram and WhatsApp stories. Free marketing for your event." },
              { icon: Leaf, title: "Eco-Friendly", desc: "Zero plastic waste, zero guilt. Show your guests you care about the planet — it reflects your values and elevates your event." },
              { icon: Star, title: "Budget-Friendly", desc: "Starting at ₹199/plant — often cheaper than generic return gift hampers. Better quality, lower cost." },
              { icon: Gift, title: "Ready to Distribute", desc: "Every plant comes gift-ready in beautiful packaging. No need for additional wrapping. Just hand them out to guests." },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-white border border-neutral-100 rounded-2xl hover:shadow-md transition-shadow">
                <item.icon className="w-6 h-6 text-brand-600 mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Event types */}
        <section className="mb-16 bg-gradient-to-br from-brand-50 to-teal-50 rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">
            Plant Return Gifts for Every Event
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { emoji: "💍", title: "Wedding Return Gifts", desc: "Gift your wedding guests something they'll treasure for years. Small succulents or lucky bamboo in decorative pots." },
              { emoji: "🎂", title: "Birthday Party", desc: "Make your birthday party memorable. Mini plants as return gifts — kids and adults love them." },
              { emoji: "🏢", title: "Corporate Events", desc: "Conferences, seminars, product launches — end with a green return gift that attendees actually keep on their desk." },
              { emoji: "🎓", title: "College Events", desc: "Farewell, freshers, club events — unique return gifts that students will keep in their hostel rooms." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-neutral-100">
                <span className="text-3xl block mb-3">{item.emoji}</span>
                <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">Budget-Friendly Return Gift Plants</h2>
          <p className="text-neutral-600 mb-8">Perfect for bulk orders — beautiful, affordable, and gift-ready.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square bg-neutral-50">
                  <Image src={product.imageUrl} alt={`${product.name} — plant return gift`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
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
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">Return Gift FAQs</h2>
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
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Order Return Gift Plants in Bulk</h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">From ₹199/plant. Eco-friendly packaging. Venue delivery available across Chandigarh & Tricity.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/custom-order" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all">
              <Gift className="w-4 h-4" /> Order Return Gifts
            </Link>
            <a href={WHATSAPP_URL("Hi! I need plant return gifts for my event.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors">
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
              { label: "College Event Plants", href: "/college-event-plant-gifts" },
              { label: "Welcome Plant Gifts", href: "/welcome-plant-gifts" },
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
