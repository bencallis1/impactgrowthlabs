"use client";

import { useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { TagFilter } from "@/components/ui/TagFilter";
import type { BlogPost } from "@/types/contentful";

interface Props {
  posts: BlogPost[];
  allTags: string[];
}

export function BlogGrid({ posts, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.fields.tags?.includes(activeTag))
    : posts;

  return (
    <>
      <TagFilter tags={allTags} activeTag={activeTag} onChange={setActiveTag} />

      {filtered.length === 0 ? (
        <p className="text-[#0F1A14]/50">No posts match this tag.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.sys.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
