"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, BookOpen, Recycle, DollarSign, Wheat, Globe } from "lucide-react";
import { useState } from "react";
import type { PortfolioCompany } from "@/types/contentful";

// Sector config — icon, colors, label
const sectorConfig: Record<
  string,
  { icon: React.ElementType; bg: string; text: string; dot: string; badge: string }
> = {
  Climate: {
    icon: Leaf,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  Health: {
    icon: Heart,
    bg: "bg-rose-50",
    text: "text-rose-700",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  Education: {
    icon: BookOpen,
    bg: "bg-sky-50",
    text: "text-sky-700",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
  },
  "Circular Economy": {
    icon: Recycle,
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "Financial Inclusion": {
    icon: DollarSign,
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  "Food & Agriculture": {
    icon: Wheat,
    bg: "bg-lime-50",
    text: "text-lime-700",
    dot: "bg-lime-500",
    badge: "bg-lime-50 text-lime-700 border-lime-200",
  },
  Other: {
    icon: Globe,
    bg: "bg-slate-50",
    text: "text-slate-700",
    dot: "bg-slate-500",
    badge: "bg-slate-50 text-slate-700 border-slate-200",
  },
};

const defaultConfig = sectorConfig["Other"];

const ALL = "All";

export function Portfolio({ companies }: { companies: PortfolioCompany[] }) {
  // Derive unique sectors from actual data
  const sectors = [ALL, ...Array.from(new Set(companies.map((c) => c.fields.sector)))];
  const [active, setActive] = useState(ALL);

  const filtered =
    active === ALL
      ? companies
      : companies.filter((c) => c.fields.sector === active);

  return (
    <section id="portfolio" className="py-24 bg-[#F7FAF8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
              Active Projects
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E]">
              Companies we believe in
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#2D6A4F] font-medium hover:gap-3 transition-all"
          >
            View case studies <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {sectors.map((sector) => {
            const cfg = sector === ALL ? null : (sectorConfig[sector] ?? defaultConfig);
            const isActive = active === sector;
            return (
              <button
                key={sector}
                onClick={() => setActive(sector)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200 ${
                  isActive
                    ? "bg-[#1A3A2E] text-white border-[#1A3A2E] shadow-sm"
                    : "bg-white text-[#0F1A14]/60 border-gray-200 hover:border-[#1A3A2E]/40 hover:text-[#1A3A2E]"
                }`}
              >
                {cfg && (
                  <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#52B788]" : cfg.dot}`} />
                )}
                {sector}
              </button>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((company, i) => {
            const sector = company.fields.sector;
            const cfg = sectorConfig[sector] ?? defaultConfig;
            const Icon = cfg.icon;

            const metricEntries = company.fields.metrics
              ? Object.entries(company.fields.metrics).slice(0, 2)
              : [];

            const slug = company.fields.slug ?? "#";

            return (
              <motion.div
                key={company.sys.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i, 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/portfolio/${slug}`}
                  className="block rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-[#52B788]/30 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Top row: icon + sector badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-11 w-11 rounded-xl ${cfg.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                      <Icon size={20} className={cfg.text} />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.badge}`}
                    >
                      {sector}
                    </span>
                  </div>

                  {/* Stage pill */}
                  <div className="mb-3">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-[#0F1A14]/35">
                      {company.fields.stage}
                    </span>
                  </div>

                  <h3 className="font-semibold text-[#1A3A2E] text-lg mb-2 group-hover:text-[#2D6A4F] transition-colors">
                    {company.fields.name}
                  </h3>
                  <p className="text-sm text-[#0F1A14]/55 leading-relaxed mb-4 flex-1">
                    {company.fields.description}
                  </p>

                  {/* Metrics */}
                  {metricEntries.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                      {metricEntries.map(([key, val]) => (
                        <span
                          key={key}
                          className="text-xs bg-[#F7FAF8] text-[#2D6A4F] font-medium px-2.5 py-1 rounded-full border border-[#52B788]/20"
                        >
                          {String(val)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className={`text-xs font-semibold ${cfg.text}`}>
                        {sector}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-[#52B788] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
