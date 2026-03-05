"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Truck, Banknote, Gift } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const heroSlides = [
  {
    id: 1,
    title: "Plants That Speak Love",
    subtitle: "Gift meaningful greenery for every occasion",
    cta: "Shop Now",
    ctaLink: "/shop",
    bgColor: "from-green-50 to-emerald-50",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    accent: "text-green-700",
  },
  {
    id: 2,
    title: "Corporate Plant Gifting",
    subtitle: "Bulk orders with custom branding for your team",
    cta: "Explore Corporate",
    ctaLink: "/shop?category=Corporate",
    bgColor: "from-amber-50 to-orange-50",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
    accent: "text-amber-700",
  },
  {
    id: 3,
    title: "XL Statement Plants",
    subtitle: "Transform any space with our premium collection",
    cta: "View Collection",
    ctaLink: "/shop?type=XL",
    bgColor: "from-teal-50 to-cyan-50",
    image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=1200&q=80",
    accent: "text-teal-700",
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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full">
      {/* Main Carousel */}
      <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}
          >
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full">
                {/* Text */}
                <div className="z-10 py-8">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold ${slide.accent} leading-tight`}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-md"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center mt-5 sm:mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors shadow-lg shadow-green-600/20"
                    >
                      {slide.cta}
                    </Link>
                  </motion.div>
                </div>
                {/* Image */}
                <div className="relative h-48 sm:h-64 md:h-full min-h-[200px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover rounded-2xl md:rounded-3xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                i === current ? "bg-green-600 w-6 sm:w-8" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Features Strip */}
      <div className="bg-green-700 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-16 text-[11px] sm:text-xs lg:text-sm font-medium overflow-x-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Same Day Delivery</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
            <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
              <Banknote className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Cash on Delivery</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
            <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
              <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Free Gift Wrapping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
