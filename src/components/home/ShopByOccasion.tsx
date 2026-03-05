"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const occasions = [
  {
    name: "Birthday",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    description: "Living gifts that grow with love",
    color: "from-pink-500/80 to-rose-600/80",
  },
  {
    name: "Anniversary",
    image: "https://images.unsplash.com/photo-1616694547580-10e3e2730130?w=400&q=80",
    description: "Love that grows stronger each year",
    color: "from-red-500/80 to-pink-600/80",
  },
  {
    name: "Corporate",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&q=80",
    description: "Professional gifting made green",
    color: "from-blue-500/80 to-indigo-600/80",
  },
  {
    name: "Festive",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80",
    description: "Festival gifts that stand out",
    color: "from-purple-500/80 to-violet-600/80",
  },
  {
    name: "Housewarming",
    image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&q=80",
    description: "Make their new house a home",
    color: "from-emerald-500/80 to-green-600/80",
  },
  {
    name: "Welcome Kit",
    image: "https://images.unsplash.com/photo-1620127252536-03bdfcb5a1b3?w=400&q=80",
    description: "Welcome new beginnings with green",
    color: "from-amber-500/80 to-orange-600/80",
  },
  {
    name: "Get Well Soon",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80",
    description: "Healing wishes wrapped in green",
    color: "from-sky-500/80 to-cyan-600/80",
  },
  {
    name: "Thank You",
    image: "https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=400&q=80",
    description: "Gratitude that keeps growing",
    color: "from-orange-500/80 to-amber-600/80",
  },
];

export default function ShopByOccasion() {
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Find the perfect plant gift for every special moment
          </p>
        </div>

        {/* Mobile: 2 columns, scrollable | Desktop: 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {occasions.map((occasion, i) => (
            <motion.div
              key={occasion.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={`/shop?category=${occasion.name}`}
                className="group block relative rounded-xl overflow-hidden aspect-[4/5] sm:aspect-square"
              >
                <Image
                  src={occasion.image}
                  alt={occasion.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${occasion.color}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                    {occasion.name}
                  </h3>
                  <p className="text-white/80 text-[10px] sm:text-xs mt-0.5 line-clamp-1">
                    {occasion.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
