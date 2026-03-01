import { Hero } from "@/components/home/Hero";
import { ImpactMetrics } from "@/components/home/ImpactMetrics";
import { Services } from "@/components/home/Services";
import { Portfolio } from "@/components/home/Portfolio";
import { Team } from "@/components/home/Team";
import { BlogPreview } from "@/components/home/BlogPreview";
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

  return (
    <>
      <Hero />
      {/* <ImpactMetrics /> */}
      <Services />
      <Portfolio companies={companies} />
      <Team members={members} />
      <BlogPreview posts={posts} />
    </>
  );
}
