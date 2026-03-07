"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search, UserCircle, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUserAuth } from "@/context/UserAuthContext";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/shop", label: "Plants" },
  { href: "/shop?search=birthday", label: "Birthday" },
  { href: "/shop?category=Corporate+Gifts", label: "Corporate" },
  { href: "/shop?search=festive", label: "Festive" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileCategories = [
  { href: "/shop", label: "All Plants" },
  { href: "/shop?search=birthday", label: "Birthday Gifts" },
  { href: "/shop?category=Corporate+Gifts", label: "Corporate Gifting" },
  { href: "/shop?search=festive", label: "Festive Plants" },
  { href: "/shop?category=Indoor+Plants", label: "Indoor Plants" },
  { href: "/shop?category=Flowering+Plants", label: "Flowering Plants" },
  { href: "/shop?category=Desk+Plants", label: "Desk Plants" },
  { href: "/shop?category=Succulents", label: "Succulents" },
  { href: "/shop?category=Herbs", label: "Herbs" },
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 glass shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
            : "bg-white"
        }`}
      >
        {/* Announcement bar */}
        <div className="hidden sm:block bg-gradient-to-r from-brand-900 via-brand-800 to-teal-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-9 text-[11px] tracking-wide">
            <span className="opacity-80">Free delivery in Chandigarh & Tricity</span>
            <span className="mx-3 opacity-30">|</span>
            <span className="opacity-80">Cash on Delivery Available</span>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-1.5 -ml-1.5 text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 tracking-tight">
                  Plantgen
                </span>
              </Link>
            </div>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="relative text-[13px] font-medium text-neutral-500 hover:text-brand-700 transition-colors tracking-wide uppercase after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-600 after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

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
                  className="p-2.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                  aria-label={user ? "Account menu" : "Sign in"}
                >
                  <UserCircle className={`w-[18px] h-[18px] ${user ? "text-brand-600" : ""}`} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && user && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
                        <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Account</p>
                        <p className="text-sm font-medium text-neutral-900 truncate mt-0.5">
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

              <button
                onClick={openCart}
                className="relative p-2.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 min-w-[16px] h-[16px] bg-gradient-to-r from-brand-500 to-teal-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold px-1"
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
              className="border-t border-neutral-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for plants, categories..."
                    className="flex-1 px-5 py-3 bg-neutral-50 border border-neutral-200 rounded-full text-sm focus:outline-none focus:border-neutral-400 focus:ring-0 placeholder:text-neutral-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium rounded-full hover:from-brand-700 hover:to-brand-600 transition-all shadow-sm"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-16 sm:h-[100px] lg:h-[108px]" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-neutral-100">
                <Link href="/" className="font-serif text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-teal-600" onClick={() => setMobileOpen(false)}>
                  Plantgen
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="p-5">
                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                  Shop by Category
                </p>
                <nav className="flex flex-col -mx-2">
                  {mobileCategories.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-2.5 text-[15px] text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Links */}
              <div className="px-5 pb-5 border-t border-neutral-100 pt-5">
                <nav className="flex flex-col -mx-2">
                  <Link href="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[15px] text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg">
                    About Us
                  </Link>
                  <Link href="/contact" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[15px] text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg">
                    Contact
                  </Link>
                </nav>
              </div>


            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
