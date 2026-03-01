"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, BookOpen, Recycle } from "lucide-react";
import { useRef } from "react";
import type { PortfolioCompany } from "@/types/contentful";

const sectorIcons: Record<string, React.ElementType> = {
  Climate: Leaf,
  Health: Heart,
  Education: BookOpen,
  "Circular Economy": Recycle,
};

const sectorColors: Record<string, string> = {
  Climate: "bg-green-50 text-green-700 border-green-200",
  Health: "bg-red-50 text-red-700 border-red-200",
  Education: "bg-blue-50 text-blue-700 border-blue-200",
  "Circular Economy": "bg-amber-50 text-amber-700 border-amber-200",
};

export function Portfolio({ companies }: { companies: PortfolioCompany[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="portfolio" className="py-24 bg-[#F7FAF8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
              Portfolio
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E]">
              Companies we believe in
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#2D6A4F] font-medium hover:gap-3 transition-all"
          >
            View case studies <ArrowRight size={18} />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {companies.map((company, i) => {
            const sector = company.fields.sector;
            const Icon = sectorIcons[sector] || Leaf;
            const colorClass =
              sectorColors[sector] || "bg-gray-50 text-gray-700 border-gray-200";

            const metricEntries = company.fields.metrics
              ? Object.entries(company.fields.metrics).slice(0, 2)
              : [];

            return (
              <motion.div
                key={company.sys.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-[#52B788]/30 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-[#1A3A2E] flex items-center justify-center text-[#95D5B2] group-hover:bg-[#2D6A4F] transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass}`}
                  >
                    {company.fields.stage}
                  </span>
                </div>
                <h3 className="font-semibold text-[#1A3A2E] text-lg mb-2 group-hover:text-[#2D6A4F] transition-colors">
                  {company.fields.name}
                </h3>
                <p className="text-sm text-[#0F1A14]/60 leading-relaxed mb-4 flex-1">
                  {company.fields.description}
                </p>
                {/* Metrics chips */}
                {metricEntries.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {metricEntries.map(([, val]) => (
                      <span
                        key={String(val)}
                        className="text-xs bg-[#F7FAF8] text-[#2D6A4F] font-medium px-2.5 py-1 rounded-full border border-[#52B788]/20"
                      >
                        {String(val)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-xs text-[#52B788] font-medium">{sector}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
