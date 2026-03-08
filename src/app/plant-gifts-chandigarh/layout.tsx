import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plant Gifts Chandigarh — Same-Day Delivery | Plantgen",
  description:
    "Send beautiful plant gifts in Chandigarh, Mohali & Panchkula. Starting ₹260. Same-day delivery, free gift wrapping, COD available. Perfect for birthdays, anniversaries & corporate gifting.",
  keywords: [
    "plant gifts chandigarh",
    "send plants chandigarh",
    "plant delivery chandigarh",
    "plant gift online chandigarh",
    "birthday plant gift chandigarh",
    "corporate plant gifts chandigarh",
    "indoor plants chandigarh",
    "eco friendly gifts chandigarh",
    "same day plant delivery chandigarh",
    "plant nursery chandigarh online",
  ],
  alternates: { canonical: "/plant-gifts-chandigarh" },
  openGraph: {
    title: "Plant Gifts Chandigarh — Same-Day Delivery | Plantgen",
    description:
      "Send meaningful plant gifts in Chandigarh & Tricity. Starting ₹260. Free gift wrapping. Cash on delivery.",
    url: "https://plantgen.live/plant-gifts-chandigarh",
    siteName: "Plantgen",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://plantgen.live/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Plant Gifts Chandigarh — Plantgen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plant Gifts Chandigarh — Same-Day Delivery | Plantgen",
    description:
      "Send meaningful plant gifts in Chandigarh & Tricity. Starting ₹260. Free gift wrapping.",
    images: ["/og-image.jpg"],
  },
};

export default function PlantGiftsChandigarhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
