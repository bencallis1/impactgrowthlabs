"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Whats Impact", href: "/what-is-impact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 font-serif text-xl font-normal tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[#1A3A2E]" : "text-white"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#52B788] text-[#0F1A14] text-sm font-bold">
              IG
            </span>
            <span className="hidden sm:block">Impact Growth Labs</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-[#0F1A14]/70 hover:text-[#1A3A2E]"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/portal"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-[#1A3A2E] text-white hover:bg-[#2D6A4F]"
                  : "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              }`}
            >
              Investor Portal
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled ? "text-[#1A3A2E]" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0F1A14]/95 backdrop-blur-md border-t border-white/10 px-4 py-4"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {/* <Link
              href="/portal"
              className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-sm font-medium text-white hover:bg-white/20"
              onClick={() => setMobileOpen(false)}
            >
              Investor Portal
            </Link> */}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
