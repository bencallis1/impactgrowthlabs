Run a full TypeScript build check and fix any errors found.

Steps:
1. Run the build: `npm run build 2>&1`
2. Parse the output for TypeScript errors (lines containing `Type error:` or `error TS`)
3. For each error:
   a. Read the file at the reported path and line number
   b. Understand the root cause before touching any code
   c. Apply the minimal fix — prefer type assertions or interface adjustments over restructuring
   d. Do NOT suppress errors with `// @ts-ignore` or `as any` unless there is no better option (e.g. the Contentful SDK `AnyClient` pattern in `lib/contentful.ts` is intentional)
4. Re-run `npm run build 2>&1` after fixes to confirm all errors are resolved
5. Report a summary of what was fixed

**Known intentional patterns** (do not "fix" these):
- `lib/contentful.ts` — `type AnyClient` cast and `as unknown as BlogPost[]` are intentional workarounds for Contentful SDK v11 generics
- `components/ui/AnimatedSection.tsx` — `ease: [...] as [number, number, number, number]` is required for Framer Motion v12
- `app/(public)/blog/[slug]/page.tsx` and `app/(public)/case-studies/[slug]/page.tsx` — `params: Promise<{ slug: string }>` and `await params` are correct Next.js 16 patterns
