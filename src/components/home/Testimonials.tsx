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
    <section className="py-20 bg-sage-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <span className="text-sm font-medium text-brand-600 tracking-wide uppercase">
            Happy Gifters
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-sage-900 tracking-tight">
            What Our Customers Say
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="bg-white rounded-2xl p-6 border border-sage-100 h-full flex flex-col">
                <Quote className="w-8 h-8 text-brand-200 mb-3 flex-shrink-0" />
                <p className="text-sm text-sage-600 leading-relaxed flex-1">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-sage-50">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-earth-400 text-earth-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-sage-900">{t.name}</p>
                  <p className="text-xs text-sage-500">{t.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
