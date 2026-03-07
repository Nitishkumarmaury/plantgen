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
  Building2,
  MessageCircle,
  ChevronRight,
  MapPin,
  Clock,
  Banknote,
  CheckCircle2,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const bestSellers = products
  .filter((p) => p.bestSeller || p.featured)
  .slice(0, 8);

const occasions = [
  {
    name: "Birthday",
    emoji: "🎂",
    href: "/plant-gifts/birthday",
    desc: "Surprise them with a gift that grows",
  },
  {
    name: "Anniversary",
    emoji: "💍",
    href: "/plant-gifts/anniversary",
    desc: "A living symbol of your love",
  },
  {
    name: "Housewarming",
    emoji: "🏡",
    href: "/plant-gifts/housewarming",
    desc: "Welcome them to their new home",
  },
  {
    name: "Corporate",
    emoji: "🏢",
    href: "/shop?category=Corporate%20Gifts",
    desc: "Impress clients & welcome employees",
  },
  {
    name: "Get Well Soon",
    emoji: "💚",
    href: "/plant-gifts/get-well-soon",
    desc: "Healing greenery for recovery",
  },
  {
    name: "Festivals",
    emoji: "🪔",
    href: "/plant-gifts/diwali",
    desc: "Eco-friendly festive gifting",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Sector 22, Chandigarh",
    text: "Ordered a Snake Plant for my mom's birthday. The packaging was stunning — came in a gift bag with a handwritten note. She loved it!",
    rating: 5,
    image: "/reviews/customer-1.jpg",
  },
  {
    name: "Rohit Verma",
    location: "Phase 8, Mohali",
    text: "We ordered 25 desk plants for office welcome kits. Delivered on time with custom cards. Our new joiners were genuinely surprised!",
    rating: 5,
    image: "/reviews/customer-2.jpg",
  },
  {
    name: "Simran Kaur",
    location: "Sector 15, Chandigarh",
    text: "Ordered 10 plants as Diwali gifts. Each came in gorgeous printed bags — felt so premium. Relatives kept asking where I got them!",
    rating: 5,
    image: "/reviews/customer-3.jpg",
  },
];

const faqs = [
  {
    q: "Do you deliver plant gifts in Chandigarh same day?",
    a: "Yes! We offer same-day plant gift delivery across Chandigarh, Mohali, and Panchkula for orders placed before 2 PM. Our delivery team ensures every plant arrives fresh and beautifully packaged.",
  },
  {
    q: "What is the starting price for plant gifts in Chandigarh?",
    a: "Our plant gifts start at just ₹220. We have a wide range from ₹220 to ₹1,500+ including desk plants, flowering plants, succulents, and premium gift hampers. All include free gift wrapping.",
  },
  {
    q: "Can I send a plant gift online to someone in Chandigarh?",
    a: "Absolutely. Simply browse our collection, add to cart, and enter the delivery address in Chandigarh, Mohali, or Panchkula. You can also order directly via WhatsApp — no login needed.",
  },
  {
    q: "Do you offer corporate plant gifting in Chandigarh?",
    a: "Yes! We specialize in corporate plant gifts — employee welcome kits, client appreciation gifts, event giveaways, and office desk plants. Bulk pricing and custom branding available for orders of 10+ plants.",
  },
  {
    q: "Is Cash on Delivery available for plant gifts in Chandigarh?",
    a: "Yes, we offer Cash on Delivery (COD) across all delivery areas in Chandigarh, Mohali, Panchkula, and Zirakpur. Pay when your plant gift is delivered.",
  },
  {
    q: "What makes plant gifts better than traditional gifts?",
    a: "Plant gifts are eco-friendly, long-lasting, and meaningful. Unlike flowers that wilt in days or chocolates that get eaten, a plant grows alongside your relationship — purifying air and brightening spaces for years.",
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

export default function PlantGiftsChandigarhPage() {
  return (
    <div className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
        >
          <Link href="/" className="hover:text-brand-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium">
            Plant Gifts Chandigarh
          </span>
        </nav>

        {/* Hero Section */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
              #1 Plant Gifting in Chandigarh
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight mb-5">
              Plant Gifts Chandigarh —{" "}
              <span className="text-brand-600">Same-Day Delivery</span>
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-8">
              Replace boring, forgettable gifts with beautiful, living plants
              that purify air and grow alongside your relationships. Send
              meaningful plant gifts across Chandigarh, Mohali & Panchkula —
              starting at just ₹220 with free gift wrapping and same-day
              delivery.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all"
              >
                <Gift className="w-4 h-4" />
                Send a Plant Gift Now
              </Link>
              <a
                href={WHATSAPP_URL(
                  "Hi Plantgen! I want to send a plant gift in Chandigarh."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Trust strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                icon: Truck,
                label: "Same-Day Delivery",
                sub: "Order before 2 PM",
              },
              {
                icon: Banknote,
                label: "Cash on Delivery",
                sub: "Pay when delivered",
              },
              {
                icon: Gift,
                label: "Free Gift Wrapping",
                sub: "Premium packaging",
              },
              {
                icon: Shield,
                label: "Plant Guarantee",
                sub: "Healthy or replaced",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100"
              >
                <item.icon className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-neutral-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Why Plant Gifts */}
        <section className="mb-16">
          {/* Real Customer Moments Banner */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-100 shadow-sm group">
              <Image
                src="/reviews/gifting-moment-1.jpg"
                alt="Real plant gift delivery to customer in Chandigarh"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-wider">
                  Real Customer
                </span>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-100 shadow-sm group">
              <Image
                src="/reviews/gifting-moment-2.jpg"
                alt="Happy customer receiving Plantgen plant gift in Tricity"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] font-bold text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-wider">
                  Gift Moment
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            Why Choose Plant Gifts Over Traditional Gifts?
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            In a world of plastic gifts and throwaway presents, plant gifts
            stand out as meaningful, eco-friendly alternatives. Here&apos;s why
            thousands of people in Chandigarh are switching to plant gifting:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Leaf,
                title: "Eco-Friendly & Sustainable",
                desc: "Zero plastic waste. A gift that purifies air instead of filling landfills.",
              },
              {
                icon: Heart,
                title: "Emotionally Meaningful",
                desc: "A plant grows with your relationship — a living reminder of your love.",
              },
              {
                icon: Clock,
                title: "Lasts for Years",
                desc: "Unlike flowers that wilt in days, plants thrive for years with minimal care.",
              },
              {
                icon: Star,
                title: "Unique & Memorable",
                desc: "Stand out from generic gifts. Be the person everyone remembers.",
              },
              {
                icon: Building2,
                title: "Perfect for Corporate",
                desc: "Professional, impressive, and promotes workplace wellness.",
              },
              {
                icon: MapPin,
                title: "Local Delivery in Chandigarh",
                desc: "Same-day delivery across Chandigarh, Mohali, Panchkula & Zirakpur.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 bg-white border border-neutral-100 rounded-2xl hover:shadow-md transition-shadow"
              >
                <item.icon className="w-6 h-6 text-brand-600 mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Products */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            Most Popular Plant Gifts in Chandigarh
          </h2>
          <p className="text-neutral-600 mb-8">
            Our most-loved plants — handpicked by Chandigarh customers.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square bg-neutral-50">
                  <Image
                    src={product.imageUrl}
                    alt={`${product.name} — plant gift delivery in Chandigarh`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {product.originalPrice && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      %
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-neutral-900 text-sm truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-neutral-600">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-semibold text-neutral-900">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white font-medium rounded-full hover:bg-neutral-800 transition-colors"
            >
              View All Plants
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Shop by Occasion */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            Plant Gifts for Every Occasion
          </h2>
          <p className="text-neutral-600 mb-8">
            Whether it&apos;s a birthday, anniversary, housewarming, or
            corporate event — we have the perfect plant gift.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {occasions.map((occ) => (
              <Link
                key={occ.name}
                href={occ.href}
                className="p-5 bg-neutral-50 border border-neutral-100 rounded-2xl hover:bg-brand-50 hover:border-brand-200 transition-all group"
              >
                <span className="text-3xl mb-3 block">{occ.emoji}</span>
                <h3 className="font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors">
                  {occ.name}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{occ.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Delivery Info */}
        <section className="mb-16 bg-gradient-to-br from-brand-50 to-teal-50 rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-4">
            Same-Day Plant Delivery in Chandigarh, Mohali & Panchkula
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">
                Delivery Areas
              </h3>
              <ul className="space-y-2">
                {[
                  "All Sectors in Chandigarh (1–63)",
                  "Mohali — Phase 1 to Phase 11, IT City",
                  "Panchkula — All sectors",
                  "Zirakpur, Kharar, Dera Bassi",
                  "Chandigarh University (Gharuan)",
                ].map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2 text-neutral-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">
                How It Works
              </h3>
              <ol className="space-y-3">
                {[
                  "Choose a plant gift from our collection or WhatsApp us",
                  "Add delivery address & personal message",
                  "We package beautifully with free gift wrapping",
                  "Same-day delivery for orders before 2 PM",
                  "Pay via Cash on Delivery — zero risk",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-3">
            What Chandigarh Customers Say
          </h2>
          <p className="text-neutral-600 mb-8">
            Trusted by 1,000+ happy customers across Chandigarh & Tricity
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 bg-white border border-neutral-100 rounded-2xl"
              >
                {t.image && (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-neutral-100">
                    <Image
                      src={t.image}
                      alt={`${t.name} — customer review for Plantgen plant gift in Chandigarh`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-neutral-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mb-6">
            Frequently Asked Questions — Plant Gifts Chandigarh
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-neutral-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 transition-colors font-medium text-neutral-900">
                  {faq.q}
                  <span className="ml-2 text-neutral-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <p className="px-4 pb-4 text-neutral-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 rounded-3xl p-10 sm:p-14">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            Send a Plant Gift in Chandigarh Today
          </h2>
          <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
            Starting at just ₹220 with free gift wrapping and same-day
            delivery. Make someone&apos;s day with a living, meaningful gift.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all"
            >
              <Gift className="w-4 h-4" />
              Shop Plant Gifts
            </Link>
            <a
              href={WHATSAPP_URL(
                "Hi! I want to order a plant gift for delivery in Chandigarh."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Order
            </a>
            <Link
              href="/custom-order"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-neutral-600 text-neutral-300 font-medium rounded-full hover:bg-neutral-800 transition-colors"
            >
              Custom / Bulk Order
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Explore More
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Indoor Plants", href: "/shop?category=Indoor%20Plants" },
              { label: "Desk Plants", href: "/shop?category=Desk%20Plants" },
              { label: "Flowering Plants", href: "/shop?category=Flowering%20Plants" },
              { label: "Succulents", href: "/shop?category=Succulents" },
              { label: "Corporate Gifts", href: "/shop?category=Corporate%20Gifts" },
              { label: "Birthday Plant Gifts", href: "/plant-gifts/birthday" },
              { label: "Anniversary Gifts", href: "/plant-gifts/anniversary" },
              { label: "Housewarming Gifts", href: "/plant-gifts/housewarming" },
              { label: "Plants for Bedroom", href: "/plants-for/bedroom" },
              { label: "Plants for Office", href: "/plants-for/office" },
              { label: "Plant Delivery Mohali", href: "/plant-delivery/mohali" },
              { label: "Plant Delivery Panchkula", href: "/plant-delivery/panchkula" },
              { label: "Custom Order", href: "/custom-order" },
              { label: "About Plantgen", href: "/about" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 bg-neutral-50 text-sm text-neutral-700 rounded-full border border-neutral-200 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
