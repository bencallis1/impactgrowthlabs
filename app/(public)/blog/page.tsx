import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/contentful";
import { BlogCard } from "@/components/blog/BlogCard";
import { StaggerGrid, StaggerItem } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on impact investing, venture studio operations, and sustainable business.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-[#F7FAF8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
            Insights
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-[#1A3A2E] mb-6">
            From the studio
          </h1>
          <p className="max-w-2xl text-lg text-[#0F1A14]/60">
            Perspectives on impact investing, building mission-driven companies,
            and the future of capital allocation.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-[#0F1A14]/50">No posts published yet. Check back soon.</p>
        ) : (
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <StaggerItem key={post.sys.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </div>
  );
}
