import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Leaf,
  Heart,
  BookOpen,
  Recycle,
} from "lucide-react";
import { getPortfolioCompany, getPortfolioCompanies } from "@/lib/contentful";

export const revalidate = 3600;

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

const stageColors: Record<string, string> = {
  "Pre-Seed": "bg-purple-50 text-purple-700 border-purple-200",
  Seed: "bg-orange-50 text-orange-700 border-orange-200",
  "Series A": "bg-teal-50 text-teal-700 border-teal-200",
  "Series B": "bg-indigo-50 text-indigo-700 border-indigo-200",
  Growth: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export async function generateStaticParams() {
  const companies = await getPortfolioCompanies();
  return companies
    .filter((c) => c.fields.slug)
    .map((c) => ({ slug: c.fields.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getPortfolioCompany(slug);
  if (!company) return {};
  return {
    title: company.fields.name,
    description: company.fields.description,
  };
}

function formatMetricKey(key: string): string {
  // Convert camelCase or compound keys into readable labels
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim();
}

export default async function PortfolioCompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getPortfolioCompany(slug);
  if (!company) notFound();

  const sector = company.fields.sector;
  const Icon = sectorIcons[sector] || Leaf;
  const sectorColorClass =
    sectorColors[sector] || "bg-gray-50 text-gray-700 border-gray-200";
  const stageColorClass =
    stageColors[company.fields.stage] ||
    "bg-gray-50 text-gray-700 border-gray-200";
  const metricEntries = company.fields.metrics
    ? Object.entries(company.fields.metrics)
    : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero strip */}
      <div className="bg-gradient-to-br from-[#0F1A14] via-[#1A3A2E] to-[#2D6A4F] pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#95D5B2] hover:text-white mb-10 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Icon */}
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#95D5B2] shrink-0 border border-white/20">
              <Icon size={28} />
            </div>

            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${sectorColorClass}`}
                >
                  {sector}
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${stageColorClass}`}
                >
                  {company.fields.stage}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4 leading-tight">
                {company.fields.name}
              </h1>

              {/* Website link */}
              {company.fields.website && (
                <a
                  href={company.fields.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[#95D5B2] hover:text-white transition-colors font-medium"
                >
                  Visit website <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main column */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl text-[#1A3A2E] mb-5">
              About {company.fields.name}
            </h2>
            <p className="text-[#0F1A14]/70 leading-relaxed text-lg">
              {company.fields.description}
            </p>

            {/* CTA bar */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A3A2E] px-7 py-3.5 text-sm font-medium text-white hover:bg-[#2D6A4F] transition-colors group"
              >
                Apply as a Founder
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1A3A2E] px-7 py-3.5 text-sm font-medium text-[#1A3A2E] hover:bg-[#1A3A2E] hover:text-white transition-all"
              >
                View Case Studies
              </Link>
            </div>
          </div>

          {/* Sidebar: metrics */}
          {metricEntries.length > 0 && (
            <div className="lg:col-span-1">
              <h2 className="font-serif text-2xl text-[#1A3A2E] mb-5">
                Impact metrics
              </h2>
              <div className="flex flex-col gap-4">
                {metricEntries.map(([key, val]) => (
                  <div
                    key={key}
                    className="rounded-2xl bg-[#F7FAF8] border border-gray-100 p-5"
                  >
                    <p className="text-2xl font-serif font-medium text-[#1A3A2E] mb-1">
                      {String(val)}
                    </p>
                    <p className="text-xs text-[#0F1A14]/50 uppercase tracking-widest font-medium">
                      {formatMetricKey(key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA band */}
      <div className="bg-[#F7FAF8] border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-2">
              Impact Growth Labs
            </p>
            <h3 className="font-serif text-2xl text-[#1A3A2E]">
              Building alongside founders from day zero.
            </h3>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#2D6A4F] font-medium hover:gap-3 transition-all shrink-0"
          >
            Explore full portfolio <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
