import { createClient } from "contentful";
import type {
  BlogPost,
  CaseStudy,
  PortfolioCompany,
  TeamMember,
  PortalDocument,
  PortalNewsItem,
} from "@/types/contentful";

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

function getClient() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!space || !accessToken || space === "your_space_id") return null;

  return createClient({ space, accessToken });
}

// ---------------------------------------------------------------------------
// Mock data — used when Contentful env vars are not configured
// ---------------------------------------------------------------------------

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    sys: { id: "1", createdAt: "2025-01-15T00:00:00Z", updatedAt: "2025-01-15T00:00:00Z" },
    fields: {
      title: "The Future of Impact Investing in 2025",
      slug: "future-of-impact-investing-2025",
      excerpt:
        "As impact capital continues to mature, we're seeing unprecedented alignment between financial returns and measurable social and environmental outcomes.",
      body: { nodeType: "document", data: {}, content: [] } as never,
      author: "Sarah Chen",
      publishedDate: "2025-01-15",
      tags: ["Impact Investing", "Trends", "ESG"],
    },
  },
  {
    sys: { id: "2", createdAt: "2025-02-01T00:00:00Z", updatedAt: "2025-02-01T00:00:00Z" },
    fields: {
      title: "How Our Portfolio Companies Are Tackling Climate Change",
      slug: "portfolio-companies-climate-change",
      excerpt:
        "From circular materials to clean energy, our portfolio companies collectively avoided over 200,000 tonnes of CO₂ equivalent emissions last year.",
      body: { nodeType: "document", data: {}, content: [] } as never,
      author: "Marcus Williams",
      publishedDate: "2025-02-01",
      tags: ["Climate", "Portfolio", "Impact"],
    },
  },
  {
    sys: { id: "3", createdAt: "2025-02-20T00:00:00Z", updatedAt: "2025-02-20T00:00:00Z" },
    fields: {
      title: "Building Diverse Founding Teams: What the Data Shows",
      slug: "diverse-founding-teams-data",
      excerpt:
        "Our internal data across 24 portfolio companies reveals a clear pattern: diverse leadership teams outperform on both impact and financial metrics.",
      body: { nodeType: "document", data: {}, content: [] } as never,
      author: "Priya Patel",
      publishedDate: "2025-02-20",
      tags: ["Diversity", "Founders", "Research"],
    },
  },
];

const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    sys: { id: "1", createdAt: "2024-09-01T00:00:00Z", updatedAt: "2024-09-01T00:00:00Z" },
    fields: {
      title: "GreenTech Solutions: 40% Carbon Reduction in Industrial Supply Chains",
      slug: "greentech-solutions-carbon-reduction",
      excerpt:
        "How we helped GreenTech Solutions scale from a prototype to a platform used by 120 manufacturing facilities — reducing scope 3 emissions by 40%.",
      body: { nodeType: "document", data: {}, content: [] } as never,
      company: "GreenTech Solutions",
      impactSummary: "40% carbon reduction across 120 facilities, 85,000 tCO₂e avoided annually.",
      publishedDate: "2024-09-01",
    },
  },
  {
    sys: { id: "2", createdAt: "2024-11-01T00:00:00Z", updatedAt: "2024-11-01T00:00:00Z" },
    fields: {
      title: "HealthBridge: Reaching 100,000 Underserved Patients",
      slug: "healthbridge-reaching-underserved-patients",
      excerpt:
        "HealthBridge used telemedicine to connect rural communities in sub-Saharan Africa with specialist care — reaching 100K patients in under 18 months.",
      body: { nodeType: "document", data: {}, content: [] } as never,
      company: "HealthBridge",
      impactSummary: "100,000 patients served across 6 countries, 90% cost reduction vs. traditional care.",
      publishedDate: "2024-11-01",
    },
  },
];

const MOCK_PORTFOLIO: PortfolioCompany[] = [
  {
    sys: { id: "1" },
    fields: {
      name: "GreenTech Solutions",
      sector: "Climate",
      stage: "Series A",
      description: "AI-powered supply chain decarbonization platform.",
      website: "https://greentechsolutions.example",
      metrics: { carbonReduced: "40%", facilities: 120 },
    },
  },
  {
    sys: { id: "2" },
    fields: {
      name: "HealthBridge",
      sector: "Health",
      stage: "Seed",
      description: "Telemedicine for underserved communities in emerging markets.",
      website: "https://healthbridge.example",
      metrics: { patientsServed: "100K+", countries: 6 },
    },
  },
  {
    sys: { id: "3" },
    fields: {
      name: "EduAccess",
      sector: "Education",
      stage: "Series A",
      description: "Adaptive learning platform for first-generation college students.",
      website: "https://eduaccess.example",
      metrics: { studentsSupported: "45K", gradRate: "+28%" },
    },
  },
  {
    sys: { id: "4" },
    fields: {
      name: "CircularMaterials",
      sector: "Circular Economy",
      stage: "Seed",
      description: "Industrial-grade materials from post-consumer waste streams.",
      website: "https://circularmaterials.example",
      metrics: { wasteProcessed: "12K tonnes", partners: 34 },
    },
  },
];

const MOCK_TEAM: TeamMember[] = [
  {
    sys: { id: "1" },
    fields: {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former partner at a top-tier impact fund with 15 years building and scaling mission-driven companies across Southeast Asia and North America.",
      linkedIn: "https://linkedin.com",
    },
  },
  {
    sys: { id: "2" },
    fields: {
      name: "Marcus Williams",
      role: "Co-Founder & COO",
      bio: "Ex-McKinsey and World Bank. Led operational transformations for social enterprises in 20+ countries, from early-stage to growth.",
      linkedIn: "https://linkedin.com",
    },
  },
  {
    sys: { id: "3" },
    fields: {
      name: "Priya Patel",
      role: "Head of Impact",
      bio: "PhD in Environmental Science. Designed impact measurement frameworks now used by 200+ funds globally. Former UNDP climate advisor.",
      linkedIn: "https://linkedin.com",
    },
  },
];

const MOCK_PORTAL_DOCS: PortalDocument[] = [
  {
    sys: { id: "1" },
    fields: {
      title: "Q4 2024 Portfolio Update",
      description: "Quarterly update covering portfolio performance, key milestones, and upcoming opportunities.",
      file: { fields: { title: "Q4 2024 Update", file: { url: "#", details: { size: 2048000 }, fileName: "q4-2024-update.pdf", contentType: "application/pdf" } } },
      publishedDate: "2025-01-15",
      category: "Quarterly Report",
    },
  },
  {
    sys: { id: "2" },
    fields: {
      title: "2024 Annual Impact Report",
      description: "Comprehensive review of impact outcomes across all portfolio companies for fiscal year 2024.",
      file: { fields: { title: "Annual Impact Report", file: { url: "#", details: { size: 5120000 }, fileName: "2024-impact-report.pdf", contentType: "application/pdf" } } },
      publishedDate: "2025-02-01",
      category: "Impact Report",
    },
  },
  {
    sys: { id: "3" },
    fields: {
      title: "Fund II Term Sheet",
      description: "Term sheet and key terms for Impact Growth Labs Fund II.",
      file: { fields: { title: "Fund II Terms", file: { url: "#", details: { size: 512000 }, fileName: "fund-ii-terms.pdf", contentType: "application/pdf" } } },
      publishedDate: "2024-11-15",
      category: "Legal",
    },
  },
];

const MOCK_PORTAL_NEWS: PortalNewsItem[] = [
  {
    sys: { id: "1" },
    fields: {
      title: "GreenTech Solutions Closes $12M Series A",
      summary: "GreenTech Solutions announced the close of its $12M Series A round led by Clean Energy Ventures, with participation from Impact Growth Labs.",
      company: "GreenTech Solutions",
      publishedDate: "2025-02-10",
      link: "#",
    },
  },
  {
    sys: { id: "2" },
    fields: {
      title: "HealthBridge Expands to West Africa",
      summary: "HealthBridge launched operations in Ghana and Nigeria, bringing its telemedicine platform to two new high-need markets.",
      company: "HealthBridge",
      publishedDate: "2025-01-28",
      link: "#",
    },
  },
  {
    sys: { id: "3" },
    fields: {
      title: "EduAccess Partners with Three State University Systems",
      summary: "EduAccess signed MOUs with university systems in Texas, Ohio, and Georgia to expand access for first-generation students.",
      company: "EduAccess",
      publishedDate: "2025-01-10",
      link: "#",
    },
  },
];

// ---------------------------------------------------------------------------
// Query helpers
// Contentful SDK v11 uses EntrySkeletonType for generics; we cast via `any`
// since all return values are explicitly typed via our own interfaces.
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = { getEntries(q: Record<string, unknown>): Promise<{ items: any[] }> };

export async function getBlogPosts(): Promise<BlogPost[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_BLOG_POSTS;
  try {
    const res = await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishedDate"],
    });
    return res.items.length ? (res.items as unknown as BlogPost[]) : MOCK_BLOG_POSTS;
  } catch {
    return MOCK_BLOG_POSTS;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_BLOG_POSTS.find((p) => p.fields.slug === slug) ?? null;
  try {
    const res = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });
    return res.items.length
      ? (res.items[0] as unknown as BlogPost)
      : (MOCK_BLOG_POSTS.find((p) => p.fields.slug === slug) ?? null);
  } catch {
    return MOCK_BLOG_POSTS.find((p) => p.fields.slug === slug) ?? null;
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_CASE_STUDIES;
  try {
    const res = await client.getEntries({
      content_type: "caseStudy",
      order: ["-fields.publishedDate"],
    });
    return res.items.length ? (res.items as unknown as CaseStudy[]) : MOCK_CASE_STUDIES;
  } catch {
    return MOCK_CASE_STUDIES;
  }
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_CASE_STUDIES.find((c) => c.fields.slug === slug) ?? null;
  try {
    const res = await client.getEntries({
      content_type: "caseStudy",
      "fields.slug": slug,
      limit: 1,
    });
    return res.items.length
      ? (res.items[0] as unknown as CaseStudy)
      : (MOCK_CASE_STUDIES.find((c) => c.fields.slug === slug) ?? null);
  } catch {
    return MOCK_CASE_STUDIES.find((c) => c.fields.slug === slug) ?? null;
  }
}

export async function getPortfolioCompanies(): Promise<PortfolioCompany[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_PORTFOLIO;
  try {
    const res = await client.getEntries({
      content_type: "portfolioCompany",
      order: ["fields.name"],
    });
    return res.items.length ? (res.items as unknown as PortfolioCompany[]) : MOCK_PORTFOLIO;
  } catch {
    return MOCK_PORTFOLIO;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_TEAM;
  try {
    const res = await client.getEntries({
      content_type: "teamMember",
      order: ["fields.name"],
    });
    return res.items.length ? (res.items as unknown as TeamMember[]) : MOCK_TEAM;
  } catch {
    return MOCK_TEAM;
  }
}

export async function getPortalDocuments(): Promise<PortalDocument[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_PORTAL_DOCS;
  try {
    const res = await client.getEntries({
      content_type: "portalDocument",
      order: ["-fields.publishedDate"],
    });
    return res.items.length ? (res.items as unknown as PortalDocument[]) : MOCK_PORTAL_DOCS;
  } catch {
    return MOCK_PORTAL_DOCS;
  }
}

export async function getPortalNews(): Promise<PortalNewsItem[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_PORTAL_NEWS;
  try {
    const res = await client.getEntries({
      content_type: "portalNewsItem",
      order: ["-fields.publishedDate"],
    });
    return res.items.length ? (res.items as unknown as PortalNewsItem[]) : MOCK_PORTAL_NEWS;
  } catch {
    return MOCK_PORTAL_NEWS;
  }
}
