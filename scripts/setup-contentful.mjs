/**
 * Impact Growth Labs — Contentful Content Model Setup
 *
 * Creates new content types and adds missing fields to existing ones.
 * Safe to re-run at any time — existing fields are never overwritten.
 *
 * Prerequisites:
 *   CONTENTFUL_SPACE_ID         — from .env.local
 *   CONTENTFUL_MANAGEMENT_TOKEN — Settings → API keys → Content Management Tokens
 *
 * Usage:
 *   npm run setup:contentful
 */

import pkg from "contentful-management";
const { createClient } = pkg;

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || SPACE_ID === "your_space_id") {
  console.error("❌  CONTENTFUL_SPACE_ID is not set in .env.local");
  process.exit(1);
}
if (!MANAGEMENT_TOKEN) {
  console.error("❌  CONTENTFUL_MANAGEMENT_TOKEN is not set in .env.local");
  console.error(
    "   Get it from: Contentful → Settings → API keys → Content Management Tokens"
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Field builder helpers
// ---------------------------------------------------------------------------

function symbol(id, name, opts = {}) {
  return { id, name, type: "Symbol", required: false, ...opts };
}

function text(id, name, opts = {}) {
  return { id, name, type: "Text", required: false, ...opts };
}

function richText(id, name, opts = {}) {
  return { id, name, type: "RichText", required: false, ...opts };
}

function date(id, name, opts = {}) {
  return { id, name, type: "Date", required: false, ...opts };
}

function integer(id, name, opts = {}) {
  return { id, name, type: "Integer", required: false, ...opts };
}

function boolean_(id, name, opts = {}) {
  return { id, name, type: "Boolean", required: false, ...opts };
}

function asset(id, name, opts = {}) {
  return { id, name, type: "Link", linkType: "Asset", required: false, ...opts };
}

function json(id, name, opts = {}) {
  return { id, name, type: "Object", required: false, ...opts };
}

function symbolList(id, name, opts = {}) {
  return { id, name, type: "Array", items: { type: "Symbol" }, required: false, ...opts };
}

function entryLink(id, name, linkContentType, opts = {}) {
  return {
    id,
    name,
    type: "Link",
    linkType: "Entry",
    required: false,
    validations: [{ linkContentType: [linkContentType] }],
    ...opts,
  };
}

function entryLinkList(id, name, linkContentType, opts = {}) {
  return {
    id,
    name,
    type: "Array",
    items: {
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: [linkContentType] }],
    },
    required: false,
    ...opts,
  };
}

function slugValidation() {
  return {
    validations: [
      {
        regexp: {
          pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
          flags: "",
        },
        message: "Slug must be lowercase letters, numbers, and hyphens only (e.g. my-blog-post)",
      },
    ],
  };
}

const SDG_LIST = [
  "1 No Poverty", "2 Zero Hunger", "3 Good Health", "4 Quality Education",
  "5 Gender Equality", "6 Clean Water", "7 Clean Energy", "8 Decent Work",
  "9 Industry & Innovation", "10 Reduced Inequalities", "11 Sustainable Cities",
  "12 Responsible Consumption", "13 Climate Action", "14 Life Below Water",
  "15 Life on Land", "16 Peace & Justice", "17 Partnerships",
];

// ---------------------------------------------------------------------------
// Content type definitions — full field lists for each type
// Existing types: all NEW fields go at the bottom (after the original fields)
// New types: complete definitions
// ---------------------------------------------------------------------------

const CONTENT_TYPES = [
  // ── Blog Post ──────────────────────────────────────────────────────────────
  {
    id: "blogPost",
    name: "Blog Post",
    description:
      "Editorial content for the public blog. Write with calm authority — provide context before detail, and ensure the reader feels expanded, not pressured.",
    displayField: "title",
    fields: [
      // Original fields
      symbol("title", "Title", {
        required: true,
        validations: [{ size: { max: 100 }, message: "Keep titles under 100 characters." }],
      }),
      symbol("slug", "Slug", { required: true, ...slugValidation() }),
      text("excerpt", "Excerpt", {
        required: true,
        validations: [
          { size: { max: 280 }, message: "Excerpts should be 1–2 sentences. Lead with the insight or outcome." },
        ],
      }),
      richText("body", "Body", { required: true }),
      asset("coverImage", "Cover Image"),
      symbol("author", "Author (plain text)", { required: true }),
      date("publishedDate", "Published Date", { required: true }),
      symbolList("tags", "Tags"),
      // New fields
      entryLink("authorRef", "Author (linked)", "teamMember"),
      entryLinkList("relatedPosts", "Related Posts", "blogPost"),
      boolean_("featured", "Featured"),
      integer("readTimeMinutes", "Read Time (minutes)"),
    ],
  },

  // ── Case Study ────────────────────────────────────────────────────────────
  {
    id: "caseStudy",
    name: "Case Study",
    description:
      "In-depth stories of portfolio company growth and impact. Ground every claim in data. Lead with the higher-level 'why' before the 'how'.\n\n" +
      "LINKING TO A PORTFOLIO COMPANY: Use the 'Portfolio Company (linked)' field to connect this case study to its company entry. " +
      "This is the canonical relationship — setting it here is all that's needed. " +
      "The site automatically surfaces all linked case studies on the company's detail page via a reverse lookup on this field. " +
      "Do not leave this blank if the company exists in the portfolio.",
    displayField: "title",
    fields: [
      // Original fields
      symbol("title", "Title", {
        required: true,
        validations: [{ size: { max: 100 }, message: "Keep titles under 100 characters." }],
      }),
      symbol("slug", "Slug", { required: true, ...slugValidation() }),
      text("excerpt", "Excerpt", {
        required: true,
        validations: [
          { size: { max: 280 }, message: "1–2 sentences. State the challenge and the outcome — no hyperbole." },
        ],
      }),
      richText("body", "Body", { required: true }),
      asset("coverImage", "Cover Image"),
      symbol("company", "Company Name (plain text fallback)", { required: true }),
      symbol("impactSummary", "Impact Summary", {
        required: true,
        validations: [
          {
            size: { max: 120 },
            message: "One line with specific, data-backed impact. Example: '40% carbon reduction across 120 facilities'.",
          },
        ],
      }),
      date("publishedDate", "Published Date", { required: true }),
      // New fields
      entryLink(
        "companyRef",
        "Portfolio Company (linked — set this to connect case study to company)",
        "portfolioCompany"
      ),
      boolean_("featured", "Featured"),
      symbolList("tags", "Tags", {
        items: { type: "Symbol" },
      }),
      symbolList("sdgs", "UN Sustainable Development Goals", {
        items: {
          type: "Symbol",
          validations: [{ in: SDG_LIST, message: "Select from the SDG list." }],
        },
      }),
      symbol("videoUrl", "Video URL", {
        validations: [
          { regexp: { pattern: "^https?://", flags: "" }, message: "Must be a full URL starting with https://" },
        ],
      }),
    ],
  },

  // ── Portfolio Company ─────────────────────────────────────────────────────
  {
    id: "portfolioCompany",
    name: "Portfolio Company",
    description: "Companies in the Impact Growth Labs portfolio.",
    displayField: "name",
    fields: [
      // Original fields
      symbol("name", "Company Name", { required: true }),
      {
        id: "slug",
        name: "Slug",
        type: "Symbol",
        required: true,
        validations: [
          { unique: true },
          { regexp: { pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", flags: "" }, message: "Use only lowercase letters, numbers, and hyphens." },
        ],
      },
      asset("logo", "Logo"),
      symbol("website", "Website URL", {
        validations: [
          { regexp: { pattern: "^https?://", flags: "" }, message: "Must be a full URL starting with https://" },
        ],
      }),
      symbol("sector", "Sector", {
        required: true,
        validations: [
          {
            in: ["Climate", "Health", "Education", "Circular Economy", "Financial Inclusion", "Food & Agriculture", "Other"],
            message: "Select a sector from the list.",
          },
        ],
      }),
      symbol("stage", "Stage", {
        required: true,
        validations: [
          { in: ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"], message: "Select a stage from the list." },
        ],
      }),
      text("description", "Description", {
        required: true,
        validations: [
          { size: { max: 600 }, message: "2–4 sentences describing what the company does and who it serves." },
        ],
      }),
      json("metrics", "Impact Metrics"),
      // New fields
      boolean_("featured", "Featured"),
      symbol("location", "HQ Location", { validations: [{ size: { max: 60 } }] }),
      date("investmentDate", "Investment Date"),
      integer("foundingYear", "Founding Year"),
      symbolList("tags", "Tags", {
        items: { type: "Symbol" },
      }),
      symbolList("sdgs", "UN Sustainable Development Goals", {
        items: {
          type: "Symbol",
          validations: [{ in: SDG_LIST, message: "Select from the SDG list." }],
        },
      }),
      text("impactThesis", "Impact Thesis"),
    ],
  },

  // ── Team Member ───────────────────────────────────────────────────────────
  {
    id: "teamMember",
    name: "Team Member",
    description: "Team profiles displayed on the public site.",
    displayField: "name",
    fields: [
      // Original fields
      symbol("name", "Full Name", { required: true }),
      symbol("role", "Role / Title", { required: true }),
      text("bio", "Bio", {
        required: true,
        validations: [
          {
            size: { max: 400 },
            message: "2–3 sentences. Highlight lived experience and specific contributions — avoid superlatives.",
          },
        ],
      }),
      asset("photo", "Headshot"),
      symbol("linkedIn", "LinkedIn URL", {
        validations: [
          { regexp: { pattern: "^https://www\\.linkedin\\.com/", flags: "" }, message: "Must be a full LinkedIn URL." },
        ],
      }),
      // New fields
      symbol("twitter", "Twitter / X handle", {
        validations: [{ regexp: { pattern: "^@?[\\w]{1,15}$", flags: "" }, message: "Enter a Twitter handle (e.g. @handle)." }],
      }),
      integer("sortOrder", "Sort Order"),
      boolean_("featured", "Featured on homepage"),
    ],
  },

  // ── Portal Document ───────────────────────────────────────────────────────
  {
    id: "portalDocument",
    name: "Portal Document",
    description: "Files available in the investor portal (reports, legal, etc.).",
    displayField: "title",
    fields: [
      symbol("title", "Document Title", { required: true }),
      text("description", "Description", {
        validations: [{ size: { max: 200 }, message: "Short summary of the document for the portal list view." }],
      }),
      asset("file", "File", { required: true }),
      date("publishedDate", "Published Date", { required: true }),
      symbol("category", "Category", {
        required: true,
        validations: [
          {
            in: ["Quarterly Report", "Annual Report", "Impact Report", "Legal", "Financial", "Other"],
            message: "Select a document category.",
          },
        ],
      }),
    ],
  },

  // ── Portal News Item ──────────────────────────────────────────────────────
  {
    id: "portalNewsItem",
    name: "Portal News Item",
    description: "Portfolio company news and updates shown in the investor portal.",
    displayField: "title",
    fields: [
      // Original fields
      symbol("title", "Headline", {
        required: true,
        validations: [{ size: { max: 120 }, message: "Keep headlines under 120 characters." }],
      }),
      text("summary", "Summary", {
        required: true,
        validations: [{ size: { max: 280 }, message: "1–2 sentences. State the development factually and clearly." }],
      }),
      symbol("company", "Company Name (plain text)", { required: true }),
      date("publishedDate", "Published Date", { required: true }),
      symbol("link", "External Article URL", {
        validations: [{ regexp: { pattern: "^https?://", flags: "" }, message: "Must be a full URL starting with https://" }],
      }),
      // New fields
      entryLink("companyRef", "Portfolio Company (linked)", "portfolioCompany"),
    ],
  },

  // ── Testimonial ───────────────────────────────────────────────────────────
  {
    id: "testimonial",
    name: "Testimonial",
    description: "Founder, portfolio company, and investor testimonials for the public site.",
    displayField: "authorName",
    fields: [
      text("quote", "Quote", {
        required: true,
        validations: [
          { size: { max: 500 }, message: "Keep quotes concise — 1–3 sentences is most impactful." },
        ],
      }),
      symbol("authorName", "Author Name", { required: true }),
      symbol("authorRole", "Author Role / Title", { required: true }),
      symbol("company", "Company", {}),
      asset("avatar", "Avatar / Headshot"),
      boolean_("featured", "Featured"),
      date("publishedDate", "Published Date"),
    ],
  },

  // ── Press Item ────────────────────────────────────────────────────────────
  {
    id: "pressItem",
    name: "Press Item",
    description: "Media coverage and press mentions for the public site.",
    displayField: "title",
    fields: [
      symbol("title", "Headline", {
        required: true,
        validations: [{ size: { max: 160 }, message: "Keep headlines under 160 characters." }],
      }),
      symbol("publication", "Publication Name", { required: true }),
      text("excerpt", "Excerpt", {
        validations: [{ size: { max: 280 }, message: "Short pull quote or summary from the article." }],
      }),
      symbol("url", "Article URL", {
        required: true,
        validations: [{ regexp: { pattern: "^https?://", flags: "" }, message: "Must be a full URL starting with https://" }],
      }),
      asset("publicationLogo", "Publication Logo"),
      date("publishedDate", "Published Date", { required: true }),
      boolean_("featured", "Featured"),
    ],
  },

  // ── FAQ ────────────────────────────────────────────────────────────────────
  {
    id: "faq",
    name: "FAQ",
    description: "Frequently asked questions for use across the public site.",
    displayField: "question",
    fields: [
      symbol("question", "Question", {
        required: true,
        validations: [{ size: { max: 200 }, message: "Phrase questions from the reader's perspective." }],
      }),
      richText("answer", "Answer", { required: true }),
      symbol("category", "Category", {
        validations: [
          {
            in: ["Investing", "Portfolio", "Impact", "Operations", "General"],
            message: "Select a FAQ category.",
          },
        ],
      }),
      integer("sortOrder", "Sort Order"),
    ],
  },

  // ── Job Posting ───────────────────────────────────────────────────────────
  {
    id: "jobPosting",
    name: "Job Posting",
    description: "Open roles at Impact Growth Labs for the Careers page.",
    displayField: "title",
    fields: [
      symbol("title", "Job Title", { required: true }),
      symbol("slug", "Slug", { required: true, ...slugValidation() }),
      symbol("team", "Team / Department", {}),
      symbol("location", "Location", {}),
      symbol("type", "Employment Type", {
        validations: [
          { in: ["Full-time", "Part-time", "Contract", "Internship"], message: "Select an employment type." },
        ],
      }),
      richText("description", "Job Description", { required: true }),
      symbol("applicationUrl", "Application URL", {
        validations: [{ regexp: { pattern: "^https?://", flags: "" }, message: "Must be a full URL starting with https://" }],
      }),
      date("publishedDate", "Published Date", { required: true }),
      boolean_("active", "Active / Accepting Applications"),
    ],
  },
];

// ---------------------------------------------------------------------------
// Main — create new types, add missing fields to existing types
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱  Impact Growth Labs — Contentful Setup");
  console.log(`    Space: ${SPACE_ID}\n`);

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  const existing = await environment.getContentTypes();
  const existingMap = new Map(existing.items.map((ct) => [ct.sys.id, ct]));

  for (const def of CONTENT_TYPES) {
    const existingCt = existingMap.get(def.id);

    if (!existingCt) {
      // ── Create new content type ───────────────────────────────────────────
      console.log(`⚙️   Creating "${def.name}" (${def.id})...`);
      try {
        const contentType = await environment.createContentTypeWithId(def.id, {
          name: def.name,
          description: def.description,
          displayField: def.displayField,
          fields: def.fields,
        });
        await contentType.publish();
        console.log(`✅  Published "${def.name}"`);
      } catch (err) {
        console.error(`❌  Failed to create "${def.name}":`, err.message);
      }
    } else {
      // ── Add missing fields to existing content type ───────────────────────
      const existingFieldIds = new Set(existingCt.fields.map((f) => f.id));
      const newFields = def.fields.filter((f) => !existingFieldIds.has(f.id));

      if (newFields.length === 0) {
        console.log(`⏭️   No changes for "${def.name}" — all fields present`);
        continue;
      }

      console.log(`🔧  Updating "${def.name}" — adding ${newFields.length} field(s): ${newFields.map((f) => f.id).join(", ")}`);
      try {
        existingCt.fields = [...existingCt.fields, ...newFields];
        const updated = await existingCt.update();
        await updated.publish();
        console.log(`✅  Published updated "${def.name}"`);
      } catch (err) {
        console.error(`❌  Failed to update "${def.name}":`, err.message);
      }
    }
  }

  console.log("\n🎉  Done! Open Contentful and start adding content.");
  console.log("    Remember: CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN must be in .env.local\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
