import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plant Bouquet — Living Bouquets That Grow | Plantgen",
  description:
    "Replace dying flower bouquets with living plant bouquets from Plantgen. Gift a plant bouquet for birthdays, events & occasions. Same-day delivery in Chandigarh & Tricity.",
  keywords: [
    "plant bouquet",
    "plant bouquet online",
    "living plant bouquet",
    "plant bouquet gift",
    "plant bouquet Chandigarh",
    "eco friendly bouquet",
    "green bouquet gift",
    "plant bouquet delivery",
    "alternative to flower bouquet",
    "plant gift bouquet",
  ],
  alternates: { canonical: "/plant-bouquet" },
  openGraph: {
    title: "Plant Bouquet — Living Bouquets That Grow | Plantgen",
    description:
      "Replace dying flower bouquets with living plant bouquets. Gift a plant that grows and reminds them of you. Same-day delivery.",
    url: "https://plantgen.live/plant-bouquet",
    siteName: "Plantgen",
    type: "website",
    locale: "en_IN",
  },
};

export default function PlantBouquetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
