import type { Metadata } from "next";
import { getPortfolioCompanies } from "@/lib/contentful";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Mission-aligned founders solving the world's most pressing problems — backed by Impact Growth Labs.",
};

export const revalidate = 3600;

export default async function PortfolioPage() {
  const companies = await getPortfolioCompanies();
  // Sectors are always present and act as primary tags; custom tags are additive
  const allTags = [
    ...new Set(companies.flatMap((c) => [c.fields.sector, ...(c.fields.tags ?? [])])),
  ].sort();

  return (
    <div className="min-h-screen bg-[#F7FAF8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
            Portfolio
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-[#1A3A2E] mb-6">
            Companies we believe in
          </h1>
          <p className="max-w-2xl text-lg text-[#0F1A14]/60 leading-relaxed">
            We partner with founders who are building measurable solutions to
            climate, health, education, and resource challenges — from the
            earliest days through Series A and beyond.
          </p>
        </div>

        {/* Grid */}
        {companies.length === 0 ? (
          <p className="text-[#0F1A14]/50">No portfolio companies listed yet.</p>
        ) : (
          <PortfolioGrid companies={companies} allTags={allTags} />
        )}
      </div>
    </div>
  );
}
