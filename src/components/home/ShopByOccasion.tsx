"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/Animations";

const categories = [
  {
    name: "Indoor Plants",
    image: "/plants/indoor_plants/monstera_pot_09.jpg",
    description: "Air-purifying plants for your home",
    gradient: "from-brand-900/80 via-brand-800/30 to-transparent",
  },
  {
    name: "Desk Plants",
    image: "/plants/desk_plants/succulent_green_pot_01.jpg",
    description: "Compact greens for your workspace",
    gradient: "from-teal-900/80 via-teal-800/30 to-transparent",
  },
  {
    name: "Flowering Plants",
    image: "/plants/flowering_plants/orchid_white_pot_02.jpg",
    description: "Beautiful blooms to brighten any room",
    gradient: "from-coral-900/80 via-coral-800/30 to-transparent",
  },
  {
    name: "Outdoor Plants",
    image: "/plants/outdoor_plants/bird_of_paradise_pot_04.jpg",
    description: "Hardy plants for gardens & balconies",
    gradient: "from-brand-900/80 via-brand-800/30 to-transparent",
  },
  {
    name: "Herbs",
    image: "/plants/herbs/basil_herb_pot_01.jpg",
    description: "Fresh herbs for your kitchen garden",
    gradient: "from-warm-900/80 via-warm-800/30 to-transparent",
  },
  {
    name: "Succulents",
    image: "/plants/succulents/echeveria_elegans_pot_01.jpg",
    description: "Low-maintenance beauties",
    gradient: "from-teal-900/80 via-teal-800/30 to-transparent",
  },
  {
    name: "Corporate Gifts",
    image: "/plants/corporate_gift_plants/terrarium_gift_05.jpg",
    description: "Professional green gifting solutions",
    gradient: "from-neutral-900/80 via-neutral-800/30 to-transparent",
  },
];

export default function ShopByOccasion() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-semibold text-brand-500 uppercase tracking-widest">
            Curated Collections
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
            Shop by Category
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 max-w-md mx-auto">
            Explore our carefully curated plant collections
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((cat, i) => (
            <FadeIn
              key={cat.name}
              delay={Math.min(i * 0.06, 0.36)}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group block relative rounded-2xl overflow-hidden aspect-[4/5]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
                  <h3 className="text-white font-semibold text-sm sm:text-base">
                    {cat.name}
                  </h3>
                  <p className="text-white/60 text-[11px] sm:text-xs mt-0.5 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
