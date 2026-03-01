import Link from "next/link";
import { ArrowRight, LinkedinIcon } from "lucide-react";
import type { TeamMember } from "@/types/contentful";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

interface Props {
  member: TeamMember;
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

export function TeamMemberCard({ member }: Props) {
  const { name, slug, role, bio, linkedIn } = member.fields;
  const bioText = (
    typeof bio === "string" ? bio : richTextToPlainText(bio)
  )
    .replace(/\s+/g, " ")
    .trim();
    console.log('THE MEMBER',member)

  return (
    <div className="relative group flex gap-5 rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:-translate-y-0.5 hover:border-[#52B788]/30 transition-all duration-300">
      {/* Avatar */}
      <div className="shrink-0 h-16 w-16 rounded-full p-0.5 bg-gradient-to-br from-[#52B788] to-[#1A3A2E] self-start mt-0.5">
        <div className="h-full w-full rounded-full bg-[#1A3A2E] flex items-center justify-center text-white text-lg font-serif">
          {initials(name)}
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-[#1A3A2E] group-hover:text-[#2D6A4F] transition-colors">
          {name}
        </h3>
        <p className="text-[#52B788] text-sm font-medium mb-2">{role}</p>
        <p className="text-[#0F1A14]/60 text-sm leading-relaxed line-clamp-2 mb-3">
          {bioText}
        </p>
        <div className="flex items-center gap-4">
          {/* LinkedIn sits above the stretched link (z-10) */}
          {linkedIn && (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-xs font-medium text-[#2D6A4F] hover:text-[#1A3A2E] transition-colors"
            >
              <LinkedinIcon size={12} />
              LinkedIn
            </a>
          )}
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#52B788] group-hover:gap-1.5 transition-all pointer-events-none">
            Full profile <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Stretched link — covers the whole card; LinkedIn <a> above it via z-10 */}
      <Link href={`/team/${slug}`} className="absolute inset-0 rounded-2xl">
        <span className="sr-only">View {name}&apos;s profile</span>
      </Link>
    </div>
  );
}
