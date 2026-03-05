import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your plant gift order. Cash on delivery available for Chandigarh, Mohali, Panchkula & Zirakpur.",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
