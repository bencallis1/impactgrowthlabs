"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const trustItems = [
  { value: "$50M+", label: "Capital Deployed" },
  { value: "24", label: "Portfolio Companies" },
  { value: "8,400+", label: "Jobs Created" },
  { value: "12 SDGs", label: "Addressed" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F7FAF8]">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-[#95D5B2]/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#52B788]/15 blur-3xl" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #1A3A2E 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#52B788]/40 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm text-[#2D6A4F] font-medium shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#52B788] animate-pulse" />
            Impact Venture Studio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#1A3A2E] leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Backing{" "}
          <span className="italic text-[#52B788]">principled</span>
          <br />
          founders who build
          <br />a better world.
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="mx-auto max-w-2xl text-lg sm:text-xl text-[#0F1A14]/60 leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Impact Growth Labs is a venture studio at the intersection of capital
          and purpose. We partner with mission-driven founders from day zero
          through Series A — providing hands-on support, strategic capital, and
          a global network.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A3A2E] px-8 py-4 text-base font-medium text-white hover:bg-[#2D6A4F] transition-colors group shadow-lg shadow-[#1A3A2E]/20"
          >
            Apply as a Founder
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#1A3A2E] px-8 py-4 text-base font-medium text-[#1A3A2E] hover:bg-[#1A3A2E] hover:text-white transition-all"
          >
            Investor Portal
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="inline-flex flex-wrap items-center justify-center rounded-2xl border border-[#1A3A2E]/10 bg-white/70 backdrop-blur-sm overflow-hidden shadow-sm"
        >
          {trustItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center px-8 py-4 ${
                i < trustItems.length - 1 ? "border-r border-[#1A3A2E]/10" : ""
              }`}
            >
              <span className="font-serif text-xl text-[#1A3A2E] font-medium">
                {item.value}
              </span>
              <span className="text-xs text-[#0F1A14]/50 mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <div className="h-8 w-5 rounded-full border-2 border-[#1A3A2E]/30 flex items-start justify-center p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[#1A3A2E]/40" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
