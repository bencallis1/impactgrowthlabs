# The Nalanda Collective — Component Library
## docs/components.md
### Version 1.0 — Cursor Component Generation Guide

---

## HOW TO USE THIS FILE

This file defines every component in The Nalanda Collective design system. When building new components or pages in Cursor, reference this file for exact structure, props, CSS, and variants.

Place this file at `/docs/components.md` alongside `.cursorrules`.

**When asking Cursor to build a component, say:**
```
Following the component library in docs/components.md, build the [ComponentName] component.
```

**Stack:**
- Next.js 14+ (App Router)
- TypeScript
- CSS Modules (scoped per component) + globals.css for tokens
- Radix UI for headless accessibility primitives only
- No Tailwind — all styles via CSS custom properties defined in `.cursorrules`
- No Framer Motion — scroll animations via IntersectionObserver only

---

---

## FOUNDATION COMPONENTS

These are the atomic building blocks. Every other component is built from these.

---

### 1. EyebrowLabel

The small uppercase label that appears above every section heading.

```tsx
// components/ui/EyebrowLabel.tsx

interface EyebrowLabelProps {
  children: React.ReactNode
  className?: string
}

export function EyebrowLabel({ children, className }: EyebrowLabelProps) {
  return (
    <span className={`eyebrow-label ${className || ''}`}>
      {children}
    </span>
  )
}
```

```css
/* CSS */
.eyebrow-label {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-xs);          /* 0.7rem */
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-gold);
  font-weight: 400;
  margin-bottom: 1.5rem;
}
```

**Usage:** Always appears above an H2. Never inline with other text. Never in serif. Never any color other than Living Gold.

---

### 2. FadeIn

Scroll-triggered fade-in animation wrapper. Used on almost every content element.

```tsx
// components/ui/FadeIn.tsx
'use client'

import { useEffect, useRef, ReactNode } from 'react'
import styles from './FadeIn.module.css'

interface FadeInProps {
  children: ReactNode
  delay?: number        // ms — for staggered animations
  threshold?: number    // 0–1, default 0.15
  className?: string
}

export function FadeIn({
  children,
  delay = 0,
  threshold = 0.15,
  className
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(styles.visible)
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div ref={ref} className={`${styles.fadeIn} ${className || ''}`}>
      {children}
    </div>
  )
}
```

```css
/* FadeIn.module.css */
.fadeIn {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fadeIn.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Usage:** Wrap any content section that should animate in on scroll. Use `delay` prop to stagger multiple items in a grid.

---

### 3. Button

Two variants: contained and text (with arrow).

```tsx
// components/ui/Button.tsx
import Link from 'next/link'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'contained' | 'text' | 'contained-light'
  className?: string
  type?: 'button' | 'submit'
}

export function Button({
  children,
  href,
  onClick,
  variant = 'contained',
  className,
  type = 'button'
}: ButtonProps) {
  const classes = `${styles.btn} ${styles[variant]} ${className || ''}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
```

```css
/* Button.module.css */

/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition-base);
  border-radius: var(--radius-base);
  white-space: nowrap;
}

/* Contained — for dark backgrounds */
.contained {
  padding: 1rem 2.5rem;
  background: transparent;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
}
.contained:hover {
  background: var(--color-gold);
  color: var(--color-indigo);
}

/* Contained Light — for light/gold backgrounds */
.contained-light {
  padding: 1rem 2.5rem;
  background: transparent;
  border: 1px solid var(--color-indigo);
  color: var(--color-indigo);
}
.contained-light:hover {
  background: var(--color-indigo);
  color: var(--color-gold);
}

/* Text — inline CTA with arrow */
.text {
  padding: 0;
  background: transparent;
  border: none;
  color: var(--color-gold);
  border-bottom: 1px solid transparent;
  font-size: 0.85rem;
  border-radius: 0;
}
.text:hover {
  border-bottom-color: var(--color-gold);
}
```

**CTA copy rules — always include arrow →:**
- `Explore our philosophy →`
- `Tell us about your work →`
- `Begin the conversation →`
- `Read the full essay →`
- `Start the conversation →`
- Never: "Learn More", "Click Here", "Submit", "Go"

---

### 4. SectionDivider

Hairline decorative divider. Used between wordmark and subtitle, and as section breaks.

```tsx
// components/ui/SectionDivider.tsx
import styles from './SectionDivider.module.css'

interface SectionDividerProps {
  width?: 'full' | 'short' | 'medium'
  className?: string
}

export function SectionDivider({ width = 'full', className }: SectionDividerProps) {
  return <div className={`${styles.divider} ${styles[width]} ${className || ''}`} />
}
```

```css
/* SectionDivider.module.css */
.divider {
  height: 0.5px;
  background: var(--color-gold);
  opacity: 0.3;
}
.full  { width: 100%; }
.medium { width: 200px; }
.short { width: 80px; }
```

---

### 5. Tag / Badge

Focus area tags on venture cards and journal posts.

```tsx
// components/ui/Tag.tsx
import styles from './Tag.module.css'

interface TagProps {
  children: React.ReactNode
  variant?: 'gold' | 'sage' | 'terracotta'
}

export function Tag({ children, variant = 'gold' }: TagProps) {
  return (
    <span className={`${styles.tag} ${styles[variant]}`}>
      {children}
    </span>
  )
}
```

```css
/* Tag.module.css */
.tag {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-base);
}
.gold       { border: 1px solid rgba(201,148,58,0.4); color: var(--color-gold); }
.sage       { border: 1px solid rgba(143,175,138,0.4); color: var(--color-sage); }
.terracotta { border: 1px solid rgba(168,92,64,0.4); color: var(--color-terracotta); }
```

---

---

## LAYOUT COMPONENTS

---

### 6. Nav

Fixed navigation. Transparent over hero, transitions to solid on scroll.

```tsx
// components/layout/Nav.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const navLinks = [
  { label: 'About',      href: '/about' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Ventures',   href: '/ventures' },
  { label: 'Studio',     href: '/studio' },
  { label: 'Journal',    href: '/journal' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.logo} aria-label="The Nalanda Collective — Home">
          the nalanda collective
        </Link>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link href="/connect" className={styles.cta}>
          Connect →
        </Link>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Navigation">
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.mobileLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/connect" className={styles.mobileCta}>
                Connect →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
```

```css
/* Nav.module.css */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  transition: var(--transition-slow);
}
.nav.scrolled {
  background: rgba(245, 239, 224, 0.96);
  backdrop-filter: blur(8px);
  padding: 1.2rem 4rem;
  border-bottom: 1px solid var(--color-border-gold);
}

/* Logo */
.logo {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--color-cream);
  text-decoration: none;
  transition: var(--transition-base);
}
.nav.scrolled .logo { color: var(--color-indigo); }

/* Links */
.links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin: 0; padding: 0;
}
.link {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 239, 224, 0.75);
  text-decoration: none;
  transition: var(--transition-base);
  position: relative;
}
.link::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0;
  width: 0; height: 0.5px;
  background: var(--color-gold);
  transition: width var(--transition-base);
}
.link:hover,
.link.active { color: var(--color-gold); }
.link.active::after,
.link:hover::after { width: 100%; }
.nav.scrolled .link { color: rgba(27, 31, 75, 0.6); }
.nav.scrolled .link:hover,
.nav.scrolled .link.active { color: var(--color-gold); }

/* CTA */
.cta {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
  text-decoration: none;
  border-bottom: 1px solid var(--color-gold);
  padding-bottom: 2px;
  transition: var(--transition-base);
}
.cta:hover { opacity: 0.7; }

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.bar {
  display: block;
  width: 24px; height: 1px;
  background: var(--color-cream);
  transition: var(--transition-base);
}
.nav.scrolled .bar { background: var(--color-indigo); }

/* Mobile menu */
.mobileMenu {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: var(--color-indigo);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.mobileMenu ul { list-style: none; text-align: center; padding: 0; }
.mobileMenu li { margin-bottom: 2rem; }
.mobileLink {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-style: italic;
  font-weight: 300;
  color: var(--color-cream);
  text-decoration: none;
  transition: var(--transition-base);
}
.mobileLink:hover { color: var(--color-gold); }
.mobileCta {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold);
  text-decoration: none;
  border-bottom: 1px solid var(--color-gold);
  padding-bottom: 2px;
}

@media (max-width: 768px) {
  .nav { padding: 1.5rem 2rem; }
  .links { display: none; }
  .cta { display: none; }
  .hamburger { display: flex; }
}
```

---

### 7. Footer

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand column */}
        <div className={styles.brand}>
          <p className={styles.logo}>the nalanda collective</p>
          <p className={styles.guided}>Guided by Maitri</p>
          <div className={styles.divider} />
          <p className={styles.tagline}>
            Everything is connected.<br />
            We invest accordingly.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="LinkedIn" className={styles.socialLink}>LinkedIn</a>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>Instagram</a>
            <a href="#" aria-label="X / Twitter" className={styles.socialLink}>X</a>
          </div>
        </div>

        {/* Navigate column */}
        <div className={styles.col}>
          <p className={styles.colLabel}>Navigate</p>
          <ul className={styles.colLinks}>
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Philosophy', '/philosophy'],
              ['Ventures', '/ventures'],
              ['Studio', '/studio'],
              ['Journal', '/journal'],
              ['Connect', '/connect'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className={styles.footerLink}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect column */}
        <div className={styles.col}>
          <p className={styles.colLabel}>Connect</p>
          <a href="mailto:hello@thenalandacollective.com" className={styles.email}>
            hello@thenalandacollective.com
          </a>
          <div className={styles.paths}>
            <Link href="/connect?type=founder" className={styles.pathLink}>
              For founders →
            </Link>
            <Link href="/connect?type=capital" className={styles.pathLink}>
              For capital partners →
            </Link>
            <Link href="/connect?type=collaborator" className={styles.pathLink}>
              For collaborators →
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} The Nalanda Collective. Guided by Maitri.
        </p>
        <div className={styles.legal}>
          <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
          <Link href="/terms" className={styles.legalLink}>Terms of Use</Link>
        </div>
      </div>
    </footer>
  )
}
```

```css
/* Footer.module.css */
.footer {
  background: var(--color-indigo);
  padding: 6rem 4rem 3rem;
}
.inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid rgba(245,239,224,0.08);
}
.logo {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-cream);
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
}
.guided {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-gold);
  opacity: 0.7;
  margin-bottom: 1.2rem;
}
.divider {
  width: 60px; height: 0.5px;
  background: var(--color-gold);
  opacity: 0.3;
  margin-bottom: 1.2rem;
}
.tagline {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-cream);
  opacity: 0.4;
  line-height: 1.7;
  margin-bottom: 2rem;
}
.social { display: flex; gap: 1.5rem; }
.socialLink {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(245,239,224,0.35);
  text-decoration: none;
  transition: var(--transition-base);
}
.socialLink:hover { color: var(--color-gold); }

.colLabel {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-gold);
  opacity: 0.7;
  margin-bottom: 1.5rem;
}
.colLinks { list-style: none; padding: 0; margin: 0; }
.colLinks li { margin-bottom: 0.8rem; }
.footerLink {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: rgba(245,239,224,0.45);
  text-decoration: none;
  transition: var(--transition-base);
  letter-spacing: 0.05em;
}
.footerLink:hover { color: var(--color-gold); }

.email {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  font-style: italic;
  color: rgba(245,239,224,0.5);
  text-decoration: none;
  display: block;
  margin-bottom: 2rem;
  transition: var(--transition-base);
}
.email:hover { color: var(--color-gold); }

.paths { display: flex; flex-direction: column; gap: 0.8rem; }
.pathLink {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: rgba(245,239,224,0.35);
  text-decoration: none;
  transition: var(--transition-base);
}
.pathLink:hover { color: var(--color-gold); }

.bottom {
  max-width: 1200px;
  margin: 2.5rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.copyright {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(245,239,224,0.2);
}
.legal { display: flex; gap: 2rem; }
.legalLink {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(245,239,224,0.2);
  text-decoration: none;
  transition: var(--transition-base);
}
.legalLink:hover { color: rgba(245,239,224,0.5); }

@media (max-width: 768px) {
  .footer { padding: 4rem 2rem 2rem; }
  .inner { grid-template-columns: 1fr; gap: 3rem; }
  .bottom { flex-direction: column; gap: 1rem; text-align: center; }
}
```

---

---

## PAGE SECTION COMPONENTS

---

### 8. Hero

The full-screen opening section. Used on every page.

```tsx
// components/sections/Hero.tsx
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './Hero.module.css'

interface HeroCTA {
  label: string
  href: string
  variant?: 'contained' | 'text'
}

interface HeroProps {
  eyebrow?: string
  headline: string          // Use \n for intentional line breaks
  subheadline?: string
  secondaryLine?: string    // Small line below divider
  ctas?: HeroCTA[]
  variant?: 'dark' | 'light'
  showScrollIndicator?: boolean
}

export function Hero({
  eyebrow,
  headline,
  subheadline,
  secondaryLine,
  ctas = [],
  variant = 'dark',
  showScrollIndicator = true,
}: HeroProps) {
  // Preserve intentional line breaks from copy
  const headlineLines = headline.split('\n')

  return (
    <section className={`${styles.hero} ${styles[variant]}`}>
      <div className={styles.inner}>
        <FadeIn>
          {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}

          <h1 className={styles.headline}>
            {headlineLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {subheadline && (
            <p className={styles.subheadline}>{subheadline}</p>
          )}

          {secondaryLine && (
            <>
              <SectionDivider width="medium" className={styles.divider} />
              <p className={styles.secondaryLine}>{secondaryLine}</p>
            </>
          )}

          {ctas.length > 0 && (
            <div className={styles.ctas}>
              {ctas.map((cta, i) => (
                <Button
                  key={i}
                  href={cta.href}
                  variant={cta.variant || (i === 0 ? 'contained' : 'text')}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </FadeIn>
      </div>

      {showScrollIndicator && (
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      )}
    </section>
  )
}
```

```css
/* Hero.module.css */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10rem 4rem 6rem;
  position: relative;
  overflow: hidden;
}

/* Variants */
.dark {
  background: var(--color-indigo);
}
.dark::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 40% 60%, rgba(201,148,58,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.light {
  background: var(--color-cream);
}

.inner {
  max-width: 900px;
  position: relative;
  z-index: 1;
}

/* Headline */
.headline {
  font-family: var(--font-serif);
  font-size: var(--text-hero);
  font-weight: 300;
  font-style: italic;
  line-height: 1.1;
  margin-bottom: 2rem;
}
.dark .headline  { color: var(--color-cream); }
.light .headline { color: var(--color-indigo); }

/* Subheadline */
.subheadline {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.5vw, 1.3rem);
  font-weight: 300;
  line-height: 1.7;
  max-width: 620px;
  margin-bottom: 3rem;
}
.dark .subheadline  { color: rgba(245,239,224,0.55); }
.light .subheadline { color: rgba(27,31,75,0.6); }

/* Divider */
.divider { margin: 2rem 0 1.5rem; }

/* Secondary line */
.secondaryLine {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-style: italic;
  letter-spacing: 0.1em;
  margin-bottom: 3rem;
}
.dark .secondaryLine  { color: rgba(245,239,224,0.3); }
.light .secondaryLine { color: rgba(27,31,75,0.4); }

/* CTAs */
.ctas {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

/* Scroll indicator */
.scrollIndicator {
  position: absolute;
  bottom: 3rem; left: 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.scrollText {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(245,239,224,0.25);
}
.scrollLine {
  width: 1px; height: 50px;
  background: linear-gradient(to bottom, rgba(201,148,58,0.4), transparent);
  animation: scrollPulse 2.5s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 1; }
}

@media (max-width: 768px) {
  .hero { padding: 8rem 2rem 5rem; }
  .scrollIndicator { left: 2rem; }
}
```

**Usage example:**
```tsx
<Hero
  eyebrow="Our Story"
  headline={"We carry a name\nthat is 1,500 years old."}
  subheadline="And we take that seriously. Not as branding. As accountability."
  ctas={[
    { label: 'Read our story →', href: '/about' },
    { label: 'Our philosophy →', href: '/philosophy', variant: 'text' },
  ]}
  variant="dark"
/>
```

---

### 9. Interlude

Full-width dark section between content sections. The breath between ideas.

```tsx
// components/sections/Interlude.tsx
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './Interlude.module.css'

interface InterludeProps {
  quote: string             // Use \n for intentional line breaks
  accentWords?: string[]    // Words to highlight in gold
  subtext?: string          // Optional small supporting line below
  variant?: 'indigo' | 'forest'
}

export function Interlude({
  quote,
  accentWords = [],
  subtext,
  variant = 'indigo'
}: InterludeProps) {
  // Highlight accent words in gold
  const highlightedQuote = accentWords.reduce((text, word) => {
    return text.replace(word, `<em class="gold">${word}</em>`)
  }, quote)

  return (
    <div className={`${styles.interlude} ${styles[variant]}`}>
      <FadeIn className={styles.inner}>
        <blockquote
          className={styles.quote}
          dangerouslySetInnerHTML={{ __html: highlightedQuote.replace(/\n/g, '<br/>') }}
        />
        {subtext && <p className={styles.subtext}>{subtext}</p>}
      </FadeIn>
    </div>
  )
}
```

```css
/* Interlude.module.css */
.interlude {
  padding: 10rem 4rem;
  text-align: center;
}
.indigo { background: var(--color-indigo); }
.forest { background: var(--color-forest); }

.inner { max-width: 800px; margin: 0 auto; }

.quote {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 4rem);
  font-weight: 300;
  font-style: italic;
  color: var(--color-cream);
  line-height: 1.3;
  margin: 0;
  border: none;
  padding: 0;
}
.quote :global(.gold) {
  color: var(--color-gold);
  font-style: normal;
}

.subtext {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: rgba(245,239,224,0.4);
  margin-top: 2.5rem;
  font-style: italic;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .interlude { padding: 6rem 2rem; }
}
```

**Usage example:**
```tsx
<Interlude
  quote={"Everything is connected.\nWe invest accordingly."}
  accentWords={["We invest accordingly."]}
  subtext="Named after the university that lasted 700 years."
/>
```

---

### 10. SectionWrapper

Standard wrapper for all content sections. Handles padding, max-width, and background.

```tsx
// components/sections/SectionWrapper.tsx
import styles from './SectionWrapper.module.css'

interface SectionWrapperProps {
  children: React.ReactNode
  variant?: 'cream' | 'white' | 'indigo' | 'forest' | 'gold'
  id?: string
  className?: string
  narrow?: boolean    // 820px max-width for text-heavy sections
}

export function SectionWrapper({
  children,
  variant = 'cream',
  id,
  className,
  narrow = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${styles[variant]} ${className || ''}`}
    >
      <div className={`${styles.inner} ${narrow ? styles.narrow : ''}`}>
        {children}
      </div>
    </section>
  )
}
```

```css
/* SectionWrapper.module.css */
.section { padding: var(--space-32) var(--space-16); }

.cream  { background: var(--color-cream); }
.white  { background: #ffffff; }
.indigo { background: var(--color-indigo); }
.forest { background: var(--color-forest); }
.gold   { background: var(--color-gold); }

.inner {
  max-width: 1200px;
  margin: 0 auto;
}
.narrow {
  max-width: 820px;
}

@media (max-width: 768px) {
  .section { padding: var(--space-20) var(--space-8); }
}
```

---

### 11. SectionHeader

Eyebrow + H2 combination. Used at the top of most content sections.

```tsx
// components/sections/SectionHeader.tsx
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  eyebrow?: string
  headline: string          // Use \n for intentional line breaks
  subhead?: string
  align?: 'left' | 'center'
  variant?: 'dark' | 'light'
}

export function SectionHeader({
  eyebrow,
  headline,
  subhead,
  align = 'left',
  variant = 'light',
}: SectionHeaderProps) {
  const headlineLines = headline.split('\n')

  return (
    <FadeIn className={`${styles.header} ${styles[align]}`}>
      {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
      <h2 className={`${styles.headline} ${styles[variant]}`}>
        {headlineLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < headlineLines.length - 1 && <br />}
          </span>
        ))}
      </h2>
      {subhead && (
        <p className={`${styles.subhead} ${styles[variant]}`}>{subhead}</p>
      )}
    </FadeIn>
  )
}
```

```css
/* SectionHeader.module.css */
.header { margin-bottom: var(--space-16); }
.center { text-align: center; }
.left   { text-align: left; }

.headline {
  font-family: var(--font-serif);
  font-size: clamp(2.2rem, 4vw, 4rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}
.headline.light { color: var(--color-indigo); }
.headline.dark  { color: var(--color-cream); }

.subhead {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 300;
  line-height: 1.8;
  max-width: 640px;
}
.subhead.light { color: rgba(27,31,75,0.65); }
.subhead.dark  { color: rgba(245,239,224,0.55); }
.center .subhead { margin-left: auto; margin-right: auto; }
```

---

### 12. PhilosophyCard

Used on Home (philosophy tease) and Philosophy page.

```tsx
// components/sections/PhilosophyCard.tsx
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './PhilosophyCard.module.css'

interface PhilosophyCardProps {
  number: string          // "01", "02", "03"
  title: string
  quote?: string          // Italic pull quote at top of card
  body: string
  delay?: number
}

export function PhilosophyCard({
  number,
  title,
  quote,
  body,
  delay = 0
}: PhilosophyCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className={styles.card}>
        <span className={styles.number}>{number}</span>
        {quote && <p className={styles.quote}>{quote}</p>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
      </div>
    </FadeIn>
  )
}
```

```css
/* PhilosophyCard.module.css */
.card {
  padding: 2.5rem;
  border-top: 1px solid rgba(201,148,58,0.35);
  transition: border-color var(--transition-base);
}
.card:hover { border-top-color: var(--color-gold); }

.number {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--color-gold);
  margin-bottom: 1rem;
}
.quote {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--color-gold);
  margin-bottom: 0.8rem;
  opacity: 0.85;
}
.title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 400;
  font-style: italic;
  color: var(--color-indigo);
  margin-bottom: 0.8rem;
  line-height: 1.3;
}
.body {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  line-height: 1.85;
  color: var(--color-indigo);
  opacity: 0.65;
}
```

---

### 13. FocusAreaCard

Used on Ventures page and Home focus areas section.

```tsx
// components/sections/FocusAreaCard.tsx
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './FocusAreaCard.module.css'

interface FocusAreaCardProps {
  title: string
  body: string
  questions?: string[]    // "Example questions we ask"
  delay?: number
}

export function FocusAreaCard({
  title,
  body,
  questions = [],
  delay = 0
}: FocusAreaCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className={styles.card}>
        <div className={styles.accent} aria-hidden="true" />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
        {questions.length > 0 && (
          <div className={styles.questions}>
            <p className={styles.questionsLabel}>We ask:</p>
            <ul className={styles.questionsList}>
              {questions.map((q, i) => (
                <li key={i} className={styles.question}>{q}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </FadeIn>
  )
}
```

```css
/* FocusAreaCard.module.css */
.card {
  padding: 2.5rem;
  border: 1px solid var(--color-border-light);
  transition: var(--transition-base);
  background: transparent;
}
.card:hover {
  border-color: var(--color-gold);
  background: white;
}

.accent {
  width: 40px; height: 1px;
  background: var(--color-gold);
  margin-bottom: 1.8rem;
  opacity: 0.6;
}

.title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 400;
  font-style: italic;
  color: var(--color-indigo);
  margin-bottom: 1rem;
  line-height: 1.3;
}
.body {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  line-height: 1.85;
  color: var(--color-indigo);
  opacity: 0.65;
  margin-bottom: 1.5rem;
}

.questions { border-top: 0.5px solid var(--color-border-light); padding-top: 1.2rem; }
.questionsLabel {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 0.8rem;
}
.questionsList { list-style: none; padding: 0; margin: 0; }
.question {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-indigo);
  opacity: 0.55;
  padding: 0.4rem 0 0.4rem 1.2rem;
  border-bottom: 0.5px solid var(--color-border-light);
  position: relative;
}
.question::before {
  content: '—';
  position: absolute; left: 0;
  color: var(--color-gold);
  opacity: 0.6;
}
```

---

### 14. VentureCard

Portfolio company card. Used on Ventures page and Home portfolio tease.

```tsx
// components/sections/VentureCard.tsx
import { Tag } from '@/components/ui/Tag'
import { FadeIn } from '@/components/ui/FadeIn'
import Link from 'next/link'
import styles from './VentureCard.module.css'

interface VentureCardProps {
  name: string
  description: string           // One-line description
  stage: string                 // "Pre-seed" | "Seed" | "Series A"
  focusArea: string             // Tag label
  whatDrewUs?: string           // 2-3 sentences in Nalanda voice
  founderQuote?: string
  href?: string                 // Company URL (external)
  delay?: number
}

export function VentureCard({
  name,
  description,
  stage,
  focusArea,
  whatDrewUs,
  founderQuote,
  href,
  delay = 0
}: VentureCardProps) {
  const CardWrapper = href
    ? ({ children }: { children: React.ReactNode }) =>
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.card}>{children}</a>
    : ({ children }: { children: React.ReactNode }) =>
        <div className={styles.card}>{children}</div>

  return (
    <FadeIn delay={delay}>
      <CardWrapper>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.tags}>
            <Tag variant="gold">{focusArea}</Tag>
            <Tag variant="sage">{stage}</Tag>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        {whatDrewUs && (
          <p className={styles.whatDrewUs}>{whatDrewUs}</p>
        )}
        {founderQuote && (
          <blockquote className={styles.quote}>
            "{founderQuote}"
          </blockquote>
        )}
      </CardWrapper>
    </FadeIn>
  )
}
```

```css
/* VentureCard.module.css */
.card {
  display: block;
  padding: 2.5rem;
  background: white;
  border-top: 2px solid var(--color-gold);
  text-decoration: none;
  transition: var(--transition-base);
  color: inherit;
}
.card:hover { transform: translateY(-4px); }

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}
.name {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 400;
  font-style: italic;
  color: var(--color-indigo);
  line-height: 1.2;
}
.tags { display: flex; gap: 0.5rem; flex-wrap: wrap; flex-shrink: 0; }

.description {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--color-indigo);
  opacity: 0.7;
  line-height: 1.7;
  margin-bottom: 1rem;
}
.whatDrewUs {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  font-style: italic;
  color: var(--color-indigo);
  opacity: 0.55;
  line-height: 1.8;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 0.5px solid var(--color-border-light);
}
.quote {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  font-style: italic;
  color: var(--color-gold);
  opacity: 0.8;
  border-left: 2px solid var(--color-gold);
  padding-left: 1rem;
  margin: 0;
}
```

---

### 15. TeamCard

Team member card. Used on About page.

```tsx
// components/sections/TeamCard.tsx
import Image from 'next/image'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './TeamCard.module.css'

interface TeamCardProps {
  name: string
  role: string
  bio: string
  philosophyQuote?: string
  imageSrc?: string
  delay?: number
}

export function TeamCard({
  name,
  role,
  bio,
  philosophyQuote,
  imageSrc,
  delay = 0
}: TeamCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true" />
          )}
        </div>
        <div className={styles.content}>
          <p className={styles.role}>{role}</p>
          <h3 className={styles.name}>{name}</h3>
          <SectionDivider width="short" className={styles.divider} />
          <p className={styles.bio}>{bio}</p>
          {philosophyQuote && (
            <blockquote className={styles.quote}>
              "{philosophyQuote}"
            </blockquote>
          )}
        </div>
      </div>
    </FadeIn>
  )
}
```

```css
/* TeamCard.module.css */
.card {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  padding: 3rem 0;
  border-bottom: 1px solid var(--color-border-light);
}
.card:last-child { border-bottom: none; }

.imageWrapper {
  position: relative;
  height: 320px;
  overflow: hidden;
  background: var(--color-indigo);
}
.image { object-fit: cover; filter: grayscale(20%); }
.imagePlaceholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, var(--color-indigo), var(--color-forest));
}

.role {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 0.5rem;
}
.name {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 300;
  font-style: italic;
  color: var(--color-indigo);
  margin-bottom: 1rem;
}
.divider { margin-bottom: 1.5rem; }
.bio {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.85;
  color: var(--color-indigo);
  opacity: 0.7;
  margin-bottom: 1.5rem;
}
.quote {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-style: italic;
  color: var(--color-gold);
  opacity: 0.75;
  border: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 768px) {
  .card { grid-template-columns: 1fr; }
  .imageWrapper { height: 260px; }
}
```

---

### 16. JournalCard

Used on Journal index and tease sections.

```tsx
// components/sections/JournalCard.tsx
import Link from 'next/link'
import { Tag } from '@/components/ui/Tag'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './JournalCard.module.css'

interface JournalCardProps {
  slug: string
  title: string
  excerpt: string
  date: string              // ISO string
  readTime?: string         // "8 min read"
  category?: string
  issueNumber?: string      // "Essay No. 1"
  featured?: boolean
  delay?: number
}

export function JournalCard({
  slug,
  title,
  excerpt,
  date,
  readTime,
  category,
  issueNumber,
  featured = false,
  delay = 0
}: JournalCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <FadeIn delay={delay}>
      <Link
        href={`/journal/${slug}`}
        className={`${styles.card} ${featured ? styles.featured : ''}`}
      >
        <div className={styles.meta}>
          {issueNumber && <span className={styles.issue}>{issueNumber}</span>}
          {category && <Tag variant="gold">{category}</Tag>}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{formattedDate}</span>
          {readTime && <span className={styles.readTime}>{readTime}</span>}
          <span className={styles.cta}>Read →</span>
        </div>
      </Link>
    </FadeIn>
  )
}
```

```css
/* JournalCard.module.css */
.card {
  display: block;
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--color-border-light);
  text-decoration: none;
  transition: var(--transition-base);
}
.card:hover .title { color: var(--color-gold); }
.card:hover .cta   { border-bottom-color: var(--color-gold); }

.featured {
  padding: 3rem;
  background: var(--color-indigo);
  border: none;
  border-left: 2px solid var(--color-gold);
}
.featured .title   { color: var(--color-cream); }
.featured .excerpt { color: rgba(245,239,224,0.5); }
.featured .date,
.featured .readTime { color: rgba(245,239,224,0.3); }
.featured .cta     { color: var(--color-gold); }

.meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.issue {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gold);
  opacity: 0.7;
}
.title {
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 300;
  font-style: italic;
  color: var(--color-indigo);
  line-height: 1.3;
  margin-bottom: 1rem;
  transition: color var(--transition-base);
}
.excerpt {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  line-height: 1.85;
  color: var(--color-indigo);
  opacity: 0.6;
  margin-bottom: 1.5rem;
}
.footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.date, .readTime {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(27,31,75,0.35);
}
.cta {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--color-gold);
  border-bottom: 1px solid transparent;
  transition: var(--transition-base);
  margin-left: auto;
}
```

---

### 17. ImpactBar

Scrolling ticker of key statistics and proof points. Used on Home page.

```tsx
// components/sections/ImpactBar.tsx
import styles from './ImpactBar.module.css'

const stats = [
  { number: '1,500', label: 'years of proof' },
  { number: '700', label: 'years Nalanda lasted' },
  { number: '9M', label: 'manuscripts in the Dharmaganja' },
  { number: '10,000', label: 'students at peak' },
  { number: '1,000', label: 'year investment horizon' },
  { number: '427 CE', label: 'Nalanda founded' },
]

export function ImpactBar() {
  // Duplicate for seamless loop
  const items = [...stats, ...stats]

  return (
    <div className={styles.bar} aria-label="Key statistics">
      <div className={styles.track}>
        {items.map((stat, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.number}>{stat.number}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

```css
/* ImpactBar.module.css */
.bar {
  background: var(--color-indigo);
  border-top: 0.5px solid rgba(201,148,58,0.15);
  border-bottom: 0.5px solid rgba(201,148,58,0.15);
  overflow: hidden;
  padding: 1.2rem 0;
}
.track {
  display: flex;
  gap: 0;
  animation: scroll 30s linear infinite;
  width: max-content;
}
.track:hover { animation-play-state: paused; }

.item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 3rem;
  border-right: 0.5px solid rgba(201,148,58,0.15);
  white-space: nowrap;
}
.number {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--color-gold);
  font-weight: 300;
}
.label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245,239,224,0.35);
}

@keyframes scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

### 18. ContactForm

The connect page form. Uses Radix UI for accessibility primitives only.

```tsx
// components/forms/ContactForm.tsx
'use client'

import { useState, FormEvent } from 'react'
import styles from './ContactForm.module.css'

type ContactType = 'founder' | 'capital' | 'collaborator' | 'other'

interface FormState {
  name: string
  email: string
  organization: string
  type: ContactType | ''
  message: string
  referral: string
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', organization: '',
    type: '', message: '', referral: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Replace with your actual form endpoint
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.confirmation}>
        <p className={styles.confirmTitle}>We received your message.</p>
        <p className={styles.confirmBody}>
          We will read it carefully and respond if we sense genuine alignment.
          Thank you for taking the time to understand what we are building.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Name *</label>
          <input
            id="name" type="text" required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={styles.input}
            placeholder="Your name"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email *</label>
          <input
            id="email" type="email" required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className={styles.input}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="organization" className={styles.label}>Organization</label>
        <input
          id="organization" type="text"
          value={form.organization}
          onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
          className={styles.input}
          placeholder="Optional"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="type" className={styles.label}>I am reaching out as a *</label>
        <select
          id="type" required
          value={form.type}
          onChange={e => setForm(f => ({ ...f, type: e.target.value as ContactType }))}
          className={`${styles.input} ${styles.select}`}
        >
          <option value="" disabled>Select one</option>
          <option value="founder">Founder</option>
          <option value="capital">Capital Partner</option>
          <option value="collaborator">Collaborator</option>
          <option value="other">Something Else</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Tell us about your work and what you are looking for *
        </label>
        <textarea
          id="message" required rows={7}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={`${styles.input} ${styles.textarea}`}
          placeholder="We are not looking for a polished pitch. We are looking for genuine truth."
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="referral" className={styles.label}>How did you find us?</label>
        <input
          id="referral" type="text"
          value={form.referral}
          onChange={e => setForm(f => ({ ...f, referral: e.target.value }))}
          className={styles.input}
          placeholder="Optional"
        />
      </div>

      <div className={styles.footer}>
        <button
          type="submit"
          disabled={status === 'sending'}
          className={styles.submit}
        >
          {status === 'sending' ? 'Sending...' : 'Send →'}
        </button>
        <p className={styles.note}>
          We read every message personally. We respond to the ones where
          we sense genuine alignment — usually within two weeks.
        </p>
      </div>

      {status === 'error' && (
        <p className={styles.error}>
          Something went wrong. Please email us directly at
          hello@thenalandacollective.com
        </p>
      )}

    </form>
  )
}
```

```css
/* ContactForm.module.css */
.form { max-width: 680px; }

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.8rem; }

.label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(27,31,75,0.55);
}
.input {
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--color-indigo);
  background: white;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-base);
  padding: 0.85rem 1rem;
  transition: border-color var(--transition-base);
  width: 100%;
  appearance: none;
}
.input:focus {
  outline: none;
  border-color: var(--color-gold);
}
.input::placeholder {
  color: rgba(27,31,75,0.25);
  font-style: italic;
}
.select { cursor: pointer; }
.textarea { resize: vertical; min-height: 160px; line-height: 1.7; }

.footer {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 1rem;
}
.submit {
  flex-shrink: 0;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-indigo);
  background: transparent;
  border: 1px solid var(--color-indigo);
  padding: 1rem 2.5rem;
  border-radius: var(--radius-base);
  cursor: pointer;
  transition: var(--transition-base);
}
.submit:hover:not(:disabled) {
  background: var(--color-indigo);
  color: var(--color-gold);
}
.submit:disabled { opacity: 0.5; cursor: not-allowed; }

.note {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-style: italic;
  color: rgba(27,31,75,0.4);
  line-height: 1.7;
}
.error {
  font-family: var(--font-serif);
  font-size: 0.9rem;
  color: var(--color-terracotta);
  margin-top: 1rem;
  font-style: italic;
}

.confirmation { padding: 3rem 0; }
.confirmTitle {
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-style: italic;
  color: var(--color-indigo);
  margin-bottom: 1rem;
}
.confirmBody {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.85;
  color: var(--color-indigo);
  opacity: 0.65;
}

@media (max-width: 600px) {
  .row { grid-template-columns: 1fr; }
  .footer { flex-direction: column; }
}
```

---

---

## GRID PATTERNS

These are the standard grid layouts. Use them via CSS, not a grid library.

```css
/* In globals.css or a grid module */

/* Two column — philosophy cards, team, etc. */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Three column — focus areas, venture cards */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Two column asymmetric — text + cards (60/40) */
.grid-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
}
.grid-split-wide {
  grid-template-columns: 3fr 2fr;
}

/* Four column — approach steps */
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--color-border-light);
}
.grid-4 > * {
  padding: 3rem 2rem;
  border-right: 1px solid var(--color-border-light);
}
.grid-4 > *:last-child { border-right: none; }

/* Responsive breakpoints */
@media (max-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4,
  .grid-split,
  .grid-split-wide { grid-template-columns: 1fr; }
  .grid-split,
  .grid-split-wide { gap: 3rem; }
}
```

---

---

## COMPONENT GENERATION INSTRUCTIONS FOR CURSOR

When Cursor generates a new component for this project, it must:

1. **Check this file first** for the closest existing component pattern
2. **Extend, don't invent** — new components should feel like natural extensions of existing ones
3. **Use CSS Modules** — never inline styles except for dynamic values
4. **Use CSS custom properties** — never hardcode color hex values or font names
5. **Include TypeScript interfaces** — all props typed, no `any`
6. **Include FadeIn** on any content that should animate on scroll
7. **Preserve intentional line breaks** — `headline.split('\n')` pattern for H1s and display text
8. **Follow the voice rules** — CTA copy, eyebrow labels, and placeholder text must follow brand standards
9. **Test at mobile** — every component must have responsive rules
10. **No shadows, no white backgrounds, no rounded corners > 4px**

**When generating a new page section**, ask:
- Does a similar component already exist in this library?
- What is the background variant? (cream / indigo / forest / gold)
- Does it need a SectionHeader (eyebrow + H2)?
- Does it need FadeIn animation?
- Is there a grid pattern that fits, or does this need a custom layout?

---

*The Nalanda Collective — Component Library v1.0*
*Build with coherence. Everything is connected.*
