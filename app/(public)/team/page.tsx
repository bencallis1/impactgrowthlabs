import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/contentful";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { MEMBER_TYPES } from "@/types/contentful";
import type { MemberType, TeamMember } from "@/types/contentful";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the operators, advisors, and board members behind Impact Growth Labs.",
};

export const revalidate = 3600;

const TYPE_LABELS: Record<MemberType, string> = {
  Founder: "Founders",
  Team: "Core Team",
  Advisor: "Advisors",
  "Industry Expert": "Industry Experts",
  Board: "Board",
};

// function getAssetUrl(asset:object): string | null {

//   const maybeAsset = asset as {
//     fields?: { file?: { url?: unknown } };
//   };

//   const url = asset.fields.photo.fields.file.url;
//   console.log('THE URL',url)
//   console.log('the asset', url.startsWith("//") ? `https:${url}` : url)


//   // if (typeof url !== "string" || url.length === 0) return null;

//   return url.startsWith("//") ? `https:${url}` : url;
// }


export default async function TeamPage() {
  const members = await getTeamMembers();

  // Group by memberType, preserving the canonical MEMBER_TYPES order
  const grouped = MEMBER_TYPES.reduce<Record<MemberType, TeamMember[]>>(
    (acc, type) => {
      acc[type] = members.filter((m) => m.fields.memberType === type);
      return acc;
    },
    {} as Record<MemberType, TeamMember[]>
  );

  // Only render groups that have at least one member
  const activeGroups = MEMBER_TYPES.filter((type) => grouped[type].length > 0);

  return (
    <div className="min-h-screen bg-[#F7FAF8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
            Our People
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-[#1A3A2E] mb-6">
            The team
          </h1>
          <p className="max-w-2xl text-lg text-[#0F1A14]/60">
            Operators, scientists, and sector experts who have built at scale —
            now working alongside founders to create lasting impact.
          </p>
        </AnimatedSection>

        {/* Grouped sections */}
        <div className="space-y-16">
          {activeGroups.map((type) => (
            <AnimatedSection key={type}>
              <h2 className="font-serif text-2xl text-[#1A3A2E] mb-6 pb-3 border-b border-[#52B788]/20">
                {TYPE_LABELS[type]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grouped[type].map((member) => (
                  <TeamMemberCard key={member.sys.id} member={member}  />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
