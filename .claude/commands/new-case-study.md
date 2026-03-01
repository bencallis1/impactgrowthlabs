Add a new mock case study to `lib/contentful.ts`.

The case study details are: $ARGUMENTS

Steps:
1. Read `lib/contentful.ts`
2. Generate a URL-safe slug from the title (lowercase, hyphens for spaces, no special chars)
3. Pick a realistic `publishedDate` (today's date or one provided in the arguments)
4. Append a new entry to the `MOCK_CASE_STUDIES` array following this exact shape:

```typescript
{
  sys: { id: "<next sequential id>", createdAt: "<date>T00:00:00Z", updatedAt: "<date>T00:00:00Z" },
  fields: {
    title: "<title>",
    slug: "<slug>",
    excerpt: "<2-sentence excerpt describing the challenge and outcome>",
    body: { nodeType: "document", data: {}, content: [] } as never,
    company: "<company name>",
    impactSummary: "<one-line quantified impact stat, e.g. '40% reduction, 100K beneficiaries'>",
    publishedDate: "<YYYY-MM-DD>",
  },
},
```

5. Confirm the new case study was added and show the slug so the user can navigate to `/case-studies/<slug>` to verify.
