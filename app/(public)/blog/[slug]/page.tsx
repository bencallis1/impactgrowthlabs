import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/contentful";
import { RichTextRenderer } from "@/components/blog/RichTextRenderer";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.fields.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.fields.title,
    description: post.fields.excerpt,
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[color:var(--color-cream)] pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[color:var(--color-gold)] hover:text-[color:var(--color-indigo)] mb-10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Tags */}
        {post.fields.tags && post.fields.tags.length > 0 && (
          <div className="flex gap-2 mb-5">
            {post.fields.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[color:var(--color-cream)] border border-[color:var(--color-border-gold)] px-3 py-1 text-xs text-[color:var(--color-indigo)] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl text-[color:var(--color-indigo)] leading-tight mb-6">
          {post.fields.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-[color:var(--color-text-tertiary)] mb-10 pb-10 border-b border-[color:var(--color-border-light)]">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.fields.publishedDate)}
          </div>
          <span>·</span>
          <span>{post.fields.author}</span>
        </div>

        {/* Excerpt */}
        <p className="text-xl text-[color:var(--color-text-secondary)] leading-relaxed mb-10 font-medium">
          {post.fields.excerpt}
        </p>

        {/* Body */}
        {post.fields.body?.content?.length > 0 ? (
          <RichTextRenderer document={post.fields.body} />
        ) : (
          <p className="text-[color:var(--color-text-tertiary)] italic">
            Full article coming soon. Check back later.
          </p>
        )}
      </div>
    </div>
  );
}
