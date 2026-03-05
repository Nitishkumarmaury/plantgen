import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { CATEGORIES } from "@/types";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Gradient top accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-500 via-teal-500 to-warm-400" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <span className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-teal-400">
                Plantgen
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5">
              Gift Growth. Gift Meaning. Replace plastic gifts with living,
              meaningful plant gifts customized for every occasion.
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Chandigarh & Tricity, India</span>
            </div>
          </div>

          {/* Shop by Category */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              Shop by Category
            </h4>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat)}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: "All Products" },
                { href: "/shop?category=Corporate%20Gifts", label: "Corporate Gifting" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
              Get in Touch
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="https://wa.me/917888888888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-neutral-400 hover:text-brand-400 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917888888888"
                  className="flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91 78888 88888</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@plantgen.live"
                  className="flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>hello@plantgen.live</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3.5 bg-neutral-800/60 rounded-lg border border-neutral-800">
              <p className="text-xs text-neutral-500">
                Currently delivering in Chandigarh, Mohali & Panchkula only.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Plantgen. All rights reserved.
          </p>
          <p className="text-neutral-600 text-xs">
            Made with care in Chandigarh, India
          </p>
        </div>
      </div>
    </footer>
  );
}
