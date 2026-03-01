Add a new mock blog post to `lib/contentful.ts`.

The post details are: $ARGUMENTS

Steps:
1. Read `lib/contentful.ts`
2. Generate a URL-safe slug from the title (lowercase, hyphens for spaces, no special chars)
3. Pick a realistic `publishedDate` (today's date or one provided in the arguments)
4. Append a new entry to the `MOCK_BLOG_POSTS` array following this exact shape:

```typescript
{
  sys: { id: "<next sequential id>", createdAt: "<date>T00:00:00Z", updatedAt: "<date>T00:00:00Z" },
  fields: {
    title: "<title>",
    slug: "<slug>",
    excerpt: "<2-sentence excerpt that fits the title/topic>",
    body: { nodeType: "document", data: {}, content: [] } as never,
    author: "<author name from arguments, or pick from existing team: Sarah Chen, Marcus Williams, Priya Patel>",
    publishedDate: "<YYYY-MM-DD>",
    tags: ["<relevant>", "<tags>"],
  },
},
```

4. Confirm the new post was added and show the slug so the user can navigate to `/blog/<slug>` to verify.
