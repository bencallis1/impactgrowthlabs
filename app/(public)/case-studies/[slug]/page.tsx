import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { getCaseStudy, getCaseStudies } from "@/lib/contentful";
import { RichTextRenderer } from "@/components/blog/RichTextRenderer";

export const revalidate = 3600;

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.fields.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.fields.title,
    description: study.fields.excerpt,
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-[#2D6A4F] hover:text-[#1A3A2E] mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Case Studies
        </Link>

        {/* Company badge */}
        <span className="inline-block rounded-full bg-[#F7FAF8] border border-[#52B788]/30 px-4 py-1.5 text-sm text-[#2D6A4F] font-medium mb-5">
          {study.fields.company}
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E] leading-tight mb-6">
          {study.fields.title}
        </h1>

        <p className="text-sm text-[#0F1A14]/50 mb-10 pb-10 border-b border-gray-100">
          Published {formatDate(study.fields.publishedDate)}
        </p>

        {/* Impact summary card */}
        <div className="mb-10 rounded-2xl bg-[#1A3A2E] p-6 flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-[#52B788]/20 flex items-center justify-center text-[#95D5B2] shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[#95D5B2] text-xs font-medium uppercase tracking-widest mb-1">
              Impact Summary
            </p>
            <p className="text-white text-lg font-medium">
              {study.fields.impactSummary}
            </p>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-xl text-[#0F1A14]/60 leading-relaxed mb-10 font-medium">
          {study.fields.excerpt}
        </p>

        {/* Body */}
        {study.fields.body?.content?.length > 0 ? (
          <RichTextRenderer document={study.fields.body} />
        ) : (
          <p className="text-[#0F1A14]/50 italic">
            Full case study coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
