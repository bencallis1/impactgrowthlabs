"use client";

import { useState } from "react";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { TagFilter } from "@/components/ui/TagFilter";
import type { PortfolioCompany } from "@/types/contentful";

interface Props {
  companies: PortfolioCompany[];
  allTags: string[];
}

export function PortfolioGrid({ companies, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? companies.filter((c) => {
        // Match against both the sector (always present) and any additional tags
        const allCompanyTags = [c.fields.sector, ...(c.fields.tags ?? [])];
        return allCompanyTags.includes(activeTag);
      })
    : companies;

  return (
    <>
      <TagFilter tags={allTags} activeTag={activeTag} onChange={setActiveTag} />

      {filtered.length === 0 ? (
        <p className="text-[#0F1A14]/50">No companies match this tag.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((company) => (
            <PortfolioCard key={company.sys.id} company={company} />
          ))}
        </div>
      )}
    </>
  );
}
