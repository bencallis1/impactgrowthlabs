"use client";

import { useState } from "react";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { TagFilter } from "@/components/ui/TagFilter";
import type { CaseStudy } from "@/types/contentful";

interface Props {
  studies: CaseStudy[];
  allTags: string[];
}

export function CaseStudiesGrid({ studies, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? studies.filter((s) => s.fields.tags?.includes(activeTag))
    : studies;

  return (
    <>
      <TagFilter tags={allTags} activeTag={activeTag} onChange={setActiveTag} />

      {filtered.length === 0 ? (
        <p className="text-[#0F1A14]/50">No case studies match this tag.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((study) => (
            <CaseStudyCard key={study.sys.id} study={study} />
          ))}
        </div>
      )}
    </>
  );
}
