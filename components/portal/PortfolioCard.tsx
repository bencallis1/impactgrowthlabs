import { Leaf, Heart, BookOpen, Recycle, ExternalLink } from "lucide-react";
import type { PortfolioCompany } from "@/types/contentful";

const sectorIcons: Record<string, React.ElementType> = {
  Climate: Leaf,
  Health: Heart,
  Education: BookOpen,
  "Circular Economy": Recycle,
};

export function PortfolioCard({ company }: { company: PortfolioCompany }) {
  const Icon = sectorIcons[company.fields.sector] || Leaf;
  const metrics = company.fields.metrics ?? {};

  return (
    <div className="rounded-xl bg-white border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#1A3A2E] flex items-center justify-center text-[#95D5B2]">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-[#1A3A2E]">
              {company.fields.name}
            </h3>
            <p className="text-xs text-[#52B788]">{company.fields.sector}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F7FAF8] text-[#2D6A4F] border border-[#52B788]/20">
            {company.fields.stage}
          </span>
          {company.fields.website && (
            <a
              href={company.fields.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#1A3A2E] transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-[#0F1A14]/60 mb-4 leading-relaxed">
        {company.fields.description}
      </p>

      {Object.keys(metrics).length > 0 && (
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
          {Object.entries(metrics)
            .slice(0, 2)
            .map(([key, val]) => (
              <div key={key}>
                <p className="text-lg font-semibold text-[#1A3A2E]">
                  {String(val)}
                </p>
                <p className="text-xs text-[#0F1A14]/40 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
