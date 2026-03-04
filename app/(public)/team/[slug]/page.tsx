import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText, LinkedinIcon, Twitter } from "lucide-react";
import {
  getTeamMembers,
  getTeamMember,
  getBlogPostsByAuthor,
  getCaseStudiesByAuthor,
} from "@/lib/contentful";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { RichTextRenderer } from "@/components/blog/RichTextRenderer";
import type { Document } from "@contentful/rich-text-types";
import type { TeamMember } from "@/types/contentful";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const members = await getTeamMembers();
  return members.map((m) => ({ slug: m.fields.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) return { title: "Team Member Not Found" };

  const bio = member.fields.bio;
  const bioDescription =
    typeof bio === "string" ? bio : "Team member profile";

  return {
    title: member.fields.name,
    description: bioDescription,
  };
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getAssetUrl(member: TeamMember): string | null {
  const url = member.fields.photo?.fields.file?.url;
  if (typeof url !== "string" || url.length === 0) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;

  const member = await getTeamMember(slug);
  if (!member) notFound();

  const { name, role, bio, memberType, linkedIn, twitter, photo } = member.fields;
  const isRichTextBio = typeof bio === "object" && bio !== null;


  // Fetch related writing in parallel
  const [blogPosts, caseStudies] = await Promise.all([
    getBlogPostsByAuthor(member.sys.id),
    getCaseStudiesByAuthor(member.sys.id),
  ]);

  const hasWriting = blogPosts.length > 0 || caseStudies.length > 0;

  return (
    <div className="min-h-screen bg-[color:var(--color-cream)] pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <AnimatedSection className="mb-10">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-gold)] hover:text-[color:var(--color-indigo)] transition-colors"
          >
            <ArrowLeft size={14} />
            All team members
          </Link>
        </AnimatedSection>

        {/* Profile header */}
        <AnimatedSection className="flex flex-col sm:flex-row gap-8 items-start mb-12">
          {/* Avatar */}
          {/* <div className="shrink-0 h-28 w-28 rounded-full p-0.5 bg-gradient-to-br from-[#52B788] to-[#1A3A2E]">
            <div className="h-full w-full rounded-full bg-[#1A3A2E] flex items-center justify-center text-white text-3xl font-serif">
              {initials(name)}
            </div>
          </div> */}
          <div className="shrink-0 h-16 w-16 rounded-full p-0.5 bg-gradient-to-br from-[color:var(--color-gold)] to-[color:var(--color-indigo)] self-start mt-0.5">
            <div className="relative h-full w-full rounded-full overflow-hidden bg-[color:var(--color-indigo)] flex items-center justify-center text-[color:var(--color-text-on-dark)] text-lg font-serif">
              {(() => {
                const url = getAssetUrl(member);
                if (!url) {
                  return <span aria-hidden="true">{initials(name)}</span>;
                }
                return (
                  <Image
                    src={url}
                    alt={`Profile photo of ${name}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                );
              })()}
            </div>
          </div>

          <div className="flex-1">
            {memberType && (
              <span className="inline-block text-xs font-medium tracking-widest uppercase text-[color:var(--color-gold)] mb-2">
                {memberType}
              </span>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl text-[color:var(--color-indigo)] mb-2">
              {name}
            </h1>
            <p className="text-lg text-[color:var(--color-text-secondary)] font-medium mb-4">
              {role}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {linkedIn && (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-indigo)] hover:text-[color:var(--color-gold)] transition-colors"
                >
                  <LinkedinIcon size={15} />
                  LinkedIn
                </a>
              )}
              {twitter && (
                <a
                  href={`https://twitter.com/${twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-indigo)] hover:text-[color:var(--color-gold)] transition-colors"
                >
                  <Twitter size={15} />
                  {twitter}
                </a>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Bio */}
        <AnimatedSection delay={0.1} className="mb-16">
          {isRichTextBio ? (
            <RichTextRenderer document={bio as Document} />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-[color:var(--color-text-secondary)] leading-relaxed">
                {bio}
              </p>
            </div>
          )}
        </AnimatedSection>

        {/* Related writing */}
        {hasWriting && (
          <AnimatedSection delay={0.2}>
            <div className="border-t border-[color:var(--color-border-gold)] pt-12">
              <h2 className="font-serif text-3xl text-[color:var(--color-indigo)] mb-8">
                Writing &amp; research
              </h2>

              <div className="space-y-10">
                {/* Blog posts */}
                {blogPosts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen size={16} className="text-[color:var(--color-gold)]" />
                      <h3 className="text-sm font-medium tracking-widest uppercase text-[color:var(--color-gold)]">
                        Blog Posts
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {blogPosts.map((post) => (
                        <Link
                          key={post.sys.id}
                          href={`/blog/${post.fields.slug}`}
                          className="group flex items-start gap-4 rounded-xl border border-[color:var(--color-border-light)] bg-[#ffffff] p-5 hover:shadow-md hover:border-[color:var(--color-border-gold)] transition-all duration-300"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-[color:var(--color-indigo)] group-hover:text-[color:var(--color-gold)] transition-colors mb-1">
                              {post.fields.title}
                            </h4>
                            <p className="text-sm text-[color:var(--color-text-secondary)] line-clamp-2 mb-2">
                              {post.fields.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-[color:var(--color-text-tertiary)]">
                              <span>{formatDate(post.fields.publishedDate)}</span>
                              {post.fields.readTimeMinutes && (
                                <>
                                  <span>·</span>
                                  <span>{post.fields.readTimeMinutes} min read</span>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Case studies */}
                {caseStudies.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText size={16} className="text-[color:var(--color-gold)]" />
                      <h3 className="text-sm font-medium tracking-widest uppercase text-[color:var(--color-gold)]">
                        Case Studies
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {caseStudies.map((study) => (
                        <Link
                          key={study.sys.id}
                          href={`/case-studies/${study.fields.slug}`}
                          className="group flex items-start gap-4 rounded-xl border border-[color:var(--color-border-light)] bg-[#ffffff] p-5 hover:shadow-md hover:border-[color:var(--color-border-gold)] transition-all duration-300"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-[color:var(--color-indigo)] group-hover:text-[color:var(--color-gold)] transition-colors mb-1">
                              {study.fields.title}
                            </h4>
                            <p className="text-sm text-[color:var(--color-text-secondary)] line-clamp-2 mb-2">
                              {study.fields.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-[color:var(--color-text-tertiary)]">
                              <span>{formatDate(study.fields.publishedDate)}</span>
                              {study.fields.impactSummary && (
                                <>
                                  <span>·</span>
                                  <span className="text-[color:var(--color-gold)]">
                                    {study.fields.impactSummary}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
