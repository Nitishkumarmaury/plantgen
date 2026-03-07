"use client";

import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { Star, Quote, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Gifted for Birthday",
    location: "Chandigarh",
    date: "Feb 2026",
    content:
      "Ordered a Snake Plant for my mom's birthday and she absolutely loved it! The packaging was beautiful — came in a floral gift bag with a handwritten note. Way better than another boring wallet or photo frame. She keeps it on her bedside table now.",
    rating: 5,
    verified: true,
  },
  {
    name: "Rohit Verma",
    role: "Corporate Order — 25 Plants",
    location: "Mohali",
    date: "Jan 2026",
    content:
      "We ordered 25 desk plants for our office welcome kits. Plantgen delivered all of them on time, each with a custom card with our company logo. Quality was top-notch. Our new joiners were genuinely surprised — best onboarding gift we've ever done.",
    rating: 5,
    verified: true,
  },
  {
    name: "Amandeep Kaur",
    role: "Anniversary Gift",
    location: "Panchkula",
    date: "Dec 2025",
    content:
      "Got the Couple's Zen Garden for our 3rd anniversary. My husband isn't into flowers but he genuinely loved this — it's still sitting on our dining table. The succulent is growing beautifully. Such a unique and meaningful gift idea!",
    rating: 5,
    verified: true,
  },
  {
    name: "Vikram Singh",
    role: "Housewarming Gift",
    location: "Zirakpur",
    date: "Mar 2026",
    content:
      "Sent the Air Purifier Trio to a friend's new flat. They texted me saying it was hands down the best housewarming gift they received. Same-day delivery was a lifesaver since I almost forgot! Definitely my go-to gift shop now.",
    rating: 5,
    verified: true,
  },
  {
    name: "Simran Kaur",
    role: "Festival Gifting — Diwali",
    location: "Chandigarh",
    date: "Nov 2025",
    content:
      "Ordered 10 plants as Diwali gifts for family. Each one came in their gorgeous printed bags — felt so premium. My relatives were all asking where I got them from. Way more thoughtful than boxes of sweets that nobody eats!",
    rating: 5,
    verified: true,
  },
  {
    name: "Dr. Manpreet Gill",
    role: "Clinic Décor Order",
    location: "Mohali",
    date: "Feb 2026",
    content:
      "I placed a bulk order for my dental clinic — 8 plants for the waiting area and reception. Patients constantly compliment the greenery now. Plantgen helped me choose the right low-maintenance varieties. Highly recommend for any office or clinic.",
    rating: 5,
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-warm-600 uppercase tracking-widest">
            Real Customer Stories
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-neutral-500 text-sm sm:text-base max-w-xl mx-auto">
            Trusted by 1,000+ happy customers across Chandigarh, Mohali, Panchkula &amp; Zirakpur
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="bg-white rounded-2xl p-6 border border-warm-100/60 h-full flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <Quote className="w-7 h-7 text-warm-300 mb-4 flex-shrink-0" />
                <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-warm-100/40">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                    {t.verified && (
                      <BadgeCheck className="w-4 h-4 text-brand-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{t.role}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    {t.location} · {t.date}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Exhibition Social Proof */}
        <FadeIn>
          <div className="bg-white rounded-2xl border border-warm-100/60 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src="/about/ignite-exhibition.jpg"
                  alt="Plantgen at IGNITE Startup Exhibition — Chandigarh University"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full w-fit mb-3 uppercase tracking-wider">
                  Featured At
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                  IGNITE Startup Exhibition
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Plantgen was selected to showcase at Chandigarh University&apos;s
                  IGNITE Startup Exhibition — presented by the Technology Business
                  Incubator. We demonstrated our customized plant gifting solutions
                  for corporate events, celebrations, and welcome kits.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Chandigarh University", "Startup Exhibition", "Technology Business Incubator"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
