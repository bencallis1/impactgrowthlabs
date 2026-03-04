"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import type { BlogPost } from "@/types/contentful";

function formatDate(dateStr: string) {
  return new Date(dateStr)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

// Tag → color mapping (mirrors sector palette)
const tagColors: Record<string, string> = {
  Climate: "bg-emerald-600 text-white",
  Health: "bg-rose-600 text-white",
  Education: "bg-sky-600 text-white",
  Finance: "bg-violet-600 text-white",
  Impact: "bg-[#1A3A2E] text-white",
  News: "bg-[#1A3A2E] text-white",
  Report: "bg-slate-700 text-white",
  Strategy: "bg-teal-700 text-white",
};

function tagColor(tag: string) {
  for (const [key, cls] of Object.entries(tagColors)) {
    if (tag.toLowerCase().includes(key.toLowerCase())) return cls;
  }
  return "bg-[#1A3A2E] text-white";
}

// Gradient fallbacks when no cover image
const gradients = [
  "from-[#0F2A20] to-[#1A3A2E]",
  "from-[#1A3A2E] to-[#2D6A4F]",
  "from-[#0a1f14] to-[#1A3A2E]",
  "from-[#132b1f] to-[#2D6A4F]",
  "from-[#0d2318] to-[#1A3A2E]",
];

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const SCROLL_BY = 360;

  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -SCROLL_BY : SCROLL_BY, behavior: "smooth" });
    setTimeout(updateButtons, 350);
  };

  return (
    <section className="py-24 bg-[#F7FAF8] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
              Insights
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E]">
              From the studio
            </h2>
          </div>

          {/* Nav arrows + See All */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#1A3A2E]/50 hover:border-[#1A3A2E]/40 hover:text-[#1A3A2E] disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#1A3A2E]/50 hover:border-[#1A3A2E]/40 hover:text-[#1A3A2E] disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </button>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[#1A3A2E] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2D6A4F] transition-colors ml-1"
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Carousel — bleeds past container edges */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateButtons}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide px-4 sm:px-[calc((100vw-80rem)/2+1.5rem)] pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {posts.map((post, i) => {
            const tag = post.fields.tags?.[0];
            const gradient = gradients[i % gradients.length];

            return (
              <Link
                key={post.sys.id}
                href={`/blog/${post.fields.slug}`}
                className="group flex-none w-[300px] sm:w-[330px] rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[#52B788]/25 transition-all duration-300 flex flex-col"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Cover / gradient block */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${gradient} flex flex-col justify-between p-5 overflow-hidden`}
                >
                  {/* Dot texture */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #95D5B2 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {/* Category tag — top right */}
                  {tag && (
                    <div className="flex justify-end">
                      <span
                        className={`relative z-10 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md ${tagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    </div>
                  )}
                  {/* Date — bottom left */}
                  <span className="relative z-10 text-[11px] font-medium text-white/50 tracking-wider">
                    {formatDate(post.fields.publishedDate)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-[#1A3A2E] text-base mb-2 group-hover:text-[#2D6A4F] transition-colors line-clamp-2 flex-1">
                    {post.fields.title}
                  </h3>
                  <p className="text-[#0F1A14]/55 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.fields.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-[#0F1A14]/40 font-medium">
                      {post.fields.author}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-[#52B788] font-medium">
                      Read <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* "All articles" sentinel card */}
          <Link
            href="/blog"
            className="group flex-none w-[200px] rounded-2xl border border-dashed border-[#52B788]/30 bg-[#52B788]/5 flex flex-col items-center justify-center gap-3 hover:bg-[#52B788]/10 hover:border-[#52B788]/60 transition-all"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="h-12 w-12 rounded-full bg-[#1A3A2E] flex items-center justify-center group-hover:bg-[#2D6A4F] transition-colors">
              <ArrowRight size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-[#1A3A2E]">All articles</span>
          </Link>
        </div>
      </div>

      {/* Mobile: show link */}
      <div className="sm:hidden mt-8 px-4">
        <Link
          href="/blog"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A3A2E] px-5 py-3 text-sm font-medium text-white hover:bg-[#2D6A4F] transition-colors"
        >
          All Articles <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
