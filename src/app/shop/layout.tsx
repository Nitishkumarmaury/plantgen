import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Plant Gifts",
  description:
    "Browse our curated collection of eco-friendly plant gifts for every occasion. Birthday, anniversary, corporate, festive & more. Delivery in Chandigarh & Tricity.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
