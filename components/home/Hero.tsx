"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const trustItems = [
  { value: "$500M+", label: "Contract Development" },
  { value: "11", label: "Active Projects" },
  { value: "8", label: "Core Verticals" },
  { value: "10 SDGs", label: "Addressed" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Layered dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A14]/85 via-[#0F1A14]/60 to-[#0F1A14]/90" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm px-4 py-1.5 text-sm text-white/70 font-medium tracking-wide">
            <span className="h-2 w-2 rounded-full bg-[#52B788] animate-pulse" />
            Impact Venture Studio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-7 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Backing{" "}
          <em className="not-italic text-[#52B788]">Visionary</em>
          <br />
          Founders Building
          <br />a Better World.
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="mx-auto max-w-xl text-lg sm:text-xl text-white/55 leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The Natural Integration of Profit and Purpose
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1A3A2E] hover:bg-[#F7FAF8] transition-colors shadow-xl"
          >
            Explore Our Projects <ArrowRight size={15} />
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-sm font-medium text-white hover:bg-white/18 transition-colors"
          >
            Apply as a Founder
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden"
        >
          {trustItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center px-4 py-5 ${
                i < trustItems.length - 1
                  ? "border-r border-b md:border-b-0 border-white/10"
                  : ""
              } ${i === 1 ? "md:border-r md:border-white/10" : ""}`}
            >
              <span className="font-serif text-2xl text-white font-medium">
                {item.value}
              </span>
              <span className="text-xs text-white/45 mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="h-8 w-5 rounded-full border border-white/25 flex items-start justify-center p-1">
            <div className="h-1.5 w-1 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
