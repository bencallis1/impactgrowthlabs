# Stack Reference

## Versions
| Package | Version | Notes |
|---------|---------|-------|
| Next.js | 16.1.6 | App Router, Turbopack, React 19 |
| Tailwind CSS | v4 | CSS-based config, no tailwind.config.ts |
| Framer Motion | 12 | Stricter TypeScript for Variants |
| NextAuth.js | v5 beta (`next-auth@beta`) | New root-file convention |
| Contentful SDK | 11 | `getEntries` requires `EntrySkeletonType` |
| Zod | v4 | Changed enum error API |
| @hookform/resolvers | v5 | Works with Zod v4 |
| Recharts | v3 | Used for portal impact charts |

---

## Tailwind CSS v4
- **No `tailwind.config.ts`** — all config lives in `app/globals.css` inside `@theme { }`
- Add plugins via CSS: `@plugin "@tailwindcss/typography"` (already set up)
- Custom color tokens in `@theme {}` block — use hex directly in class names: `text-[#1A3A2E]`
- Brand tokens already defined: `--color-primary`, `--color-accent`, `--color-surface`, etc.

## Framer Motion v12
- **Bezier ease arrays in `Variants` must be explicitly typed:**
  ```ts
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
  ```
- Direct `transition` props on `<motion.div>` do NOT need the cast — only inside `Variants` objects
- Always add `"use client"` to any file importing from `framer-motion`

## Next.js 16
- **Middleware renamed**: use `proxy.ts` not `middleware.ts` (already done)
- **`params` is a Promise**: always `const { slug } = await params` in page components
- Route groups `(public)` and `(portal)` do not affect URLs

## NextAuth.js v5 (`next-auth@beta`)
- Root config file: `auth.ts` — exports `{ handlers, auth, signIn, signOut }`
- API route: `app/api/auth/[...nextauth]/route.ts` just re-exports handlers
- Server components: `const session = await auth()`
- Client components: import `{ signIn, signOut }` from `"next-auth/react"`
- Route protection: `proxy.ts` at project root (not in `app/`)

## Contentful SDK v11
- `getEntries<T>` requires `EntrySkeletonType` — existing pattern casts client as `AnyClient`:
  ```ts
  type AnyClient = { getEntries(q: Record<string, unknown>): Promise<{ items: any[] }> }
  const client = getClient() as AnyClient | null
  ```
- Results are cast `as unknown as BlogPost[]` — do not add type parameters to `getEntries`
- Contentful image URLs start with `//` — prefix with `https:` or use `src={`https:${url}`}`
- Domain `images.ctfassets.net` is whitelisted in `next.config.ts`

## Zod v4
- **Enum error messages**: use `{ error: "..." }` — not `{ errorMap: ... }`
- **Enum values need `as const`**: `z.enum(["a", "b"] as const, { error: "..." })`
- `z.array(...).min(1, "msg")` and `.refine()` work as before

## React 19
- `forwardRef` still works (no changes needed)
- React Compiler is enabled in `next.config.ts` (`reactCompiler: true`)
- Async Server Components work natively — `async function Page() { const data = await fetch(...) }`
