import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/contentful";
import { BlogGrid } from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on impact investing, venture studio operations, and sustainable business.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.fields.tags ?? []))].sort();

  return (
    <div className="min-h-screen bg-[color:var(--color-cream)] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[color:var(--color-gold)] text-sm font-medium tracking-widest uppercase mb-4">
            Insights
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-[color:var(--color-indigo)] mb-6">
            From the studio
          </h1>
          <p className="max-w-2xl text-lg text-[color:var(--color-text-secondary)]">
            Perspectives on impact investing, building mission-driven companies,
            and the future of capital allocation.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-[color:var(--color-text-tertiary)]">
            No posts published yet. Check back soon.
          </p>
        ) : (
          <BlogGrid posts={posts} allTags={allTags} />
        )}
      </div>
    </div>
  );
}
