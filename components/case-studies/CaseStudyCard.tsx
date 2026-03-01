import Link from "next/link";
import { Calendar, TrendingUp } from "lucide-react";
import type { CaseStudy } from "@/types/contentful";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.fields.slug}`}
      className="group block rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#52B788]/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="h-56 bg-gradient-to-br from-[#0F1A14] via-[#1A3A2E] to-[#2D6A4F] p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute right-6 top-6 opacity-10">
          <TrendingUp size={80} className="text-white" />
        </div>
        <span className="inline-block rounded-full bg-[#52B788]/30 px-3 py-1 text-xs text-[#95D5B2] font-medium backdrop-blur-sm">
          Case Study
        </span>
        <div>
          <p className="text-[#95D5B2] text-sm mb-1">{study.fields.company}</p>
          <h2 className="font-serif text-xl text-white leading-snug line-clamp-2 group-hover:text-[#95D5B2] transition-colors">
            {study.fields.title}
          </h2>
        </div>
      </div>

      <div className="p-6">
        <p className="text-[#0F1A14]/60 text-sm leading-relaxed mb-4 line-clamp-3">
          {study.fields.excerpt}
        </p>

        {/* Impact highlight */}
        <div className="rounded-xl bg-[#F7FAF8] border border-[#52B788]/20 px-4 py-3 mb-4">
          <p className="text-xs text-[#52B788] font-medium uppercase tracking-wider mb-1">
            Impact
          </p>
          <p className="text-sm text-[#1A3A2E] font-medium">
            {study.fields.impactSummary}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-[#0F1A14]/40">
          <div className="flex items-center gap-1.5">
            <Calendar size={11} />
            {formatDate(study.fields.publishedDate)}
          </div>
          <span className="text-[#52B788] font-medium">Read case study →</span>
        </div>
      </div>
    </Link>
  );
}
