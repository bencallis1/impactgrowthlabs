import { createClient } from "contentful";
import type {
  BlogPost,
  CaseStudy,
  PortfolioCompany,
  TeamMember,
  PortalDocument,
  PortalNewsItem,
  Testimonial,
  PressItem,
  FAQ,
  JobPosting,
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
      featured: true,
      readTimeMinutes: 6,
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
      readTimeMinutes: 8,
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
      readTimeMinutes: 5,
    },
  },
];

// Note: MOCK_CASE_STUDIES is defined after MOCK_PORTFOLIO so companyRef can
// reference the already-constructed portfolio objects directly.
const MOCK_PORTFOLIO_GREENTECH: PortfolioCompany = {
  sys: { id: "1" },
  fields: {
    name: "GreenTech Solutions",
    slug: "greentech-solutions",
    sector: "Climate",
    stage: "Series A",
    description:
      "GreenTech Solutions has built an AI-powered platform that helps manufacturers and logistics companies map, measure, and reduce the carbon footprint across their entire supply chain.",
    website: "https://greentechsolutions.example",
    metrics: { "Carbon Reduced": "40%", "Facilities Served": "120", "Tonnes CO₂ Avoided": "2.4M" },
    featured: true,
    location: "San Francisco, CA",
    investmentDate: "2022-06-01",
    foundingYear: 2020,
    tags: ["AI", "Carbon", "Supply Chain", "SaaS"],
    sdgs: ["13 Climate Action", "9 Industry & Innovation"],
    impactThesis:
      "Decarbonizing industrial supply chains is one of the highest-leverage interventions available. GreenTech Solutions targets scope 3 emissions — the hardest to measure and the largest share of most companies' footprint.",
  },
};

const MOCK_PORTFOLIO_HEALTHBRIDGE: PortfolioCompany = {
  sys: { id: "2" },
  fields: {
    name: "HealthBridge",
    slug: "healthbridge",
    sector: "Health",
    stage: "Seed",
    description:
      "HealthBridge delivers telemedicine and digital health services to underserved communities across six emerging markets via low-bandwidth mobile interfaces.",
    website: "https://healthbridge.example",
    metrics: { "Patients Served": "100K+", "Countries": "6", "Avg. Cost per Visit": "$2.80" },
    featured: true,
    location: "Nairobi, Kenya",
    investmentDate: "2023-01-15",
    foundingYear: 2021,
    tags: ["Telemedicine", "Global South", "Mobile", "Access"],
    sdgs: ["3 Good Health", "10 Reduced Inequalities"],
  },
};

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
      companyRef: MOCK_PORTFOLIO_GREENTECH,
      impactSummary: "40% carbon reduction across 120 facilities, 85,000 tCO₂e avoided annually.",
      publishedDate: "2024-09-01",
      featured: true,
      tags: ["Climate", "Supply Chain", "AI", "Carbon"],
      sdgs: ["13 Climate Action", "9 Industry & Innovation", "12 Responsible Consumption"],
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
      companyRef: MOCK_PORTFOLIO_HEALTHBRIDGE,
      impactSummary: "100,000 patients served across 6 countries, 90% cost reduction vs. traditional care.",
      publishedDate: "2024-11-01",
      tags: ["Health", "Global South", "Telemedicine", "Access"],
      sdgs: ["3 Good Health", "10 Reduced Inequalities"],
    },
  },
];

const MOCK_PORTFOLIO: PortfolioCompany[] = [
  MOCK_PORTFOLIO_GREENTECH,
  MOCK_PORTFOLIO_HEALTHBRIDGE,
  {
    sys: { id: "3" },
    fields: {
      name: "EduAccess",
      slug: "eduaccess",
      sector: "Education",
      stage: "Series A",
      description:
        "EduAccess is an adaptive learning platform purpose-built for first-generation college students in the United States, combining AI-driven personalized learning with peer mentorship.",
      website: "https://eduaccess.example",
      metrics: { "Students Supported": "45K", "Graduation Rate Lift": "+28%", "Partner Institutions": "38" },
      location: "New York, NY",
      investmentDate: "2022-09-01",
      foundingYear: 2019,
      tags: ["AI", "EdTech", "Access", "First-Gen"],
      sdgs: ["4 Quality Education", "10 Reduced Inequalities"],
    },
  },
  {
    sys: { id: "4" },
    fields: {
      name: "CircularMaterials",
      slug: "circular-materials",
      sector: "Circular Economy",
      stage: "Seed",
      description:
        "CircularMaterials diverts post-consumer plastic and textile waste from landfills and transforms it into industrial-grade materials for construction, packaging, and automotive applications.",
      website: "https://circularmaterials.example",
      metrics: { "Waste Processed": "12K tonnes", "Manufacturing Partners": "34", "Material SKUs": "18" },
      location: "Amsterdam, Netherlands",
      investmentDate: "2023-06-01",
      foundingYear: 2022,
      tags: ["Waste", "Materials", "Carbon", "Hardware"],
      sdgs: ["12 Responsible Consumption", "13 Climate Action", "9 Industry & Innovation"],
    },
  },
];

const MOCK_TEAM: TeamMember[] = [
  {
    sys: { id: "1" },
    fields: {
      name: "Sarah Chen",
      slug: "sarah-chen",
      role: "Co-Founder & CEO",
      memberType: "Founder",
      bio: "Former partner at a top-tier impact fund with 15 years building and scaling mission-driven companies across Southeast Asia and North America.",
      linkedIn: "https://www.linkedin.com/in/sarah-chen",
      sortOrder: 1,
      featured: true,
    },
  },
  {
    sys: { id: "2" },
    fields: {
      name: "Marcus Williams",
      slug: "marcus-williams",
      role: "Co-Founder & COO",
      memberType: "Founder",
      bio: "Ex-McKinsey and World Bank. Led operational transformations for social enterprises in 20+ countries, from early-stage to growth.",
      linkedIn: "https://www.linkedin.com/in/marcus-williams",
      sortOrder: 2,
      featured: true,
    },
  },
  {
    sys: { id: "3" },
    fields: {
      name: "Priya Patel",
      slug: "priya-patel",
      role: "Head of Impact",
      memberType: "Team",
      bio: "PhD in Environmental Science. Designed impact measurement frameworks now used by 200+ funds globally. Former UNDP climate advisor.",
      linkedIn: "https://www.linkedin.com/in/priya-patel",
      sortOrder: 3,
      featured: true,
    },
  },
  {
    sys: { id: "4" },
    fields: {
      name: "Dr. James Okafor",
      slug: "james-okafor",
      role: "Senior Advisor — Health Systems",
      memberType: "Advisor",
      bio: "Former WHO Director of Primary Health Care with 25 years of field experience across 30 countries. James advises our health portfolio on go-to-market strategy and regulatory navigation.",
      linkedIn: "https://www.linkedin.com/in/james-okafor",
      sortOrder: 4,
      featured: false,
    },
  },
  {
    sys: { id: "5" },
    fields: {
      name: "Elena Vasquez",
      slug: "elena-vasquez",
      role: "Industry Expert — Circular Economy",
      memberType: "Industry Expert",
      bio: "Founder of CircularNext and former VP at the Ellen MacArthur Foundation. Elena brings deep expertise in circular business model design and industrial symbiosis.",
      linkedIn: "https://www.linkedin.com/in/elena-vasquez",
      sortOrder: 5,
      featured: false,
    },
  },
  {
    sys: { id: "6" },
    fields: {
      name: "Robert Kim",
      slug: "robert-kim",
      role: "Board Member",
      memberType: "Board",
      bio: "Managing Partner at Sequoia Capital's Asia fund and co-founder of the APAC Sustainable Investors Network. Robert brings 20 years of venture experience.",
      linkedIn: "https://www.linkedin.com/in/robert-kim",
      sortOrder: 6,
      featured: false,
    },
  },
];

const MOCK_PORTAL_DOCS: PortalDocument[] = [
  {
    sys: { id: "1" },
    fields: {
      title: "Q4 2024 Portfolio Update",
      description: "Quarterly update covering portfolio performance, key milestones, and upcoming opportunities.",
      file: {
        fields: {
          title: "Q4 2024 Update",
          file: { url: "#", details: { size: 2048000 }, fileName: "q4-2024-update.pdf", contentType: "application/pdf" },
        },
      },
      publishedDate: "2025-01-15",
      category: "Quarterly Report",
    },
  },
  {
    sys: { id: "2" },
    fields: {
      title: "2024 Annual Impact Report",
      description: "Comprehensive review of impact outcomes across all portfolio companies for fiscal year 2024.",
      file: {
        fields: {
          title: "Annual Impact Report",
          file: { url: "#", details: { size: 5120000 }, fileName: "2024-impact-report.pdf", contentType: "application/pdf" },
        },
      },
      publishedDate: "2025-02-01",
      category: "Impact Report",
    },
  },
  {
    sys: { id: "3" },
    fields: {
      title: "Fund II Term Sheet",
      description: "Term sheet and key terms for Impact Growth Labs Fund II.",
      file: {
        fields: {
          title: "Fund II Terms",
          file: { url: "#", details: { size: 512000 }, fileName: "fund-ii-terms.pdf", contentType: "application/pdf" },
        },
      },
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
      summary:
        "GreenTech Solutions announced the close of its $12M Series A round led by Clean Energy Ventures, with participation from Impact Growth Labs.",
      company: "GreenTech Solutions",
      publishedDate: "2025-02-10",
      link: "#",
    },
  },
  {
    sys: { id: "2" },
    fields: {
      title: "HealthBridge Expands to West Africa",
      summary:
        "HealthBridge launched operations in Ghana and Nigeria, bringing its telemedicine platform to two new high-need markets.",
      company: "HealthBridge",
      publishedDate: "2025-01-28",
      link: "#",
    },
  },
  {
    sys: { id: "3" },
    fields: {
      title: "EduAccess Partners with Three State University Systems",
      summary:
        "EduAccess signed MOUs with university systems in Texas, Ohio, and Georgia to expand access for first-generation students.",
      company: "EduAccess",
      publishedDate: "2025-01-10",
      link: "#",
    },
  },
];

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    sys: { id: "1" },
    fields: {
      quote:
        "Impact Growth Labs didn't just write a check — they rolled up their sleeves. Their network opened doors we couldn't have reached on our own, and their guidance on impact measurement gave us the credibility to close a Series A in a tough market.",
      authorName: "Aisha Mwangi",
      authorRole: "CEO & Co-Founder",
      company: "HealthBridge",
      featured: true,
      publishedDate: "2024-11-01",
    },
  },
  {
    sys: { id: "2" },
    fields: {
      quote:
        "What sets Impact Growth Labs apart is the depth of their conviction. They understand that building for underserved markets requires a longer arc — and they're patient partners who measure success the same way we do.",
      authorName: "Jordan Lee",
      authorRole: "CEO",
      company: "EduAccess",
      featured: true,
      publishedDate: "2024-09-01",
    },
  },
];

const MOCK_PRESS_ITEMS: PressItem[] = [
  {
    sys: { id: "1" },
    fields: {
      title: "The Quiet Rise of Impact Venture: How a New Breed of Studio Is Changing the Game",
      publication: "Forbes",
      excerpt:
        "Impact Growth Labs represents a new model — one where venture returns and measurable social outcomes aren't competing priorities.",
      url: "#",
      publishedDate: "2025-01-20",
      featured: true,
    },
  },
  {
    sys: { id: "2" },
    fields: {
      title: "25 Impact Investors to Watch in 2025",
      publication: "Fast Company",
      excerpt: "Impact Growth Labs earns a spot for its disciplined approach to backing founders at the climate-health nexus.",
      url: "#",
      publishedDate: "2025-02-05",
      featured: true,
    },
  },
];

const MOCK_FAQS: FAQ[] = [
  {
    sys: { id: "1" },
    fields: {
      question: "What stage do you invest in?",
      answer: { nodeType: "document", data: {}, content: [] } as never,
      category: "Investing",
      sortOrder: 1,
    },
  },
  {
    sys: { id: "2" },
    fields: {
      question: "What sectors do you focus on?",
      answer: { nodeType: "document", data: {}, content: [] } as never,
      category: "Investing",
      sortOrder: 2,
    },
  },
  {
    sys: { id: "3" },
    fields: {
      question: "How do you measure impact?",
      answer: { nodeType: "document", data: {}, content: [] } as never,
      category: "Impact",
      sortOrder: 1,
    },
  },
];

const MOCK_JOB_POSTINGS: JobPosting[] = [
  {
    sys: { id: "1" },
    fields: {
      title: "Principal, Climate & Circular Economy",
      slug: "principal-climate-circular-economy",
      team: "Investments",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description: { nodeType: "document", data: {}, content: [] } as never,
      applicationUrl: "#",
      publishedDate: "2025-02-01",
      active: true,
    },
  },
];

// ---------------------------------------------------------------------------
// Query helpers
// When Contentful credentials are present, always return live data — no mock
// fallback. Mock data is only used when credentials are absent (local dev).
// Contentful SDK v11: we cast via `any` since return values are typed by our
// own interfaces.
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
    return res.items as unknown as BlogPost[];
  } catch {
    return [];
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
    return res.items.length ? (res.items[0] as unknown as BlogPost) : null;
  } catch {
    return null;
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_BLOG_POSTS.filter((p) => p.fields.featured);
  try {
    const res = await client.getEntries({
      content_type: "blogPost",
      "fields.featured": true,
      order: ["-fields.publishedDate"],
    });
    return res.items as unknown as BlogPost[];
  } catch {
    return [];
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
    return res.items as unknown as CaseStudy[];
  } catch {
    return [];
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
    return res.items.length ? (res.items[0] as unknown as CaseStudy) : null;
  } catch {
    return null;
  }
}

/**
 * Fetch all case studies linked to a specific portfolio company.
 * Uses a reverse lookup via the `companyRef` field — the canonical relationship.
 */
export async function getCaseStudiesForCompany(companyId: string): Promise<CaseStudy[]> {
  const client = getClient() as AnyClient | null;
  if (!client) {
    return MOCK_CASE_STUDIES.filter((cs) => cs.fields.companyRef?.sys.id === companyId);
  }
  try {
    const res = await client.getEntries({
      content_type: "caseStudy",
      "fields.companyRef.sys.id": companyId,
      order: ["-fields.publishedDate"],
      include: 2,
    });
    return res.items as unknown as CaseStudy[];
  } catch {
    return [];
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
    return res.items as unknown as PortfolioCompany[];
  } catch {
    return [];
  }
}

export async function getPortfolioCompany(slug: string): Promise<PortfolioCompany | null> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_PORTFOLIO.find((c) => c.fields.slug === slug) ?? null;
  try {
    const res = await client.getEntries({
      content_type: "portfolioCompany",
      "fields.slug": slug,
      limit: 1,
    });
    return res.items.length ? (res.items[0] as unknown as PortfolioCompany) : null;
  } catch {
    return null;
  }
}

export async function getFeaturedPortfolioCompanies(): Promise<PortfolioCompany[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_PORTFOLIO.filter((c) => c.fields.featured);
  try {
    const res = await client.getEntries({
      content_type: "portfolioCompany",
      "fields.featured": true,
      order: ["fields.name"],
    });
    return res.items as unknown as PortfolioCompany[];
  } catch {
    return [];
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_TEAM;
  try {
    const res = await client.getEntries({
      content_type: "teamMember",
      order: ["fields.sortOrder", "fields.name"],
    });
    return res.items as unknown as TeamMember[];
  } catch {
    return [];
  }
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_TEAM.find((m) => m.fields.slug === slug) ?? null;
  try {
    const res = await client.getEntries({
      content_type: "teamMember",
      "fields.slug": slug,
      limit: 1,
    });
    return res.items.length ? (res.items[0] as unknown as TeamMember) : null;
  } catch {
    return null;
  }
}

/** Fetch all blog posts authored by a specific team member (reverse lookup on authorRef). */
export async function getBlogPostsByAuthor(memberId: string): Promise<BlogPost[]> {
  const client = getClient() as AnyClient | null;
  if (!client) {
    return MOCK_BLOG_POSTS.filter((p) => p.fields.authorRef?.sys.id === memberId);
  }
  try {
    const res = await client.getEntries({
      content_type: "blogPost",
      "fields.authorRef.sys.id": memberId,
      order: ["-fields.publishedDate"],
      include: 1,
    });
    return res.items as unknown as BlogPost[];
  } catch {
    return [];
  }
}

/** Fetch all case studies authored by a specific team member (reverse lookup on authorRef). */
export async function getCaseStudiesByAuthor(memberId: string): Promise<CaseStudy[]> {
  const client = getClient() as AnyClient | null;
  if (!client) {
    return MOCK_CASE_STUDIES.filter((cs) => cs.fields.authorRef?.sys.id === memberId);
  }
  try {
    const res = await client.getEntries({
      content_type: "caseStudy",
      "fields.authorRef.sys.id": memberId,
      order: ["-fields.publishedDate"],
      include: 2,
    });
    return res.items as unknown as CaseStudy[];
  } catch {
    return [];
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
    return res.items as unknown as PortalDocument[];
  } catch {
    return [];
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
    return res.items as unknown as PortalNewsItem[];
  } catch {
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_TESTIMONIALS;
  try {
    const res = await client.getEntries({
      content_type: "testimonial",
      order: ["-fields.publishedDate"],
    });
    return res.items as unknown as Testimonial[];
  } catch {
    return [];
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_TESTIMONIALS.filter((t) => t.fields.featured);
  try {
    const res = await client.getEntries({
      content_type: "testimonial",
      "fields.featured": true,
      order: ["-fields.publishedDate"],
    });
    return res.items as unknown as Testimonial[];
  } catch {
    return [];
  }
}

export async function getPressItems(): Promise<PressItem[]> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_PRESS_ITEMS;
  try {
    const res = await client.getEntries({
      content_type: "pressItem",
      order: ["-fields.publishedDate"],
    });
    return res.items as unknown as PressItem[];
  } catch {
    return [];
  }
}

export async function getFaqs(category?: string): Promise<FAQ[]> {
  const client = getClient() as AnyClient | null;
  if (!client) {
    return category ? MOCK_FAQS.filter((f) => f.fields.category === category) : MOCK_FAQS;
  }
  try {
    const query: Record<string, unknown> = {
      content_type: "faq",
      order: ["fields.category", "fields.sortOrder"],
    };
    if (category) query["fields.category"] = category;
    const res = await client.getEntries(query);
    return res.items as unknown as FAQ[];
  } catch {
    return [];
  }
}

export async function getJobPostings(activeOnly = true): Promise<JobPosting[]> {
  const client = getClient() as AnyClient | null;
  if (!client) {
    return activeOnly ? MOCK_JOB_POSTINGS.filter((j) => j.fields.active) : MOCK_JOB_POSTINGS;
  }
  try {
    const query: Record<string, unknown> = {
      content_type: "jobPosting",
      order: ["-fields.publishedDate"],
    };
    if (activeOnly) query["fields.active"] = true;
    const res = await client.getEntries(query);
    return res.items as unknown as JobPosting[];
  } catch {
    return [];
  }
}

export async function getJobPosting(slug: string): Promise<JobPosting | null> {
  const client = getClient() as AnyClient | null;
  if (!client) return MOCK_JOB_POSTINGS.find((j) => j.fields.slug === slug) ?? null;
  try {
    const res = await client.getEntries({
      content_type: "jobPosting",
      "fields.slug": slug,
      limit: 1,
    });
    return res.items.length ? (res.items[0] as unknown as JobPosting) : null;
  } catch {
    return null;
  }
}
