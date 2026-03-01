# Contentful Content Models

## Content Type IDs (used in `getEntries({ content_type: "..." })`)

| Content Type | ID | Notes |
|---|---|---|
| Blog Post | `blogPost` | |
| Case Study | `caseStudy` | |
| Portfolio Company | `portfolioCompany` | |
| Team Member | `teamMember` | |
| Portal Document | `portalDocument` | |
| Portal News Item | `portalNewsItem` | |
| Testimonial | `testimonial` | new |
| Press Item | `pressItem` | new |
| FAQ | `faq` | new |
| Job Posting | `jobPosting` | new |

---

## Field Reference

### Blog Post (`blogPost`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | Max 100 chars |
| `slug` | Short text | ✓ | URL-safe, unique |
| `excerpt` | Long text | ✓ | Max 280 chars, 1–2 sentences |
| `body` | Rich Text | ✓ | Rendered via `RichTextRenderer` |
| `coverImage` | Media | | Image asset |
| `author` | Short text | ✓ | Plain-text fallback; prefer `authorRef` |
| `publishedDate` | Date | ✓ | `YYYY-MM-DD` |
| `tags` | Short text (list) | | Array of tag strings |
| `authorRef` | Entry → `teamMember` | | Linked TeamMember — use instead of `author` when possible |
| `relatedPosts` | Entry list → `blogPost` | | Up to 3 related posts shown at bottom of article |
| `featured` | Boolean | | Shown in featured/hero blog sections |
| `readTimeMinutes` | Integer | | Displayed on cards and article headers |

### Case Study (`caseStudy`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | Max 100 chars |
| `slug` | Short text | ✓ | URL-safe, unique |
| `excerpt` | Long text | ✓ | Max 280 chars |
| `body` | Rich Text | ✓ | |
| `coverImage` | Media | | |
| `company` | Short text | ✓ | Plain-text fallback; prefer `companyRef` |
| `impactSummary` | Short text | ✓ | Max 120 chars, one data-backed line |
| `publishedDate` | Date | ✓ | |
| `companyRef` | Entry → `portfolioCompany` | | Linked company — unlocks richer card data |
| `featured` | Boolean | | |
| `sdgs` | Short text (list) | | UN SDG labels, e.g. `"13 Climate Action"` |
| `videoUrl` | Short text | | Optional video embed URL |

### Portfolio Company (`portfolioCompany`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | Short text | ✓ | |
| `slug` | Short text | ✓ | URL-safe, unique |
| `logo` | Media | | Image asset |
| `website` | Short text | | Full URL |
| `sector` | Short text | ✓ | Climate / Health / Education / Circular Economy / Financial Inclusion / Food & Agriculture / Other |
| `stage` | Short text | ✓ | Pre-Seed / Seed / Series A / Series B / Growth |
| `description` | Long text | ✓ | Max 600 chars, 2–4 sentences |
| `metrics` | JSON | | `{ "Key": "Value" }` pairs for cards |
| `featured` | Boolean | | Shown on homepage portfolio grid |
| `location` | Short text | | HQ city/country, e.g. `"San Francisco, CA"` |
| `investmentDate` | Date | | When IGL invested |
| `foundingYear` | Integer | | Year the company was founded |
| `sdgs` | Short text (list) | | UN SDG labels |
| `impactThesis` | Long text | | Why we invested — shown on company detail page |

### Team Member (`teamMember`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | Short text | ✓ | |
| `role` | Short text | ✓ | Job title |
| `bio` | Long text | ✓ | Max 400 chars, 2–3 sentences |
| `photo` | Media | | Headshot image |
| `linkedIn` | Short text | | Full LinkedIn URL |
| `twitter` | Short text | | Twitter/X handle, e.g. `@handle` |
| `sortOrder` | Integer | | Controls display order (ascending) |
| `featured` | Boolean | | Shown on homepage team section |

### Portal Document (`portalDocument`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | |
| `description` | Long text | | Short summary for portal list |
| `file` | Media | ✓ | PDF or other asset |
| `publishedDate` | Date | ✓ | |
| `category` | Short text | ✓ | Quarterly Report / Annual Report / Impact Report / Legal / Financial / Other |

### Portal News Item (`portalNewsItem`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | Headline, max 120 chars |
| `summary` | Long text | ✓ | Max 280 chars, 1–2 sentences |
| `company` | Short text | ✓ | Plain-text fallback; prefer `companyRef` |
| `publishedDate` | Date | ✓ | |
| `link` | Short text | | External article URL |
| `companyRef` | Entry → `portfolioCompany` | | Linked company |

### Testimonial (`testimonial`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `quote` | Long text | ✓ | Max 500 chars, 1–3 sentences |
| `authorName` | Short text | ✓ | |
| `authorRole` | Short text | ✓ | Job title / role |
| `company` | Short text | | Company name |
| `avatar` | Media | | Headshot image |
| `featured` | Boolean | | Shown on homepage or key landing pages |
| `publishedDate` | Date | | Used for ordering |

### Press Item (`pressItem`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | Headline, max 160 chars |
| `publication` | Short text | ✓ | e.g. `"Forbes"` |
| `excerpt` | Long text | | Short pull quote or summary, max 280 chars |
| `url` | Short text | ✓ | Full article URL |
| `publicationLogo` | Media | | Publication logo image |
| `publishedDate` | Date | ✓ | |
| `featured` | Boolean | | Shown in press section |

### FAQ (`faq`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `question` | Short text | ✓ | Max 200 chars, phrased from reader's perspective |
| `answer` | Rich Text | ✓ | Rendered via `RichTextRenderer` |
| `category` | Short text | | Investing / Portfolio / Impact / Operations / General |
| `sortOrder` | Integer | | Controls display order within a category |

### Job Posting (`jobPosting`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | Job title |
| `slug` | Short text | ✓ | URL-safe, unique |
| `team` | Short text | | Department, e.g. `"Investments"` |
| `location` | Short text | | e.g. `"San Francisco, CA (Hybrid)"` |
| `type` | Short text | | Full-time / Part-time / Contract / Internship |
| `description` | Rich Text | ✓ | Full job description |
| `applicationUrl` | Short text | | External application link |
| `publishedDate` | Date | ✓ | |
| `active` | Boolean | | When false, job is hidden from listings |

---

## Mock Data (no Contentful credentials needed)

All mock data lives in `lib/contentful.ts` as `MOCK_*` arrays at the top of the file. Each query helper returns mock data when `getClient()` returns `null` (i.e., env vars not configured or set to placeholder values).

**To add mock content**: append objects to the relevant `MOCK_*` array. Match the shape of the TypeScript interface in `types/contentful.ts`.

**Mock body for blog/case study/faq/job** (Rich Text placeholder):
```typescript
body: { nodeType: "document", data: {}, content: [] } as never,
```

**Mock file asset shape** (for PortalDocument):
```typescript
file: {
  fields: {
    title: "Display Title",
    file: {
      url: "#",
      details: { size: 1024000 },   // bytes
      fileName: "filename.pdf",
      contentType: "application/pdf",
    },
  },
},
```

---

## Entry References

Three content types now support linked entry references in addition to plain-text fields:

| Reference field | On type | Links to | Plain-text fallback |
|---|---|---|---|
| `authorRef` | `blogPost` | `teamMember` | `author` |
| `companyRef` | `caseStudy` | `portfolioCompany` | `company` |
| `companyRef` | `portalNewsItem` | `portfolioCompany` | `company` |

**Usage pattern** — always fall back to the plain-text field when the reference isn't resolved:
```tsx
const authorName = post.fields.authorRef?.fields.name ?? post.fields.author
```

---

## Query Helpers (`lib/contentful.ts`)

| Function | Returns | Notes |
|---|---|---|
| `getBlogPosts()` | `BlogPost[]` | All posts, newest first |
| `getBlogPost(slug)` | `BlogPost \| null` | Single post by slug |
| `getFeaturedBlogPosts()` | `BlogPost[]` | `featured: true` only |
| `getCaseStudies()` | `CaseStudy[]` | All, newest first |
| `getCaseStudy(slug)` | `CaseStudy \| null` | Single by slug |
| `getPortfolioCompanies()` | `PortfolioCompany[]` | All, alpha order |
| `getPortfolioCompany(slug)` | `PortfolioCompany \| null` | Single by slug |
| `getFeaturedPortfolioCompanies()` | `PortfolioCompany[]` | `featured: true` only |
| `getTeamMembers()` | `TeamMember[]` | Ordered by `sortOrder`, then name |
| `getPortalDocuments()` | `PortalDocument[]` | All, newest first |
| `getPortalNews()` | `PortalNewsItem[]` | All, newest first |
| `getTestimonials()` | `Testimonial[]` | All, newest first |
| `getFeaturedTestimonials()` | `Testimonial[]` | `featured: true` only |
| `getPressItems()` | `PressItem[]` | All, newest first |
| `getFaqs(category?)` | `FAQ[]` | All, or filtered by category |
| `getJobPostings(activeOnly?)` | `JobPosting[]` | `activeOnly` defaults to `true` |
| `getJobPosting(slug)` | `JobPosting \| null` | Single by slug |

---

## Images in Components

Contentful image URLs come in the form `//images.ctfassets.net/...`. Always prepend `https:` before passing to `next/image`:

```tsx
<Image
  src={`https:${company.fields.logo?.fields.file.url}`}
  alt={company.fields.name}
  width={160}
  height={60}
/>
```

The `images.ctfassets.net` domain is already in `next.config.ts` `remotePatterns`.

---

## Rich Text Rendering

Use the `RichTextRenderer` component (`components/blog/RichTextRenderer.tsx`) for blog post, case study, FAQ, and job description bodies:

```tsx
import { RichTextRenderer } from "@/components/blog/RichTextRenderer"

<RichTextRenderer document={post.fields.body} />
```

---

## Query Ordering

| Use case | `order` parameter |
|---|---|
| Date-ordered (newest first) | `["-fields.publishedDate"]` |
| Alpha-ordered | `["fields.name"]` |
| Team members | `["fields.sortOrder", "fields.name"]` |
| FAQs | `["fields.category", "fields.sortOrder"]` |
