import Image from "next/image";
import { AnimatedSection, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedSection";
import type { TeamMember } from "@/types/contentful";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";


function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}



function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Team({ members }: { members: TeamMember[] }) {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
            The Team
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E] mb-6">
            Operators turned investors
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#0F1A14]/60">
            We&apos;ve built, scaled, and exited companies. We bring that
            experience to every founder we back.
          </p>
        </AnimatedSection>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => {
 
            const { name, role, linkedIn, twitter } = member.fields;
            const hasSocials = linkedIn || twitter;

            return (
              <StaggerItem key={member.sys.id}>
                <TeamMemberCard key={member.sys.id} member={member} />
                
                  
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}
