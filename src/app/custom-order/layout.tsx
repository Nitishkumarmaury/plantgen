import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Custom Plant Gift | Plantgen",
  description:
    "Request custom plant gifts for events, corporate gifting, parties, and welcome gifts. Bulk orders available with same-day delivery in Chandigarh & Tricity.",
};

export default function CustomOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
