import { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/ui/Animations";
import { Leaf, Heart, Truck, TreePine, Users, Award, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Plantgen is Chandigarh's eco-friendly plant gifting brand. We believe gifts should grow — not wilt. Learn our story.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: TreePine,
    title: "Eco-Friendly First",
    description:
      "Every gift we send is sustainable — from handpicked healthy plants to biodegradable packaging. No plastic. No waste.",
    color: "bg-brand-50 text-brand-600",
  },
  {
    icon: Heart,
    title: "Emotion-Driven Gifting",
    description:
      "Plants are living gifts that grow with memories. We pair each plant with personalized messages and premium gift wrapping.",
    color: "bg-coral-50 text-coral-500",
  },
  {
    icon: Truck,
    title: "Chandigarh Roots",
    description:
      "We proudly serve Chandigarh, Mohali, Panchkula, and Zirakpur with same-day and scheduled delivery — always on time.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Users,
    title: "Corporate & Bulk",
    description:
      "From startups to enterprises, we've gifted to 50+ corporate clients with custom branding and bulk pricing.",
    color: "bg-warm-50 text-warm-600",
  },
];

const milestones = [
  { number: 2023, suffix: "", label: "Founded in Chandigarh" },
  { number: 1000, suffix: "+", label: "Plants Gifted" },
  { number: 50, suffix: "+", label: "Corporate Clients" },
  { number: 4.9, suffix: "\u2605", label: "Average Rating", isDecimal: true },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-full mb-6">
            <Leaf className="w-4 h-4 text-brand-700" />
            <span className="text-sm font-medium text-brand-700">Our Story</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Gifts That Grow <br className="hidden sm:block" />
            With Your Love
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Plantgen was born from a simple idea: gifts shouldn&apos;t wilt in a day.
            We started in Chandigarh with a mission to make plant gifting thoughtful,
            beautiful, and accessible — for every occasion, every budget.
          </p>
        </FadeIn>
      </section>

      {/* Milestones */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {milestones.map((m) => (
            <StaggerItem key={m.label}>
              <div className="text-center bg-white rounded-2xl p-6 border border-neutral-100 hover:shadow-md transition-shadow">
                <p className="text-2xl sm:text-3xl font-bold text-brand-700 mb-1">
                  <CountUp target={m.number} suffix={m.suffix} />
                </p>
                <p className="text-sm text-neutral-500">{m.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center mb-12">
            What We Stand For
          </h2>
        </FadeIn>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className={`w-10 h-10 ${v.color} rounded-xl flex items-center justify-center mb-4`}>
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {v.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Why Plants */}
      <section className="bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 py-16 mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Award className="w-8 h-8 text-warm-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Choose Plants as Gifts?
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              A plant gift says &ldquo;I want this to grow — just like us.&rdquo; Unlike
              flowers that fade, plants live, purify air, bring positivity, and
              remind the receiver of your thoughtfulness every single day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 bg-gradient-to-r from-brand-500 to-teal-500 text-white font-medium rounded-xl hover:from-brand-600 hover:to-teal-600 shadow-lg shadow-brand-500/20 transition-all"
              >
                Browse Gift Plants
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-neutral-600 text-neutral-200 font-medium rounded-xl hover:border-neutral-400 hover:text-white transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Location */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <FadeIn>
          <MapPin className="w-6 h-6 text-brand-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            Proudly Based in Chandigarh
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto">
            We deliver across Chandigarh, Mohali, Panchkula, and Zirakpur.
            Same-day delivery available for orders placed before 2 PM.
          </p>
        </FadeIn>
      </section>

      {/* Exhibition */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center mb-8">
            Featured at IGNITE Startup Exhibition
          </h2>
          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src="/about/ignite-exhibition.jpg"
                  alt="Plantgen stall at IGNITE Startup Exhibition - Chandigarh University Technology Business Incubator"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3">
                  Chandigarh University &middot; Technology Business Incubator
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Plantgen was selected to represent at the IGNITE Startup Exhibition
                  organized by Chandigarh University&apos;s Technology Business Incubator.
                  We showcased our customized plant gifting solutions — from corporate
                  welcome kits and event favours to personalized gift plants with
                  our signature printed bags.
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-5">
                  The exhibition was an incredible experience — we connected with
                  entrepreneurs, investors, and hundreds of visitors who loved our
                  vision of replacing plastic gifts with living, meaningful plants.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["IGNITE Exhibition", "Chandigarh University", "Startup India", "TBI"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Real Moments Gallery */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 text-center mb-3">
            Real Customers, Real Moments
          </h2>
          <p className="text-neutral-500 text-center max-w-xl mx-auto mb-8">
            From gifting moments to customer feedback — these are the real stories behind Plantgen.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Gifting Moments — Featured */}
            <div className="col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-100 shadow-sm group">
              <Image
                src="/reviews/gifting-moment-1.jpg"
                alt="Plant gift being delivered — real customer moment in Chandigarh"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-medium">Real Gifting Moment</p>
                <p className="text-white/70 text-xs">Plant delivery in Chandigarh</p>
              </div>
            </div>
            <div className="col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-100 shadow-sm group">
              <Image
                src="/reviews/gifting-moment-2.jpg"
                alt="Happy customer receiving Plantgen plant gift"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-medium">Gift Received with Love</p>
                <p className="text-white/70 text-xs">Spreading green joy across Tricity</p>
              </div>
            </div>
            {/* Customer Review Screenshots */}
            {[
              { src: "/reviews/customer-1.jpg", alt: "Customer feedback screenshot — Plantgen review" },
              { src: "/reviews/customer-2.jpg", alt: "Verified customer review — plant gift delivery" },
              { src: "/reviews/customer-3.jpg", alt: "Customer review — Plantgen gift packaging" },
              { src: "/reviews/customer-4.jpg", alt: "Real customer feedback — Plantgen Chandigarh" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-neutral-100 shadow-sm group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
