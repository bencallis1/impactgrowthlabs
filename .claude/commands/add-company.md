Add a new portfolio company to the mock data in `lib/contentful.ts`.

The company details are: $ARGUMENTS

Steps:
1. Read `lib/contentful.ts`
2. Append a new entry to the `MOCK_PORTFOLIO` array following this exact shape:

```typescript
{
  sys: { id: "<next sequential id>" },
  fields: {
    name: "<company name>",
    sector: "<sector: Climate | Health | Education | Circular Economy | Food & Ag | FinTech | Other>",
    stage: "<stage: Pre-seed | Seed | Series A | Series B>",
    description: "<one-sentence description of what the company does>",
    website: "https://<company>.example",
    metrics: { <key>: "<value>", <key2>: <number> },  // 2 key impact metrics
  },
},
```

3. Also check if the company should appear in `MOCK_PORTAL_NEWS` — if the arguments mention any announcements or milestones, add a corresponding news item to `MOCK_PORTAL_NEWS` as well.

4. Confirm the company was added. Remind the user it will appear on the homepage Portfolio section and in the investor portal at `/portal`.
