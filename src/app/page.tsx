import Hero from "@/components/home/Hero";
import ShopByOccasion from "@/components/home/ShopByOccasion";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyPlantgen from "@/components/home/WhyPlantgen";
import CorporateCTA from "@/components/home/CorporateCTA";
import OrderCTA from "@/components/home/OrderCTA";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where do you deliver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We currently deliver across Chandigarh, Mohali, and Panchkula (Tricity area). Same-day delivery is available for orders placed before 2 PM.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We currently operate on Cash on Delivery (COD) only. Pay when your gift is delivered to ensure complete peace of mind.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a personalized message?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! Every plant gift comes with a complimentary message card. You can add your personal message during checkout.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer gift wrapping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All our plants come beautifully presented. You can also opt for premium gift wrapping during checkout for an extra touch of elegance.",
      },
    },
    {
      "@type": "Question",
      name: "What if the plant gets damaged during delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We take utmost care in packaging and delivery. In the rare event of damage, contact us within 24 hours with a photo and we'll replace it immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle corporate bulk orders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We specialize in corporate gifting including employee welcome kits, client gifts, and event orders. Visit our Contact page for custom quotes and branding options.",
      },
    },
    {
      "@type": "Question",
      name: "How do I care for the plants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every plant comes with a care instruction card specific to the plant type. Most of our gifting plants are selected for being easy to maintain — even for beginners!",
      },
    },
  ],
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Plantgen",
  url: "https://plantgen.live",
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Priya Sharma" },
      datePublished: "2026-02-14",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Ordered a Snake Plant for my mom's birthday. Beautiful packaging and the plant was so fresh. Way better than another boring wallet or photo frame.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Rohit Verma" },
      datePublished: "2026-01-20",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "We ordered 25 desk plants for our office welcome kits. Plantgen delivered all of them on time with excellent quality. Our new joiners were genuinely surprised.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Simran Kaur" },
      datePublished: "2025-11-05",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Ordered 10 plants as Diwali gifts for family. Each one came in gorgeous printed bags — felt so premium. My relatives were all asking where I got them from.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <Hero />
      <ShopByOccasion />
      <FeaturedProducts />
      <OrderCTA />
      <WhyPlantgen />
      <CorporateCTA />
      <Testimonials />
      <FAQ />
    </>
  );
}
