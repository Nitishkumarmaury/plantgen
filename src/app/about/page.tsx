import { Metadata } from "next";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { Leaf, Heart, Truck, TreePine, Users, Award, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Plantgen is Chandigarh's eco-friendly plant gifting brand. We believe gifts should grow — not wilt. Learn our story.",
};

const values = [
  {
    icon: TreePine,
    title: "Eco-Friendly First",
    description:
      "Every gift we send is sustainable — from handpicked healthy plants to biodegradable packaging. No plastic. No waste.",
  },
  {
    icon: Heart,
    title: "Emotion-Driven Gifting",
    description:
      "Plants are living gifts that grow with memories. We pair each plant with personalized messages and premium gift wrapping.",
  },
  {
    icon: Truck,
    title: "Chandigarh Roots",
    description:
      "We proudly serve Chandigarh, Mohali, Panchkula, and Zirakpur with same-day and scheduled delivery — always on time.",
  },
  {
    icon: Users,
    title: "Corporate & Bulk",
    description:
      "From startups to enterprises, we've gifted to 50+ corporate clients with custom branding and bulk pricing.",
  },
];

const milestones = [
  { number: "2023", label: "Founded in Chandigarh" },
  { number: "1000+", label: "Plants Gifted" },
  { number: "50+", label: "Corporate Clients" },
  { number: "4.9★", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-full mb-6">
            <Leaf className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">Our Story</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-900 mb-6">
            Gifts That Grow <br className="hidden sm:block" />
            With Your Love
          </h1>
          <p className="text-lg text-sage-500 max-w-2xl mx-auto leading-relaxed">
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
              <div className="text-center bg-white rounded-2xl p-6 border border-sage-100">
                <p className="text-2xl sm:text-3xl font-bold text-brand-600 mb-1">
                  {m.number}
                </p>
                <p className="text-sm text-sage-500">{m.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-bold text-sage-900 text-center mb-12">
            What We Stand For
          </h2>
        </FadeIn>
        <StaggerContainer className="grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="bg-white rounded-2xl p-6 border border-sage-100 h-full">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-sage-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-sage-500 leading-relaxed">
                  {v.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Why Plants */}
      <section className="bg-sage-900 py-16 mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Award className="w-8 h-8 text-brand-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Choose Plants as Gifts?
            </h2>
            <p className="text-sage-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              A plant gift says &ldquo;I want this to grow — just like us.&rdquo; Unlike
              flowers that fade, plants live, purify air, bring positivity, and
              remind the receiver of your thoughtfulness every single day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors"
              >
                Browse Gift Plants
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-sage-600 text-sage-200 font-medium rounded-xl hover:border-sage-400 hover:text-white transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Location */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <MapPin className="w-6 h-6 text-brand-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-sage-900 mb-2">
            Proudly Based in Chandigarh
          </h2>
          <p className="text-sage-500 max-w-lg mx-auto">
            We deliver across Chandigarh, Mohali, Panchkula, and Zirakpur.
            Same-day delivery available for orders placed before 2 PM.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
