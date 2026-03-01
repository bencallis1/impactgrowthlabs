import { LinkedinIcon } from "lucide-react";
import Image from "next/image";
import { AnimatedSection, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedSection";
import type { TeamMember } from "@/types/contentful";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function richTextToPlainText(node: unknown): string {
  if (!node) return "";
  if (typeof node === "string") return node;

  if (Array.isArray(node)) {
    return node.map(richTextToPlainText).join(" ");
  }

  if (typeof node === "object") {
    const maybeNode = node as { nodeType?: unknown; value?: unknown; content?: unknown };
    if (maybeNode.nodeType === "text" && typeof maybeNode.value === "string") {
      return maybeNode.value;
    }
    if (Array.isArray(maybeNode.content)) {
      return maybeNode.content.map(richTextToPlainText).join(" ");
    }
  }

  return "";
}

function getAssetUrl(asset: unknown): string | null {
  const maybeAsset = asset as {
    fields?: { file?: { url?: unknown } };
  };
  const url = maybeAsset?.fields?.file?.url;
  if (typeof url !== "string" || url.length === 0) return null;
  return url.startsWith("//") ? `https:${url}` : url;
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

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            
            <StaggerItem key={member.sys.id}>
              <div className="group rounded-2xl border border-gray-100 bg-[#F7FAF8] p-8 text-center hover:shadow-xl hover:-translate-y-0.5 hover:border-[#52B788]/30 transition-all duration-300">
                {/* Avatar with ring */}
                <div className="mx-auto mb-5 h-24 w-24 rounded-full p-0.5 bg-gradient-to-br from-[#52B788] to-[#1A3A2E]">
                  <div className="relative h-full w-full rounded-full overflow-hidden bg-[#1A3A2E] flex items-center justify-center text-white text-2xl font-serif">
                    {(() => {
                      const assetUrl = getAssetUrl(
                        (member.fields as unknown as { avatar?: unknown }).avatar ??
                          member.fields.photo
                      );

                      if (!assetUrl) {
                        return <span aria-hidden="true">{initials(member.fields.name)}</span>;
                      }

                      return (
                        <Image
                          src={assetUrl}
                          alt={`Profile photo of ${member.fields.name}`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      );
                    })()}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#1A3A2E] mb-1">
                  {member.fields.name}
                </h3>
                <p className="text-[#52B788] text-sm font-medium mb-4">
                  {member.fields.role}
                </p>
                <p className="text-[#0F1A14]/60 text-sm leading-relaxed mb-5">
                  {(typeof member.fields.bio === "string"
                    ? member.fields.bio
                    : richTextToPlainText(member.fields.bio)
                  )
                    .replace(/\s+/g, " ")
                    .trim()}
                </p>
                {member.fields.linkedIn && (
                  <a
                    href={member.fields.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2D6A4F] hover:text-[#1A3A2E] transition-colors"
                  >
                    <LinkedinIcon size={14} />
                    LinkedIn
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
