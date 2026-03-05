"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/Animations";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Where do you deliver?",
    a: "We currently deliver across Chandigarh, Mohali, and Panchkula (Tricity area). Same-day delivery is available for orders placed before 2 PM.",
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
    a: "Yes! We specialize in corporate gifting including employee welcome kits, client gifts, and event orders. Contact us on WhatsApp for custom quotes and branding options.",
  },
  {
    q: "How do I care for the plants?",
    a: "Every plant comes with a care instruction card specific to the plant type. Most of our gifting plants are selected for being easy to maintain — even for beginners!",
  },
];

function FAQItem({ faq, isOpen, toggle }: { faq: typeof faqs[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-sage-100 last:border-b-0">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="text-sm font-medium text-sage-800 group-hover:text-brand-700 transition-colors pr-4">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-sage-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
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
            <p className="pb-5 text-sm text-sage-500 leading-relaxed">
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
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="text-sm font-medium text-brand-600 tracking-wide uppercase">
            Got Questions?
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-sage-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-sage-50/50 rounded-2xl p-6 sm:p-8 border border-sage-100">
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
