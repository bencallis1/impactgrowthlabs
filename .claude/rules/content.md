# Contentful Content Models

## Content Type IDs (used in `getEntries({ content_type: "..." })`)

| Content Type | ID |
|---|---|
| Blog Post | `blogPost` |
| Case Study | `caseStudy` |
| Portfolio Company | `portfolioCompany` |
| Team Member | `teamMember` |
| Portal Document | `portalDocument` |
| Portal News Item | `portalNewsItem` |

---

## Field Reference

### Blog Post (`blogPost`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | |
| `slug` | Short text | ✓ | URL-safe, unique |
| `excerpt` | Long text | ✓ | 1–2 sentences for cards |
| `body` | Rich Text | ✓ | Rendered via `RichTextRenderer` |
| `coverImage` | Media | | Image asset |
| `author` | Short text | ✓ | Display name |
| `publishedDate` | Date | ✓ | `YYYY-MM-DD` |
| `tags` | Short text (list) | | Array of tag strings |

### Case Study (`caseStudy`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | |
| `slug` | Short text | ✓ | URL-safe, unique |
| `excerpt` | Long text | ✓ | |
| `body` | Rich Text | ✓ | |
| `coverImage` | Media | | |
| `company` | Short text | ✓ | Company name |
| `impactSummary` | Short text | ✓ | One-line impact stat for cards |
| `publishedDate` | Date | ✓ | |

### Portfolio Company (`portfolioCompany`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | Short text | ✓ | |
| `logo` | Media | | Image asset |
| `website` | Short text | | Full URL |
| `sector` | Short text | ✓ | e.g. "Climate", "Health", "Education" |
| `stage` | Short text | ✓ | e.g. "Seed", "Series A" |
| `description` | Long text | ✓ | One-sentence description |
| `metrics` | JSON | | `{ key: value }` pairs for portal cards |

### Team Member (`teamMember`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | Short text | ✓ | |
| `role` | Short text | ✓ | Job title |
| `bio` | Long text | ✓ | 2–3 sentences |
| `photo` | Media | | Headshot image |
| `linkedIn` | Short text | | Full LinkedIn URL |

### Portal Document (`portalDocument`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | |
| `description` | Long text | | Short description for the list |
| `file` | Media | ✓ | PDF or other asset |
| `publishedDate` | Date | ✓ | |
| `category` | Short text | ✓ | e.g. "Quarterly Report", "Legal", "Impact Report" |

### Portal News Item (`portalNewsItem`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | Short text | ✓ | Headline |
| `summary` | Long text | ✓ | 1–2 sentences |
| `company` | Short text | ✓ | Related portfolio company name |
| `publishedDate` | Date | ✓ | |
| `link` | Short text | | External article URL |

---

## Mock Data (no Contentful credentials needed)

All mock data lives in `lib/contentful.ts` as `MOCK_*` arrays at the top of the file. Each query helper returns mock data when `getClient()` returns `null` (i.e., env vars not configured or set to placeholder values).

**To add mock content**: append objects to the relevant `MOCK_*` array. Match the shape of the TypeScript interface in `types/contentful.ts`.

**Mock body for blog/case study** (Rich Text placeholder):
```typescript
body: { nodeType: "document", data: {}, content: [] } as never,
```
This renders as an empty body — fine for development. When connected to Contentful, real Rich Text is returned.

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

Use the `RichTextRenderer` component (`components/blog/RichTextRenderer.tsx`) for blog post and case study bodies:

```tsx
import { RichTextRenderer } from "@/components/blog/RichTextRenderer"

<RichTextRenderer document={post.fields.body} />
```

This wraps `@contentful/rich-text-react-renderer` with `@tailwindcss/typography` prose styles applied via `className="prose prose-lg max-w-none"`.

---

## Query Ordering

All queries use Contentful's `order` parameter:
- Date-ordered (newest first): `order: ["-fields.publishedDate"]`
- Alpha-ordered: `order: ["fields.name"]`
