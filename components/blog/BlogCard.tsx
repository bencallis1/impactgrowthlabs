import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import type { BlogPost } from "@/types/contentful";
import Image from "next/image";
import { getBlogCoverImageUrl } from "@/helpers/contentFunctions";
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.fields.slug}`}
      className="group block rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#52B788]/30 transition-all duration-300"
    >
      {/* Cover */}
      <div className="h-52  relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center ">
          {/* <span className="font-serif text-8xl text-white">IGL</span> */}
          {(() => {
            const coverUrl = getBlogCoverImageUrl(post);
            if (!coverUrl) return <span className="font-serif text-8xl text-white">IGL</span>;
            return (
              <Image
              fill={true}
                src={coverUrl}
                alt={post.fields.title}
                // width={100}
                // height={100}
              />
            );
          })()}
        </div>
        {post.fields.tags && post.fields.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2">
            {post.fields.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs text-white font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-[#0F1A14]/40 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            {formatDate(post.fields.publishedDate)}
          </div>
          <span>{post.fields.author}</span>
        </div>
        <h2 className="font-semibold text-[#1A3A2E] text-xl mb-3 group-hover:text-[#2D6A4F] transition-colors line-clamp-2 leading-snug">
          {post.fields.title}
        </h2>
        <p className="text-[#0F1A14]/60 text-sm leading-relaxed line-clamp-3">
          {post.fields.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-[#52B788]">
          <Tag size={13} />
          Read article →
        </div>
      </div>
    </Link>
  );
}
