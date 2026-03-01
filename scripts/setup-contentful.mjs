/**
 * Impact Growth Labs — Contentful Content Model Setup
 *
 * Creates all 6 content types in your Contentful space.
 * Run once after creating a new space. Safe to re-run — existing types are skipped.
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
// Helpers
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

function asset(id, name, opts = {}) {
  return {
    id,
    name,
    type: "Link",
    linkType: "Asset",
    required: false,
    ...opts,
  };
}

function json(id, name, opts = {}) {
  return { id, name, type: "Object", required: false, ...opts };
}

function symbolList(id, name, opts = {}) {
  return {
    id,
    name,
    type: "Array",
    items: { type: "Symbol" },
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
        message:
          "Slug must be lowercase letters, numbers, and hyphens only (e.g. my-blog-post)",
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Content type definitions
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
      symbol("title", "Title", {
        required: true,
        validations: [{ size: { max: 100 }, message: "Keep titles under 100 characters." }],
      }),
      symbol("slug", "Slug", {
        required: true,
        ...slugValidation(),
      }),
      text("excerpt", "Excerpt", {
        required: true,
        validations: [
          {
            size: { max: 280 },
            message:
              "Excerpts should be 1–2 sentences. Lead with the insight or outcome, not the method.",
          },
        ],
      }),
      richText("body", "Body", {
        required: true,
      }),
      asset("coverImage", "Cover Image"),
      symbol("author", "Author", { required: true }),
      date("publishedDate", "Published Date", { required: true }),
      symbolList("tags", "Tags"),
    ],
  },

  // ── Case Study ────────────────────────────────────────────────────────────
  {
    id: "caseStudy",
    name: "Case Study",
    description:
      "In-depth stories of portfolio company growth and impact. Ground every claim in data. Lead with the higher-level 'why' before the 'how'.",
    displayField: "title",
    fields: [
      symbol("title", "Title", {
        required: true,
        validations: [{ size: { max: 100 }, message: "Keep titles under 100 characters." }],
      }),
      symbol("slug", "Slug", {
        required: true,
        ...slugValidation(),
      }),
      text("excerpt", "Excerpt", {
        required: true,
        validations: [
          {
            size: { max: 280 },
            message: "1–2 sentences. State the challenge and the outcome — no hyperbole.",
          },
        ],
      }),
      richText("body", "Body", { required: true }),
      asset("coverImage", "Cover Image"),
      symbol("company", "Company Name", { required: true }),
      symbol("impactSummary", "Impact Summary", {
        required: true,
        validations: [
          {
            size: { max: 120 },
            message:
              "One line with specific, data-backed impact. Example: '40% carbon reduction across 120 facilities, 85,000 tCO₂e avoided annually.'",
          },
        ],
      }),
      date("publishedDate", "Published Date", { required: true }),
    ],
  },

  // ── Portfolio Company ─────────────────────────────────────────────────────
  {
    id: "portfolioCompany",
    name: "Portfolio Company",
    description: "Companies in the Impact Growth Labs portfolio.",
    displayField: "name",
    fields: [
      symbol("name", "Company Name", { required: true }),
      {
        id: "slug",
        name: "Slug",
        type: "Symbol",
        required: true,
        helpText: "URL-safe identifier, e.g. greentech-solutions. Must be unique.",
        validations: [
          { unique: true },
          {
            regexp: { pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", flags: "" },
            message: "Use only lowercase letters, numbers, and hyphens (e.g. greentech-solutions).",
          },
        ],
      },
      asset("logo", "Logo"),
      symbol("website", "Website URL", {
        validations: [
          {
            regexp: { pattern: "^https?://", flags: "" },
            message: "Must be a full URL starting with https://",
          },
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
          {
            in: ["Pre-Seed", "Seed", "Series A", "Series B", "Growth"],
            message: "Select a stage from the list.",
          },
        ],
      }),
      text("description", "Description", {
        required: true,
        validations: [
          {
            size: { max: 200 },
            message:
              "One sentence describing what the company does and who it serves. Be specific and grounded.",
          },
        ],
      }),
      json("metrics", "Impact Metrics"),
    ],
  },

  // ── Team Member ───────────────────────────────────────────────────────────
  {
    id: "teamMember",
    name: "Team Member",
    description: "Team profiles displayed on the public site.",
    displayField: "name",
    fields: [
      symbol("name", "Full Name", { required: true }),
      symbol("role", "Role / Title", { required: true }),
      text("bio", "Bio", {
        required: true,
        validations: [
          {
            size: { max: 400 },
            message:
              "2–3 sentences. Highlight lived experience and specific contributions — avoid superlatives like 'world-class' or 'unrivalled'.",
          },
        ],
      }),
      asset("photo", "Headshot"),
      symbol("linkedIn", "LinkedIn URL", {
        validations: [
          {
            regexp: { pattern: "^https://www\\.linkedin\\.com/", flags: "" },
            message: "Must be a full LinkedIn URL (https://www.linkedin.com/...)",
          },
        ],
      }),
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
        validations: [
          {
            size: { max: 200 },
            message: "Short summary of the document contents for the portal list view.",
          },
        ],
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
      symbol("title", "Headline", {
        required: true,
        validations: [{ size: { max: 120 }, message: "Keep headlines under 120 characters." }],
      }),
      text("summary", "Summary", {
        required: true,
        validations: [
          {
            size: { max: 280 },
            message: "1–2 sentences. State the development factually and clearly.",
          },
        ],
      }),
      symbol("company", "Company Name", { required: true }),
      date("publishedDate", "Published Date", { required: true }),
      symbol("link", "External Article URL", {
        validations: [
          {
            regexp: { pattern: "^https?://", flags: "" },
            message: "Must be a full URL starting with https://",
          },
        ],
      }),
    ],
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱  Impact Growth Labs — Contentful Setup");
  console.log(`    Space: ${SPACE_ID}\n`);

  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  // Get existing content types so we can skip rather than error
  const existing = await environment.getContentTypes();
  const existingIds = new Set(existing.items.map((ct) => ct.sys.id));

  for (const def of CONTENT_TYPES) {
    if (existingIds.has(def.id)) {
      console.log(`⏭️   Skipping "${def.name}" — already exists`);
      continue;
    }

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
  }

  console.log("\n🎉  Done! Open Contentful and start adding content.");
  console.log(
    "    Remember to set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env.local\n"
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
