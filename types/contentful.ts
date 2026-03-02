import type { Document } from "@contentful/rich-text-types";

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

export interface ContentfulAsset {
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: { size: number; image?: { width: number; height: number } };
      fileName: string;
      contentType: string;
    };
  };
}

// ---------------------------------------------------------------------------
// Blog Post
// ---------------------------------------------------------------------------

export interface BlogPost {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    body: Document;
    coverImage?: ContentfulAsset;
    /** Plain-text author name — kept for backward compatibility */
    author: string;
    publishedDate: string;
    tags?: string[];
    // New fields
    /** Linked TeamMember entry — preferred over plain-text author */
    authorRef?: TeamMember;
    relatedPosts?: BlogPost[];
    featured?: boolean;
    readTimeMinutes?: number;
  };
}

// ---------------------------------------------------------------------------
// Case Study
// ---------------------------------------------------------------------------

export interface CaseStudy {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    body: Document;
    coverImage?: ContentfulAsset;
    /** Plain-text company name — kept for backward compatibility */
    company: string;
    impactSummary: string;
    publishedDate: string;
    // New fields
    /** Linked PortfolioCompany entry — preferred over plain-text company */
    companyRef?: PortfolioCompany;
    /** Linked TeamMember entry — author of this case study */
    authorRef?: TeamMember;
    featured?: boolean;
    sdgs?: string[];
    tags?: string[];
    videoUrl?: string;
  };
}

// ---------------------------------------------------------------------------
// Portfolio Company
// ---------------------------------------------------------------------------

export interface PortfolioCompany {
  sys: { id: string };
  fields: {
    name: string;
    slug?: string;
    logo?: ContentfulAsset;
    website?: string;
    sector: string;
    stage: string;
    description: string;
    metrics?: Record<string, string | number>;
    // New fields
    featured?: boolean;
    location?: string;
    investmentDate?: string;
    foundingYear?: number;
    sdgs?: string[];
    tags?: string[];
    impactThesis?: string;
  };
}

// ---------------------------------------------------------------------------
// Team Member
// ---------------------------------------------------------------------------

export const MEMBER_TYPES = [
  "Founder",
  "Team",
  "Advisor",
  "Industry Expert",
  "Board",
] as const;

export type MemberType = (typeof MEMBER_TYPES)[number];

export interface TeamMember {
  sys: { id: string };
  fields: {
    name: string;
    slug: string;
    role: string;
    bio: string | Document;
    photo: ContentfulAsset;
    linkedIn?: string;
    twitter?: string;
    sortOrder?: number;
    featured?: boolean;
    memberType?: MemberType;
  };
}

// ---------------------------------------------------------------------------
// Portal Document
// ---------------------------------------------------------------------------

export interface PortalDocument {
  sys: { id: string };
  fields: {
    title: string;
    description?: string;
    file: ContentfulAsset;
    publishedDate: string;
    category: string;
  };
}

// ---------------------------------------------------------------------------
// Portal News Item
// ---------------------------------------------------------------------------

export interface PortalNewsItem {
  sys: { id: string };
  fields: {
    title: string;
    summary: string;
    /** Plain-text company name — kept for backward compatibility */
    company: string;
    publishedDate: string;
    link?: string;
    // New fields
    companyRef?: PortfolioCompany;
  };
}

// ---------------------------------------------------------------------------
// Testimonial (new)
// ---------------------------------------------------------------------------

export interface Testimonial {
  sys: { id: string };
  fields: {
    quote: string;
    authorName: string;
    authorRole: string;
    company?: string;
    avatar?: ContentfulAsset;
    featured?: boolean;
    publishedDate?: string;
  };
}

// ---------------------------------------------------------------------------
// Press Item (new)
// ---------------------------------------------------------------------------

export interface PressItem {
  sys: { id: string };
  fields: {
    title: string;
    publication: string;
    excerpt?: string;
    url: string;
    publicationLogo?: ContentfulAsset;
    publishedDate: string;
    featured?: boolean;
  };
}

// ---------------------------------------------------------------------------
// FAQ (new)
// ---------------------------------------------------------------------------

export interface FAQ {
  sys: { id: string };
  fields: {
    question: string;
    answer: Document;
    category?: string;
    sortOrder?: number;
  };
}

// ---------------------------------------------------------------------------
// Job Posting (new)
// ---------------------------------------------------------------------------

export interface JobPosting {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    team?: string;
    location?: string;
    type?: string;
    description: Document;
    applicationUrl?: string;
    publishedDate: string;
    active?: boolean;
  };
}
