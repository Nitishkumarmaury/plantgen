import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plant Gifts for College Events | Farewell, Freshers, Fests — Plantgen",
  description:
    "Unique plant gifts for college events — farewell, freshers party, club events, and fests. Budget-friendly bulk plants from ₹199. Delivery in Chandigarh, Mohali & Chandigarh University campus.",
  keywords: [
    "college event plant gifts",
    "farewell gifts plants",
    "college farewell plant gifts",
    "freshers party gifts",
    "college fest return gifts",
    "chandigarh university gifts",
    "campus event gifts plants",
    "hostel plant gifts",
  ],
  alternates: { canonical: "https://plantgen.live/college-event-plant-gifts" },
  openGraph: {
    title: "Plant Gifts for College Events — Plantgen Chandigarh",
    description:
      "Unique & affordable plant gifts for farewell, freshers, fests and college events. Starting ₹199. Delivery to Chandigarh University & Tricity campuses.",
    url: "https://plantgen.live/college-event-plant-gifts",
    siteName: "Plantgen",
    locale: "en_IN",
    type: "website",
  },
};

export default function CollegeEventPlantGiftsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
