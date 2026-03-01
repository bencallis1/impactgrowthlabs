import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { AnimatedSection, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedSection";
import type { BlogPost } from "@/types/contentful";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="py-24 bg-[#F7FAF8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
              Insights
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E]">
              From the studio
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#2D6A4F] font-medium hover:gap-3 transition-all"
          >
            All articles <ArrowRight size={18} />
          </Link>
        </AnimatedSection>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => {
            const gradients = [
              "from-[#1A3A2E] via-[#2D6A4F] to-[#1A3A2E]",
              "from-[#0F2A20] via-[#1A3A2E] to-[#2D6A4F]",
              "from-[#2D6A4F] via-[#1A3A2E] to-[#0F2A20]",
            ];
            const gradient = gradients[i % gradients.length];
            return (
              <StaggerItem key={post.sys.id}>
                <Link
                  href={`/blog/${post.fields.slug}`}
                  className="group block rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 hover:border-[#52B788]/30 transition-all duration-300 h-full flex flex-col"
                >
                  {/* Cover image placeholder */}
                  <div className={`h-48 bg-gradient-to-br ${gradient} flex items-end justify-start p-5 relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #95D5B2 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    {post.fields.tags?.[0] && (
                      <span className="relative z-10 text-xs font-medium bg-white/20 text-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        {post.fields.tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#0F1A14]/40 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatDate(post.fields.publishedDate)}
                      </div>
                      <span className="font-medium text-[#0F1A14]/50">{post.fields.author}</span>
                    </div>
                    <h3 className="font-semibold text-[#1A3A2E] text-lg mb-2 group-hover:text-[#2D6A4F] transition-colors line-clamp-2 flex-1">
                      {post.fields.title}
                    </h3>
                    <p className="text-[#0F1A14]/60 text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.fields.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#52B788] font-medium">
                      Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}
