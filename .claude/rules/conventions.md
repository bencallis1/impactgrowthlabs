# Code Conventions

## Client vs Server Components

**Default: server component** (no directive needed).

Add `"use client"` only when the component uses:
- Framer Motion (`motion`, `useInView`, `useScroll`, `useMotionValue`, `AnimatePresence`)
- React hooks with browser state (`useState`, `useEffect`, `useRef`)
- Event handlers (onClick, onChange, etc.)
- `next-auth/react` (`signIn`, `signOut`, `useSession`)
- `react-hook-form` (`useForm`, `Controller`)
- Browser APIs (`window`, `localStorage`, etc.)

**Key pattern**: page files stay server components and pass fetched data as props to client components. Server component children can be passed to client component wrappers.

```tsx
// app/(public)/page.tsx — server component
export default async function Page() {
  const data = await getPortfolioCompanies()  // server-side fetch
  return <Portfolio companies={data} />        // client component receives data as props
}
```

---

## Animation Patterns

Use the primitives in `components/ui/AnimatedSection.tsx`:

```tsx
// Fade-up on scroll — works with server or client children
import { AnimatedSection } from "@/components/ui/AnimatedSection"

<AnimatedSection delay={0.2} className="...">
  <SomeContent />
</AnimatedSection>

// Stagger grid — children animate in sequence
import { StaggerGrid, StaggerItem } from "@/components/ui/AnimatedSection"

<StaggerGrid className="grid grid-cols-3 gap-6">
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card item={item} />
    </StaggerItem>
  ))}
</StaggerGrid>

// Page transition — already applied in (public)/layout.tsx
import { PageTransition } from "@/components/ui/PageTransition"
```

For hero-level or one-off animations, use `motion` directly:
```tsx
"use client"
import { motion } from "framer-motion"

<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.2 }}
>
```

---

## Brand Tokens

Use hex values directly in Tailwind classes:

| Role | Hex | Example class |
|------|-----|--------------|
| Primary (dark green) | `#1A3A2E` | `bg-[#1A3A2E]`, `text-[#1A3A2E]` |
| Primary hover | `#2D6A4F` | `hover:bg-[#2D6A4F]` |
| Accent (emerald) | `#52B788` | `text-[#52B788]`, `border-[#52B788]` |
| Accent light | `#95D5B2` | `text-[#95D5B2]` (on dark backgrounds) |
| Surface (off-white) | `#F7FAF8` | `bg-[#F7FAF8]` |
| Dark surface | `#0F1A14` | `bg-[#0F1A14]` (footer, portal sidebar) |
| Body text | `#0F1A14` | `text-[#0F1A14]` |
| Muted text | `/60` opacity | `text-[#0F1A14]/60` |

**Section backgrounds alternate**: `bg-white` → `bg-[#F7FAF8]` → `bg-[#1A3A2E]` (metrics) → back to `bg-white`

---

## Typography

```tsx
// Section eyebrow (small label above heading)
<p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
  Section Label
</p>

// Main heading — use font-serif for h1/h2
<h1 className="font-serif text-5xl text-[#1A3A2E]">Heading</h1>
<h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E]">Section Title</h2>

// Body / subline
<p className="text-lg text-[#0F1A14]/60 leading-relaxed">...</p>
```

---

## Page Layout

All public pages need top padding to clear the fixed navbar:
```tsx
<div className="min-h-screen bg-[#F7FAF8] pt-28 pb-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    ...
  </div>
</div>
```

---

## Form Pattern

Reference: `components/forms/FounderApplicationForm.tsx`

```tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// 1. Validate with Zod schema from lib/validations.ts
// 2. POST to /api/<name> route
// 3. Show CheckCircle success state (no redirect) on res.ok
// 4. Show Loader2 spinner while submitting
```

---

## Component Export Style

Always use **named exports**, not default:
```tsx
// ✓ Correct
export function MyComponent() { ... }

// ✗ Avoid
export default function MyComponent() { ... }
```

---

## Routing Conventions

| Where to add | Location |
|---|---|
| New public page | `app/(public)/<name>/page.tsx` |
| New portal page | `app/(portal)/portal/<name>/page.tsx` (protected by proxy.ts) |
| New API route | `app/api/<name>/route.ts` |
| New nav link | `components/layout/Navbar.tsx` `navLinks` array |
| New footer link | `components/layout/Footer.tsx` `footerLinks` object |

---

## Static Generation (Contentful pages)

```tsx
export const revalidate = 3600  // revalidate every hour

// For [slug] routes:
export async function generateStaticParams() {
  const items = await getMyItems()
  return items.map(item => ({ slug: item.fields.slug }))
}
```
