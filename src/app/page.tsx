import Hero from "@/components/home/Hero";
import ShopByOccasion from "@/components/home/ShopByOccasion";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyPlantgen from "@/components/home/WhyPlantgen";
import CorporateCTA from "@/components/home/CorporateCTA";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByOccasion />
      <FeaturedProducts />
      <WhyPlantgen />
      <CorporateCTA />
      <Testimonials />
      <FAQ />
    </>
  );
}
