import { Hero } from "@/components/nalanda/sections/Hero";
import { ImpactBar } from "@/components/nalanda/sections/ImpactBar";
import { SectionWrapper } from "@/components/nalanda/sections/SectionWrapper";
import { SectionHeader } from "@/components/nalanda/sections/SectionHeader";
import { VentureCard } from "@/components/nalanda/sections/VentureCard";
import {
  getBlogPosts,
  getPortfolioCompanies,
  getTeamMembers,
} from "@/lib/contentful";

export const revalidate = 3600;

export default async function HomePage() {
  const [posts, companies, members] = await Promise.all([
    getBlogPosts(),
    getPortfolioCompanies(),
    getTeamMembers(),
  ]);

  // console.log('MEMMMMBERS', members)

  const featuredCompanies = companies.slice(0, 3);
  const featuredPosts = posts.slice(0, 3);
  const featuredTeam = members.slice(0, 3);

  return (
    <main>
      <Hero
        eyebrow="Impact venture studio"
        headline={"Everything is connected.\nWe invest accordingly."}
        subheadline="The challenges facing people and the living world are serious, interconnected, and already here. So are the founders building coherent, regenerative solutions."
        secondaryLine="Named after the university that lasted 700 years. Thinking on a thousand-year horizon."
        ctas={[
          {
            label: "Explore our work →",
            href: "/ventures",
          },
          {
            label: "Tell us about your work →",
            href: "/apply",
            variant: "text",
          },
        ]}
        variant="light"
      />

      <ImpactBar />

      <SectionWrapper variant="cream">
        <SectionHeader
          eyebrow="Ventures"
          headline={"Founders we are\nhonored to stand beside."}
          subhead="A small sample of the work already underway. Each venture is a long-term relationship, not a single transaction."
          align="left"
          variant="light"
        />
        <div className="grid-3">
          {featuredCompanies.map((company, index) => (
            <VentureCard
              key={company.sys.id}
              name={company.fields.name}
              description={company.fields.description}
              stage={company.fields.stage}
              focusArea={company.fields.sector}
              href={
                company.fields.slug
                  ? `/portfolio/${company.fields.slug}`
                  : undefined
              }
              delay={index * 120}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper variant="white">
        <SectionHeader
          eyebrow="The collective"
          headline={"The people carrying\nthis work forward."}
          subhead="Operators, scientists, and stewards who have spent years building in the real world — now in service to founders."
          align="left"
          variant="light"
        />
        <div className="grid-3">
          {featuredTeam.map((member) => (
            <div key={member.sys.id}>
              {/* Reuse existing data in a simple Nalanda-style teaser card */}
              <a
                href={`/team/${member.fields.slug}`}
                className="block bg-white border border-[color:var(--color-border-light)] p-4 no-underline hover:-translate-y-1 hover:border-[color:var(--color-border-gold)] transition-all duration-300"
              >
                <p className="text-[color:var(--color-text-tertiary)] text-xs tracking-[0.25em] uppercase mb-1">
                  {member.fields.memberType}
                </p>
                <h3 className="font-serif text-xl italic text-[color:var(--color-indigo)] mb-1">
                  {member.fields.name}
                </h3>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  {member.fields.role}
                </p>
              </a>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper variant="cream" narrow>
        <SectionHeader
          eyebrow="Journal"
          headline={"Thinking in\nlonger timescales."}
          subhead="Selected essays and dispatches from the work — reflections on power, coherence, and what it means to build for a future that will remember us."
          align="left"
          variant="light"
        />
        <div className="space-y-4">
          {featuredPosts.map((post) => (
            <a
              key={post.sys.id}
              href={`/blog/${post.fields.slug}`}
              className="block border-t border-[color:var(--color-border-light)] py-4 no-underline group"
            >
              <p className="text-[color:var(--color-text-tertiary)] text-xs tracking-[0.25em] uppercase mb-2">
                {new Date(post.fields.publishedDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </p>
              <h3 className="font-serif text-xl italic text-[color:var(--color-indigo)] mb-1 group-hover:text-[color:var(--color-gold)] transition-colors">
                {post.fields.title}
              </h3>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {post.fields.excerpt}
              </p>
            </a>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
