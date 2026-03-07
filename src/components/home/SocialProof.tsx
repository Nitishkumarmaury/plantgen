"use client";

import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { Camera, Star, Users } from "lucide-react";

const customerImages = [
  {
    src: "/reviews/customer-1.jpg",
    alt: "Happy customer with Plantgen plant gift in Chandigarh",
    caption: "Customer review — Plant gifting experience",
  },
  {
    src: "/reviews/customer-2.jpg",
    alt: "Real customer feedback for Plantgen plant delivery",
    caption: "Verified customer feedback",
  },
  {
    src: "/reviews/customer-3.jpg",
    alt: "Customer sharing plant gift unboxing experience",
    caption: "Plant gift unboxing moment",
  },
  {
    src: "/reviews/customer-4.jpg",
    alt: "Plantgen customer review — premium packaging",
    caption: "Premium gift packaging review",
  },
  {
    src: "/reviews/customer-5.jpg",
    alt: "Happy recipient of Plantgen plant gift in Tricity",
    caption: "Gift received — customer happy",
  },
];

const giftingMoments = [
  {
    src: "/reviews/gifting-moment-1.jpg",
    alt: "Real plant gifting moment — Plantgen Chandigarh delivery",
    caption: "Real gifting moment — Chandigarh",
  },
  {
    src: "/reviews/gifting-moment-2.jpg",
    alt: "Plant gift being received — happy customer in Tricity",
    caption: "Gift delivery — spreading green joy",
  },
];

export default function SocialProof() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12 sm:mb-14">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest">
            Real Customers, Real Gifts
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900">
            See What Our Customers Are Saying
          </h2>
          <p className="mt-3 text-neutral-500 text-sm sm:text-base max-w-xl mx-auto">
            Real screenshots, real moments, real love — straight from our customers across Chandigarh &amp; Tricity.
          </p>
          <div className="flex items-center justify-center gap-6 mt-5">
            <div className="flex items-center gap-1.5 text-sm text-neutral-600">
              <Users className="w-4 h-4 text-brand-500" />
              <span className="font-medium">1,000+ Plants Gifted</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-neutral-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">4.9/5 Rating</span>
            </div>
          </div>
        </FadeIn>

        {/* Gifting Moments — Large Feature Images */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {giftingMoments.map((img) => (
            <StaggerItem key={img.src}>
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Camera className="w-3.5 h-3.5 text-white/80" />
                    <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">
                      Real Moment
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white">{img.caption}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Customer Review Screenshots */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {customerImages.map((img) => (
            <StaggerItem key={img.src}>
              <div className="group relative overflow-hidden rounded-xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <div className="p-2.5 bg-white">
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-snug line-clamp-2">
                    {img.caption}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust Badge */}
        <FadeIn>
          <div className="mt-10 text-center">
            <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
              Screenshots from real WhatsApp conversations &amp; customer feedback
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
