"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/Animations";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is a plant bouquet?",
    a: "A plant bouquet is our signature concept — instead of a flower bouquet that dies in 3 days, we give you a living plant in beautiful gift packaging. It grows over time, making it a lasting reminder of the person who gifted it.",
  },
  {
    q: "How is Plantgen different from a nursery?",
    a: "We're not a nursery — we're a gifting brand. Every plant comes in premium packaging with a personalized message card and care instructions. We focus on the gifting experience, not just selling plants.",
  },
  {
    q: "Where do you deliver?",
    a: "We deliver across Chandigarh, Mohali, Panchkula, and Zirakpur (Tricity area). Same-day delivery is available for orders placed before 2 PM. We also deliver to Chandigarh University and IT Park Chandigarh.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We currently operate on Cash on Delivery (COD) only. Pay when your gift is delivered to ensure complete peace of mind.",
  },
  {
    q: "Can I add a personalized message?",
    a: "Absolutely! Every plant gift comes with a complimentary message card. You can add your personal message during checkout.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Yes! All our plants come beautifully presented. You can also opt for premium gift wrapping during checkout for an extra touch of elegance.",
  },
  {
    q: "What if the plant gets damaged during delivery?",
    a: "We take utmost care in packaging and delivery. In the rare event of damage, contact us within 24 hours with a photo and we'll replace it immediately.",
  },
  {
    q: "Do you handle corporate bulk orders?",
    a: "Yes! We specialize in corporate gifting including employee welcome kits, client gifts, and event orders. Visit our Contact page for custom quotes and branding options.",
  },
  {
    q: "How do I care for the plants?",
    a: "Every plant comes with a care instruction card specific to the plant type. Most of our gifting plants are selected for being easy to maintain — even for beginners!",
  },
  {
    q: "Do you deliver to Chandigarh University?",
    a: "Yes! We deliver to CU and all major campuses, IT Park Chandigarh, and the entire Tricity region including Chandigarh, Mohali, Panchkula, and Zirakpur.",
  },
];

function FAQItem({ faq, isOpen, toggle }: { faq: typeof faqs[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-neutral-100 last:border-b-0">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900 transition-colors pr-4">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
            isOpen ? "rotate-180 text-brand-600" : "text-neutral-400"
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-neutral-500 leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-fresh">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">
            Got Questions?
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-100 shadow-sm">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
