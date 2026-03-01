# Impact Growth Labs — Claude Instructions

## Project
Impact venture studio website. Next.js 16, TypeScript, Tailwind v4, Contentful, NextAuth.js v5, Framer Motion 12.

## Commands
```bash
npm run dev       # dev server on port 3000
npm run build     # production build (run this to verify after any feature)
npm run lint      # ESLint
```

**Always run `npm run build` after completing a task to catch TypeScript errors before finishing.**

## Preview Server
Use `preview_start "impactgrowthlabs"` (not Bash `npm run dev`) to start the preview.
After any visual change, take a screenshot to verify the result looks correct.

## Detailed Guides
- @.claude/rules/stack.md — Stack versions, gotchas, and compatibility notes
- @.claude/rules/conventions.md — Client vs server components, animation patterns, brand tokens
- @.claude/rules/content.md — Adding/editing content; Contentful model reference
- @.claude/rules/writing.md — Brand voice, tone, and vocabulary (Hawkins Framework)

## Directory Structure
```
app/
  (public)/        Public site — Navbar + Footer layout
  (portal)/        Investor portal — dark sidebar, auth-protected
  api/             API routes (auth, apply, invest)
auth.ts            NextAuth v5 root config (Credentials provider)
proxy.ts           Route protection for /portal/* routes
components/
  ui/              Button, AnimatedSection, StaggerGrid/Item, PageTransition
  layout/          Navbar (scroll-aware), Footer
  home/            Hero, ImpactMetrics, Services, Portfolio, Team, BlogPreview
  blog/            BlogCard, RichTextRenderer
  case-studies/    CaseStudyCard
  forms/           FounderApplicationForm, InvestorInquiryForm
  portal/          PortalNav, PortfolioCard, ImpactChart, DocumentList
lib/
  contentful.ts    Contentful client + MOCK_* arrays (used when env not configured)
  validations.ts   Zod v4 schemas for intake forms
types/
  contentful.ts    Interfaces for all Contentful content types
  portal.ts        Portal-specific types
```

## Environment Variables (`.env.local`)
```
CONTENTFUL_SPACE_ID         # contentful.com/spaces → Space settings → API keys
CONTENTFUL_ACCESS_TOKEN     # Content Delivery API token (read-only)
AUTH_SECRET                 # openssl rand -base64 32
PORTAL_USER_EMAIL           # investor login email
PORTAL_USER_PASSWORD_HASH   # bcrypt hash (see .env.local comment for how to generate)
RESEND_API_KEY              # resend.com — for form email delivery
CONTACT_EMAIL               # where form submissions are emailed
```

## Contentful Setup (first time)
Run once after creating a new Contentful space to scaffold all 6 content types:
```bash
# 1. Add CONTENTFUL_MANAGEMENT_TOKEN to .env.local (Settings → API keys → CMA tokens)
# 2. Run:
npm run setup:contentful
```
The script is idempotent — safe to re-run; existing content types are skipped.
Script: `scripts/setup-contentful.mjs`

## Mock Content (No Contentful Needed)
Site uses mock data automatically when `CONTENTFUL_SPACE_ID` is unset.
Edit `MOCK_BLOG_POSTS`, `MOCK_CASE_STUDIES`, `MOCK_PORTFOLIO`, `MOCK_TEAM`, etc. near the top of `lib/contentful.ts`.

## Investor Portal Auth
Login at `/login` → portal at `/portal/*`
Generate password hash: `node -e "const b=require('bcryptjs'); b.hash('yourpassword',10).then(console.log)"`

## Slash Commands
| Command | What it does |
|---------|-------------|
| `/project:new-blog` | Add a mock blog post |
| `/project:new-case-study` | Add a mock case study |
| `/project:add-company` | Add a portfolio company to mock data |
| `/project:new-page` | Scaffold a new public page |
| `/project:new-component` | Scaffold a new component |
| `/project:typecheck` | Run build and fix TypeScript errors |
