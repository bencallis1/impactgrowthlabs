import Link from "next/link";
import { ArrowRight, Leaf, Heart, BookOpen, Recycle } from "lucide-react";
import type { PortfolioCompany } from "@/types/contentful";
import { stripMarkdown } from "@/components/ui/MarkdownRenderer";

const sectorIcons: Record<string, React.ElementType> = {
  Climate: Leaf,
  Health: Heart,
  Education: BookOpen,
  "Circular Economy": Recycle,
};

const sectorColors: Record<string, { badge: string; icon: string }> = {
  Climate: {
    badge: "bg-green-50 text-green-700 border-green-200",
    icon: "bg-green-100 text-green-700",
  },
  Health: {
    badge: "bg-red-50 text-red-700 border-red-200",
    icon: "bg-red-100 text-red-700",
  },
  Education: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "bg-blue-100 text-blue-700",
  },
  "Circular Economy": {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "bg-amber-100 text-amber-700",
  },
};

const defaultColors = {
  badge: "bg-gray-50 text-gray-700 border-gray-200",
  icon: "bg-gray-100 text-gray-700",
};

export function PortfolioCard({ company }: { company: PortfolioCompany }) {
  const sector = company.fields.sector;
  const Icon = sectorIcons[sector] || Leaf;
  const colors = sectorColors[sector] || defaultColors;
  const slug = company.fields.slug ?? "#";
  const metricEntries = company.fields.metrics
    ? Object.entries(company.fields.metrics).slice(0, 3)
    : [];

  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group block rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 hover:border-[#52B788]/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Header strip */}
      <div className="bg-[#F7FAF8] p-6 pb-5 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${colors.icon}`}>
            <Icon size={20} />
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colors.badge}`}
          >
            {company.fields.stage}
          </span>
        </div>
        <h3 className="font-semibold text-[#1A3A2E] text-lg group-hover:text-[#2D6A4F] transition-colors">
          {company.fields.name}
        </h3>
        <p className="text-xs font-medium text-[#52B788] mt-0.5">{sector}</p>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-sm text-[#0F1A14]/60 leading-relaxed line-clamp-3 mb-4 flex-1">
          {stripMarkdown(company.fields.description)}
        </p>

        {/* Metrics */}
        {metricEntries.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 mb-4">
            {metricEntries.map(([key, val]) => (
              <span
                key={key}
                className="text-xs bg-[#F7FAF8] text-[#2D6A4F] font-medium px-2.5 py-1 rounded-full border border-[#52B788]/20"
              >
                {String(val)}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-sm text-[#52B788] font-medium">
          Learn more{" "}
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
