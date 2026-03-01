Scaffold a new public page for the Impact Growth Labs website.

Page details: $ARGUMENTS

Steps:
1. Determine the route name and create the file at `app/(public)/<name>/page.tsx`
2. The page must be a **server component** (no `"use client"` directive)
3. Follow the standard page layout pattern:

```tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection"

export const metadata = {
  title: "<Page Title> | Impact Growth Labs",
  description: "<SEO description>",
}

export default async function <Name>Page() {
  return (
    <div className="min-h-screen bg-[#F7FAF8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow + heading */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
            Section Label
          </p>
          <h1 className="font-serif text-5xl text-[#1A3A2E] mb-6">Page Title</h1>
          <p className="text-lg text-[#0F1A14]/60 leading-relaxed max-w-2xl mx-auto">
            Subheading or description.
          </p>
        </AnimatedSection>

        {/* Main content */}
      </div>
    </div>
  )
}
```

4. If the page needs a nav link, add it to the `navLinks` array in `components/layout/Navbar.tsx`
5. If the page needs a footer link, add it to the `footerLinks` object in `components/layout/Footer.tsx`
6. Run a quick TypeScript check: `npm run build 2>&1 | head -30` to confirm no errors

Use **named exports** for any sub-components. Use brand tokens from `.claude/rules/conventions.md`. Wrap each section in `<AnimatedSection>`.
