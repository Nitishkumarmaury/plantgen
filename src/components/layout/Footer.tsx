import Link from "next/link";
import { Leaf, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { OCCASIONS } from "@/types";

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-brand-400" />
              <span className="text-lg font-semibold text-white">Plantgen</span>
            </Link>
            <p className="text-sage-400 text-sm leading-relaxed mb-4">
              Gift Growth. Gift Meaning. Replace plastic gifts with living,
              meaningful plant gifts customized for every occasion.
            </p>
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Chandigarh & Tricity, India</span>
            </div>
          </div>

          {/* Shop by Occasion */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Shop by Occasion
            </h4>
            <ul className="space-y-2.5">
              {OCCASIONS.slice(0, 6).map((occasion) => (
                <li key={occasion}>
                  <Link
                    href={`/shop?category=${occasion}`}
                    className="text-sage-400 hover:text-brand-400 transition-colors text-sm"
                  >
                    {occasion}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/shop", label: "All Products" },
                { href: "/shop?category=Corporate", label: "Corporate Gifting" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sage-400 hover:text-brand-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/917888888888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sage-400 hover:text-green-400 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917888888888"
                  className="flex items-center gap-2.5 text-sage-400 hover:text-brand-400 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91 78888 88888</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@plantgen.live"
                  className="flex items-center gap-2.5 text-sage-400 hover:text-brand-400 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>hello@plantgen.live</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-sage-800 rounded-lg">
              <p className="text-xs text-sage-400">
                🌿 Currently delivering in Chandigarh, Mohali & Panchkula only.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sage-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sage-500 text-sm">
            © {new Date().getFullYear()} Plantgen. All rights reserved.
          </p>
          <p className="text-sage-500 text-xs">
            Made with 🌱 in Chandigarh, India
          </p>
        </div>
      </div>
    </footer>
  );
}
