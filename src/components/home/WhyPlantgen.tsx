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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <span className="text-sm font-medium text-brand-600 tracking-wide uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-sage-900 tracking-tight">
            Why Plantgen?
          </h2>
          <p className="mt-3 text-sage-500 max-w-xl mx-auto">
            We&apos;re not just a plant store — we&apos;re a gifting experience built on
            meaning, sustainability, and local care.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-5 bg-brand-50 rounded-2xl group-hover:bg-brand-100 transition-colors">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-sage-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-sage-500 leading-relaxed">
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
