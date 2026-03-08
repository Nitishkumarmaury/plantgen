import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco-Friendly Gifts — Sustainable Plant Gifts | Plantgen",
  description:
    "Shop eco-friendly plant gifts that are sustainable, meaningful & zero-waste. Replace plastic gifts with living plants. Same-day delivery in Chandigarh & Tricity.",
  keywords: [
    "eco friendly gifts",
    "sustainable gifts",
    "eco friendly gifts Chandigarh",
    "green gifts",
    "zero waste gifts",
    "plant gifts eco friendly",
    "sustainable gift ideas",
    "environmentally friendly gifts",
    "eco conscious gifts",
    "best eco friendly gifts India",
  ],
  alternates: { canonical: "/eco-friendly-gifts" },
  openGraph: {
    title: "Eco-Friendly Gifts — Sustainable Plant Gifts | Plantgen",
    description: "Replace plastic gifts with living plants. Eco-friendly, sustainable, meaningful. Same-day delivery Chandigarh.",
    url: "https://plantgen.live/eco-friendly-gifts",
    siteName: "Plantgen",
    type: "website",
    locale: "en_IN",
  },
};

export default function EcoFriendlyGiftsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
