import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/contentful";
import { CaseStudiesGrid } from "@/components/case-studies/CaseStudiesGrid";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Deep dives into how our portfolio companies are creating measurable impact.",
};

export const revalidate = 3600;

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  const allTags = [...new Set(studies.flatMap((s) => s.fields.tags ?? []))].sort();

  return (
    <div className="min-h-screen bg-[#F7FAF8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
            Case Studies
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-[#1A3A2E] mb-6">
            Impact in practice
          </h1>
          <p className="max-w-2xl text-lg text-[#0F1A14]/60">
            Detailed stories of how our portfolio companies tackled hard
            problems and created real-world change.
          </p>
        </div>

        {studies.length === 0 ? (
          <p className="text-[#0F1A14]/50">No case studies published yet.</p>
        ) : (
          <CaseStudiesGrid studies={studies} allTags={allTags} />
        )}
      </div>
    </div>
  );
}
