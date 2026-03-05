"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Leaf, Search, Phone, UserCircle, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUserAuth } from "@/context/UserAuthContext";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "All Plants" },
  { href: "/shop?category=Birthday", label: "Birthday" },
  { href: "/shop?category=Corporate", label: "Corporate" },
  { href: "/shop?category=Festive", label: "Festive" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileCategories = [
  { href: "/shop", label: "All Plants" },
  { href: "/shop?category=Birthday", label: "Birthday Gifts" },
  { href: "/shop?category=Anniversary", label: "Anniversary" },
  { href: "/shop?category=Corporate", label: "Corporate Gifting" },
  { href: "/shop?category=Festive", label: "Festive" },
  { href: "/shop?category=Housewarming", label: "Housewarming" },
  { href: "/shop?category=Get+Well+Soon", label: "Get Well Soon" },
  { href: "/shop?category=Thank+You", label: "Thank You" },
  { href: "/shop?category=Welcome+Kit", label: "Welcome Kit" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { openCart, totalItems } = useCartStore();
  const { user, openAuthModal, logout } = useUserAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = () => setUserMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const count = mounted ? totalItems() : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-sm"
            : "bg-white"
        }`}
      >
        {/* Top bar */}
        <div className="hidden sm:block bg-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8 text-[11px]">
            <span>🌿 Delivering love through plants across Chandigarh & Tricity</span>
            <div className="flex items-center gap-4">
              <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-green-200 transition-colors">
                <Phone className="w-3 h-3" />
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobile menu + Logo */}
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden p-1.5 -ml-1.5 text-gray-700"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link href="/" className="flex items-center gap-1.5 group">
                <Leaf className="w-6 h-6 text-green-600" />
                <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  Plantgen
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (user) {
                      setUserMenuOpen(!userMenuOpen);
                    } else {
                      openAuthModal();
                    }
                  }}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                  aria-label={user ? "Account menu" : "Sign in"}
                >
                  <UserCircle className={`w-5 h-5 ${user ? "text-green-600" : ""}`} />
                </button>
                {/* User dropdown */}
                <AnimatePresence>
                  {userMenuOpen && user && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={async () => { await logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-green-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold px-1"
                  >
                    {count}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for plants, occasions..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-24" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 lg:hidden shadow-xl overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-1.5" onClick={() => setMobileOpen(false)}>
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-bold text-gray-900">Plantgen</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Shop by Occasion
                </p>
                <nav className="flex flex-col">
                  {mobileCategories.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Links */}
              <div className="p-4 border-t border-gray-100">
                <nav className="flex flex-col">
                  <Link href="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg font-medium">
                    About Us
                  </Link>
                  <Link href="/contact" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg font-medium">
                    Contact
                  </Link>
                </nav>
              </div>

              {/* Bottom */}
              <div className="p-4 border-t border-gray-100">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-green-700 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
