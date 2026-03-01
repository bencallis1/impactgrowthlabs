import type { Document } from "@contentful/rich-text-types";

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

export interface BlogPost {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    body: Document;
    coverImage?: ContentfulAsset;
    author: string;
    publishedDate: string;
    tags?: string[];
  };
}

export interface CaseStudy {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    body: Document;
    coverImage?: ContentfulAsset;
    company: string;
    impactSummary: string;
    publishedDate: string;
  };
}

export interface PortfolioCompany {
  sys: { id: string };
  fields: {
    name: string;
    logo?: ContentfulAsset;
    website?: string;
    sector: string;
    stage: string;
    description: string;
    metrics?: Record<string, string | number>;
  };
}

export interface TeamMember {
  sys: { id: string };
  fields: {
    name: string;
    role: string;
    bio: string;
    photo?: ContentfulAsset;
    linkedIn?: string;
  };
}

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

export interface PortalNewsItem {
  sys: { id: string };
  fields: {
    title: string;
    summary: string;
    company: string;
    publishedDate: string;
    link?: string;
  };
}
