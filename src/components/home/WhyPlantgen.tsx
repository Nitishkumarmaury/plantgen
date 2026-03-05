"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { Leaf, Palette, IndianRupee, Truck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description:
      "Replace plastic gifts with living, breathing plants that purify air and bring joy.",
  },
  {
    icon: Palette,
    title: "Customizable",
    description:
      "Add personal messages, choose gift wraps, and pick the perfect plant for any occasion.",
  },
  {
    icon: IndianRupee,
    title: "Affordable",
    description:
      "Premium plant gifts starting at just ₹299. Beautiful gifting doesn't have to break the bank.",
  },
  {
    icon: Truck,
    title: "Chandigarh Delivery",
    description:
      "Same-day delivery available across Chandigarh, Mohali & Panchkula. Cash on delivery.",
  },
];

export default function WhyPlantgen() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
            Why Plantgen?
          </h2>
          <p className="mt-3 text-neutral-500 max-w-xl mx-auto text-sm sm:text-base">
            We&apos;re not just a plant store — we&apos;re a gifting experience built on
            meaning, sustainability, and local care.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <div className="text-center group p-6 bg-white rounded-2xl border border-neutral-100 hover:border-neutral-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-5 bg-brand-50 rounded-xl group-hover:bg-brand-100 transition-colors">
                    <Icon className="w-5 h-5 text-brand-700" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
