Scaffold a new React component for the Impact Growth Labs website.

Component details: $ARGUMENTS

Steps:
1. Determine the correct directory based on what the component is for:
   - Homepage section → `components/home/<Name>.tsx`
   - Blog-related → `components/blog/<Name>.tsx`
   - Case study-related → `components/case-studies/<Name>.tsx`
   - Form → `components/forms/<Name>.tsx`
   - Portal → `components/portal/<Name>.tsx`
   - Reusable UI primitive → `components/ui/<Name>.tsx`
   - Layout → `components/layout/<Name>.tsx`

2. Decide if it needs `"use client"`:
   - Add `"use client"` only if it uses: Framer Motion, React hooks (`useState`, `useEffect`, `useRef`), event handlers, `react-hook-form`, `next-auth/react`, or browser APIs
   - Default to server component (no directive)

3. Use **named exports** (not default exports):
```tsx
export function MyComponent({ ... }: MyComponentProps) { ... }
```

4. Apply brand tokens and typography from `.claude/rules/conventions.md`

5. For animations, use `AnimatedSection` / `StaggerGrid` / `StaggerItem` from `@/components/ui/AnimatedSection` rather than raw `motion` unless it's a hero-level or one-off animation

6. After creating, show the import path the user should use:
```tsx
import { <Name> } from "@/components/<dir>/<Name>"
```
