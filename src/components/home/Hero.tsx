"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Truck, Banknote, Gift } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const heroSlides = [
  {
    id: 1,
    title: "Plants That\nSpeak Love",
    subtitle: "Meaningful green gifts for every occasion — delivered with care across Chandigarh & Tricity.",
    cta: "Shop Collection",
    ctaLink: "/shop",
    image: "/plants/indoor_plants/monstera_pot_09.jpg",
  },
  {
    id: 2,
    title: "Corporate\nPlant Gifting",
    subtitle: "Elevate your brand with eco-friendly plant gifts. Bulk orders with custom branding available.",
    cta: "Explore Corporate",
    ctaLink: "/shop?category=Corporate%20Gifts",
    image: "/plants/corporate_gift_plants/terrarium_gift_05.jpg",
  },
  {
    id: 3,
    title: "Beautiful\nFlowering Plants",
    subtitle: "Transform any space with our curated collection of vibrant flowering plants.",
    cta: "View Collection",
    ctaLink: "/shop?category=Flowering%20Plants",
    image: "/plants/flowering_plants/orchid_white_pot_02.jpg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section className="relative w-full">
      {/* Main Carousel */}
      <div className="relative w-full h-[65vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden bg-neutral-100">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background Image with Ken Burns effect */}
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-xl">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-[1.1] whitespace-pre-line"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/80 max-w-md leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-7 sm:mt-8 flex items-center gap-4"
                >
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center px-7 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-brand-500 to-teal-500 text-white text-sm sm:text-base font-semibold rounded-full hover:from-brand-600 hover:to-teal-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-300"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center px-6 py-3 sm:py-3.5 border border-white/40 text-white text-sm sm:text-base font-medium rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300"
                  >
                    Our Story
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 glass rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 glass rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === current ? "bg-gradient-to-r from-brand-400 to-teal-400 w-8" : "bg-white/40 w-4 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Strip */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-teal-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 sm:gap-12 lg:gap-20 text-[11px] sm:text-xs lg:text-sm font-medium overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap text-brand-200">
              <Truck className="w-4 h-4 flex-shrink-0 text-brand-300" />
              <span>Same Day Delivery</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20 flex-shrink-0" />
            <div className="flex items-center gap-2 whitespace-nowrap text-brand-200">
              <Banknote className="w-4 h-4 flex-shrink-0 text-warm-400" />
              <span>Cash on Delivery</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20 flex-shrink-0" />
            <div className="flex items-center gap-2 whitespace-nowrap text-brand-200">
              <Gift className="w-4 h-4 flex-shrink-0 text-coral-300" />
              <span>Free Gift Wrapping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
