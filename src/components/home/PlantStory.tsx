"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/Animations";

export default function PlantStory() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-brand-50/50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest">
            Think About It
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
            Why Plants Beat Flowers
          </h2>

          <div className="mt-8 sm:mt-10 text-left sm:text-center space-y-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            <p>
              Last birthday, someone gave you flowers. Beautiful, right?
            </p>
            <p>
              Three days later, those flowers were in the dustbin.
            </p>
            <p className="text-neutral-800 font-medium">
              Now imagine they gave you a plant instead.
            </p>
            <p>
              A small rose plant. You put it on your balcony. You water it every
              morning. Weeks later, it blooms. And every time you see that rose,
              you think of the person who gave it to you.
            </p>
            <p className="text-neutral-800 font-semibold text-lg sm:text-xl">
              That&apos;s what Plantgen does.
            </p>
            <p>
              We replace dying flower bouquets with{" "}
              <span className="text-brand-700 font-semibold">
                living plant bouquets
              </span>{" "}
              — gifts that grow, bloom, and create memories that last years, not
              days.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all"
            >
              Start Gifting
            </Link>
            <Link
              href="/plant-bouquet"
              className="inline-flex items-center px-8 py-3.5 border border-brand-200 text-brand-700 font-medium rounded-full hover:bg-brand-50 transition-all"
            >
              What is a Plant Bouquet?
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
