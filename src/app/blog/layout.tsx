import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Plant Gifting Tips & Guides | Plantgen",
  description:
    "Expert tips on plant gifting, indoor plant care, eco-friendly gifts, and corporate gifting. Chandigarh's plant gifting knowledge hub.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
