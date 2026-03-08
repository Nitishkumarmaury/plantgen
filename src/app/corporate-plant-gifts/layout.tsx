import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Plant Gifts — Bulk Gifting for Companies | Plantgen",
  description:
    "Corporate plant gifts for employee welcome kits, client appreciation, events & festivals. Bulk pricing from ₹199/plant. Custom branding available. Same-day delivery in Chandigarh & Tricity.",
  keywords: [
    "corporate plant gifts",
    "corporate gifting Chandigarh",
    "bulk plant gifts",
    "employee welcome kit plants",
    "corporate gift ideas",
    "office plant gifts",
    "client appreciation gifts",
    "eco friendly corporate gifts",
    "bulk plant order Chandigarh",
    "corporate plant gifting",
  ],
  alternates: { canonical: "/corporate-plant-gifts" },
  openGraph: {
    title: "Corporate Plant Gifts — Bulk Gifting for Companies | Plantgen",
    description:
      "Elevate your corporate gifting with living plants. Bulk pricing from ₹199/plant. Custom branding. Same-day delivery Chandigarh.",
    url: "https://plantgen.live/corporate-plant-gifts",
    siteName: "Plantgen",
    type: "website",
    locale: "en_IN",
  },
};

export default function CorporatePlantGiftsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
