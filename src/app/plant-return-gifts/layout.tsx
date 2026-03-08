import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plant Return Gifts — Unique Return Gift Ideas | Plantgen",
  description:
    "Unique plant return gifts for weddings, birthdays, corporate events & parties. Bulk pricing from ₹199. Memorable, eco-friendly return gifts in Chandigarh & Tricity.",
  keywords: [
    "plant return gifts",
    "return gift ideas",
    "return gift plants",
    "unique return gifts",
    "wedding return gifts plants",
    "birthday return gifts",
    "event return gifts",
    "bulk return gifts Chandigarh",
    "eco friendly return gifts",
    "return gift ideas for guests",
  ],
  alternates: { canonical: "/plant-return-gifts" },
  openGraph: {
    title: "Plant Return Gifts — Unique Return Gift Ideas | Plantgen",
    description: "Unique plant return gifts for events. Bulk pricing from ₹199. Memorable & eco-friendly return gifts.",
    url: "https://plantgen.live/plant-return-gifts",
    siteName: "Plantgen",
    type: "website",
    locale: "en_IN",
  },
};

export default function PlantReturnGiftsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
