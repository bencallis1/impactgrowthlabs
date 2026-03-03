import { TeamMember, BlogPost } from "@/types/contentful";

export function getBlogCoverImageUrl(blog: BlogPost): string | null {
    const url = blog.fields.coverImage?.fields.file?.url;
    if (typeof url !== "string" || url.length === 0) return null;
    return url.startsWith("//") ? `https:${url}` : url;
  }