"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Gifted for Birthday",
    content:
      "Ordered a Birthday Bloom Snake Plant for my mom. She loved it! Beautiful packaging and the plant was so fresh. Way better than another boring wallet.",
    rating: 5,
  },
  {
    name: "Rohit Verma",
    role: "Corporate Order",
    content:
      "We ordered 25 desk plants for our office welcome kits. Plantgen delivered on time with excellent quality. Our new joiners loved them!",
    rating: 5,
  },
  {
    name: "Amandeep Kaur",
    role: "Anniversary Gift",
    content:
      "The Couple's Zen Garden was gorgeous. My partner and I both loved it. Such a unique anniversary gift idea — so much better than flowers that die.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Housewarming Gift",
    content:
      "Sent the Air Purifier Trio for my friend's housewarming. They said it was the best gift they received. Will definitely order again!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-warm-600 uppercase tracking-widest">
            Happy Gifters
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
            What Our Customers Say
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
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
                  <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
