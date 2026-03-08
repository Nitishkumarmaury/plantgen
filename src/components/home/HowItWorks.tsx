"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { Leaf, Gift, Truck } from "lucide-react";

const steps = [
  {
    icon: Leaf,
    title: "Choose Your Plant",
    description:
      "Pick from 20+ plants — desk plants, flowering, succulents, or let us surprise them.",
    color: "text-brand-600 bg-brand-50",
  },
  {
    icon: Gift,
    title: "We Package It Beautifully",
    description:
      "Premium gift wrapping, a personalized message card, and care instructions included.",
    color: "text-coral-600 bg-coral-50",
  },
  {
    icon: Truck,
    title: "Same-Day Delivery",
    description:
      "Order by 2 PM, delivered today. Cash on Delivery across Chandigarh, Mohali, Panchkula & Zirakpur.",
    color: "text-teal-600 bg-teal-50",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest">
            Simple & Quick
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
            Gifting Made Simple
          </h2>
          <p className="mt-3 text-neutral-500 max-w-lg mx-auto">
            3 steps to a gift they&apos;ll never forget
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="relative text-center group">
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center z-10">
                  {i + 1}
                </div>
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl ${step.color} flex items-center justify-center mb-5 mt-2 group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
                {/* Connector line (hidden on last item and mobile) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-neutral-200" />
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
