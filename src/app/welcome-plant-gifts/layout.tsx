import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Plant Gifts | Onboarding, Housewarming & Welcome Kits — Plantgen",
  description:
    "Welcome new employees, guests, or neighbours with a living plant gift. Perfect for onboarding kits, housewarming, and welcome ceremonies. Bulk pricing from ₹199. Delivery in Chandigarh & Tricity.",
  keywords: [
    "welcome plant gifts",
    "welcome gift plants",
    "employee welcome kit plants",
    "housewarming plant gifts",
    "onboarding gift plants",
    "welcome ceremony plants",
    "new employee plant gift",
    "office welcome kit",
  ],
  alternates: { canonical: "https://plantgen.live/welcome-plant-gifts" },
  openGraph: {
    title: "Welcome Plant Gifts — Plantgen Chandigarh",
    description:
      "Welcome someone with a gift that grows. Perfect for employee onboarding, housewarming, and welcome ceremonies. From ₹199.",
    url: "https://plantgen.live/welcome-plant-gifts",
    siteName: "Plantgen",
    locale: "en_IN",
    type: "website",
  },
};

export default function WelcomePlantGiftsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
