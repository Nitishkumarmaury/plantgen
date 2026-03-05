import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import UserAuthProvider from "@/context/UserAuthContext";
import ProductsProvider from "@/context/ProductsContext";
import AuthModal from "@/components/auth/AuthModal";
import ScrollProgress from "@/components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://plantgen.live"),
  title: {
    default: "Plantgen — Gift Growth. Gift Meaning. | Plant Gifting Chandigarh",
    template: "%s | Plantgen",
  },
  description:
    "Replace plastic gifts with meaningful plant gifts. Eco-friendly gifting for birthdays, anniversaries, corporate events & more. Same-day delivery in Chandigarh & Tricity.",
  keywords: [
    "plant gifting Chandigarh",
    "send plant gift Chandigarh",
    "eco friendly gifts Chandigarh",
    "same day plant delivery Chandigarh",
    "corporate plant gifts",
    "birthday plant gift",
    "anniversary gift plants",
    "indoor plants Chandigarh",
    "plant delivery Mohali Panchkula",
  ],
  authors: [{ name: "Plantgen" }],
  creator: "Plantgen",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://plantgen.live",
    siteName: "Plantgen",
    title: "Plantgen — Gift Growth. Gift Meaning.",
    description:
      "Replace plastic gifts with meaningful plant gifts. Eco-friendly gifting in Chandigarh & Tricity.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Plantgen — Plant Gifting Chandigarh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plantgen — Gift Growth. Gift Meaning.",
    description:
      "Eco-friendly plant gifting for every occasion. Chandigarh & Tricity delivery.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Plantgen",
              description:
                "Eco-friendly plant gifting for birthdays, anniversaries, corporate events & more.",
              url: "https://plantgen.live",
              telephone: "+917888888888",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chandigarh",
                addressRegion: "Chandigarh",
                addressCountry: "IN",
              },
              areaServed: ["Chandigarh", "Mohali", "Panchkula"],
              priceRange: "₹299 - ₹1499",
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white text-neutral-900">
        <ProductsProvider>
          <UserAuthProvider>
            <ScrollProgress />
            <Header />
            <CartDrawer />
            <AuthModal />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </UserAuthProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
