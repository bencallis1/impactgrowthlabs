# The Nalanda Collective — Component Library
### docs/components.md — v3.0
### Voice update: Challenge · Collaboration · Abundance as Operating System
### Playfair Display 900 · Manuscript + Nocturne · Inter for UI

---

## HOW TO USE THIS FILE

Every component in the system is defined here with TypeScript interfaces, CSS, and copy patterns. Cursor reads this file and .cursorrules before generating any component.

**The narrative context matters as much as the code.** Every component that renders copy must reflect one or more of the three brand pillars:
1. The challenges are real and require all of us
2. Collaboration and open knowledge are the strategy
3. Abundance as operating system

**Prompt pattern:**
```
Following .cursorrules and docs/components.md, build [ComponentName].
```

---

## GLOBALS (globals.css)

```css
:root {
  --parchment:       #EDEAE0;
  --parchment-d:     #E5E1D4;
  --ink:             #14120E;
  --ink-2:           #1e1b15;
  --amber:           #B8832A;
  --nocturne:        #080810;
  --nocturne-2:      #0d0d1c;
  --gold:            #C9943A;
  --cream:           #F5EFE0;
  --border:          rgba(20,18,14,.12);
  --border-dark:     rgba(20,18,14,.22);
  --text-body:       rgba(20,18,14,.45);
  --text-muted:      rgba(20,18,14,.28);
  --text-body-dark:  rgba(245,239,224,.32);
  --text-muted-dark: rgba(245,239,224,.18);
  --serif:           'Playfair Display', Georgia, serif;
  --sans:            'Inter', system-ui, sans-serif;
  --section-y:       7rem;
  --section-x:       5rem;
  --interlude-y:     11rem;
  --card-pad:        2.8rem;
  --transition:      0.25s ease;
  --transition-slow: 0.75s ease;
}
@media (max-width: 768px) {
  :root { --section-y: 5rem; --section-x: 2rem; --interlude-y: 6rem; }
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--parchment); color: var(--ink); font-family: var(--sans); -webkit-font-smoothing: antialiased; }
img, video { max-width: 100%; display: block; }
button { font-family: inherit; }

.placeholder {
  background: rgba(184,131,42,.06);
  border: 1px dashed rgba(184,131,42,.35);
  color: var(--amber); font-family: var(--sans);
  font-size: 0.72rem; letter-spacing: 0.1em;
  padding: 2rem; display: flex;
  align-items: center; justify-content: center;
  min-height: 200px; text-align: center;
}
```

---

---

## FOUNDATION COMPONENTS

---

### 1. EyebrowLabel

```tsx
// components/ui/EyebrowLabel.tsx
interface EyebrowLabelProps {
  children: React.ReactNode
  variant?: 'light' | 'dark'
  className?: string
}
export function EyebrowLabel({ children, variant = 'light', className }: EyebrowLabelProps) {
  return <span className={`eyebrow eyebrow--${variant} ${className ?? ''}`}>{children}</span>
}
```

```css
.eyebrow { display: block; font-family: var(--sans); font-size: 0.62rem; font-weight: 400; letter-spacing: 0.42em; text-transform: uppercase; margin-bottom: 2rem; color: var(--amber); }
.eyebrow--dark { color: rgba(201,148,58,.6); }
```

---

### 2. FadeIn

The only animation in the system. IntersectionObserver, no library.

```tsx
// components/ui/FadeIn.tsx
'use client'
import { useEffect, useRef, ReactNode } from 'react'
import styles from './FadeIn.module.css'

interface FadeInProps {
  children: ReactNode
  delay?: number
  threshold?: number
  className?: string
}

export function FadeIn({ children, delay = 0, threshold = 0.12, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add(styles.visible), delay)
        obs.unobserve(entry.target)
      }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, threshold])
  return <div ref={ref} className={`${styles.fadeIn} ${className ?? ''}`}>{children}</div>
}
```

```css
/* FadeIn.module.css */
.fadeIn { opacity: 0; transform: translateY(24px); transition: opacity var(--transition-slow), transform var(--transition-slow); }
.fadeIn.visible { opacity: 1; transform: translateY(0); }
```

---

### 3. Button

```tsx
// components/ui/Button.tsx
import Link from 'next/link'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'primary-dark' | 'text'
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({ children, href, onClick, variant = 'primary', type = 'button', disabled, className }: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant.replace('-','_')]} ${className ?? ''}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>
}
```

```css
/* Button.module.css */
.btn { display: inline-flex; align-items: center; font-family: var(--sans); font-size: 0.72rem; font-weight: 400; letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none; cursor: pointer; white-space: nowrap; border: none; border-radius: 0; transition: background var(--transition), opacity var(--transition); }
.btn:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
.primary { padding: 1.05rem 2.4rem; color: var(--parchment); background: var(--ink); }
.primary:hover:not(:disabled) { background: var(--amber); }
.primary_dark { padding: 1.05rem 2.4rem; color: var(--nocturne); background: var(--gold); }
.primary_dark:hover:not(:disabled) { opacity: 0.82; }
.primary_dark:focus-visible { outline-color: var(--gold); }
.text { padding: 0 0 3px; color: var(--amber); background: transparent; font-size: 0.7rem; border-bottom: 1px solid rgba(184,131,42,.35); }
.text:hover { border-bottom-color: var(--amber); }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }
```

---

### 4. Tag

```tsx
// components/ui/Tag.tsx
import styles from './Tag.module.css'
interface TagProps { children: React.ReactNode; variant?: 'light' | 'dark' }
export function Tag({ children, variant = 'light' }: TagProps) {
  return <span className={`${styles.tag} ${styles[variant]}`}>{children}</span>
}
```

```css
.tag { display: inline-block; font-family: var(--sans); font-size: 0.56rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; padding: 0.22rem 0.65rem; border-radius: 0; }
.light { color: var(--amber); border: 1px solid rgba(184,131,42,.3); }
.dark { color: var(--gold); border: 1px solid rgba(201,148,58,.25); }
```

---

---

## LAYOUT COMPONENTS

---

### 5. Nav

```tsx
// components/layout/Nav.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Studio', href: '/studio' },
  { label: 'Journal', href: '/journal' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>The Nalanda Collective</Link>
        <ul className={styles.links} role="list">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={`${styles.link} ${pathname.startsWith(l.href) ? styles.active : ''}`}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/connect" className={styles.cta}>Connect →</Link>
        <button className={styles.burger} onClick={() => setOpen(o => !o)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>
          <span /><span /><span />
        </button>
      </nav>
      {open && (
        <div className={styles.mobile} role="dialog" aria-label="Site navigation">
          <button className={styles.mobileClose} onClick={() => setOpen(false)} aria-label="Close">✕</button>
          <ul role="list">
            {LINKS.map(l => <li key={l.href}><Link href={l.href} className={styles.mobileLink}>{l.label}</Link></li>)}
            <li><Link href="/connect" className={styles.mobileCta}>Connect →</Link></li>
          </ul>
        </div>
      )}
    </>
  )
}
```

```css
/* Nav.module.css */
.nav { position: sticky; top: 0; z-index: 100; background: var(--parchment); display: flex; justify-content: space-between; align-items: center; padding: 1.6rem 5rem; border-bottom: 2px solid var(--ink); }
.logo { font-family: var(--serif); font-size: 1rem; font-weight: 700; color: var(--ink); text-decoration: none; letter-spacing: 0.04em; }
.links { display: flex; gap: 2.5rem; list-style: none; }
.link { font-family: var(--sans); font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(20,18,14,.4); text-decoration: none; transition: color var(--transition); }
.link:hover, .link.active { color: var(--ink); }
.cta { font-family: var(--sans); font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); text-decoration: none; border-bottom: 1px solid var(--amber); padding-bottom: 2px; }
.burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.burger span { display: block; width: 22px; height: 2px; background: var(--ink); }
.mobile { position: fixed; inset: 0; z-index: 200; background: var(--ink); display: flex; align-items: center; justify-content: center; }
.mobileClose { position: absolute; top: 2rem; right: 2.5rem; background: none; border: none; cursor: pointer; font-size: 1.2rem; color: rgba(245,239,224,.4); transition: color var(--transition); }
.mobileClose:hover { color: var(--gold); }
.mobile ul { list-style: none; text-align: center; }
.mobile li { margin-bottom: 2rem; }
.mobileLink { font-family: var(--serif); font-size: clamp(2.2rem, 6vw, 3.2rem); font-weight: 700; color: var(--cream); text-decoration: none; transition: color var(--transition); }
.mobileLink:hover { color: var(--gold); }
.mobileCta { font-family: var(--sans); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); text-decoration: none; border-bottom: 1px solid rgba(201,148,58,.4); padding-bottom: 2px; }
@media (max-width: 900px) { .nav { padding: 1.4rem 2rem; } .links, .cta { display: none; } .burger { display: flex; } }
```

---

### 6. Footer

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'
import styles from './Footer.module.css'

const NAV_LINKS = ['Home','About','Philosophy','Ventures','Studio','Journal','Connect']

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.logo}>The Nalanda Collective</p>
          <p className={styles.guided}>Guided by Maitri</p>
          <div className={styles.divider} />
          <p className={styles.tagline}>Everything is connected.<br />We invest accordingly.</p>
          <div className={styles.social}>
            {['LinkedIn','Instagram','X'].map(s => <a key={s} href="#" className={styles.socialLink}>{s}</a>)}
          </div>
        </div>
        <div>
          <span className={styles.colLabel}>Navigate</span>
          <ul className={styles.colLinks}>
            {NAV_LINKS.map(l => <li key={l}><Link href={`/${l === 'Home' ? '' : l.toLowerCase()}`} className={styles.link}>{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <span className={styles.colLabel}>Connect</span>
          <ul className={styles.colLinks}>
            <li><Link href="/connect?type=founder" className={styles.link}>For founders →</Link></li>
            <li><Link href="/connect?type=capital" className={styles.link}>For capital partners →</Link></li>
            <li><Link href="/connect?type=collaborator" className={styles.link}>For collaborators →</Link></li>
            <li className={styles.email}><a href="mailto:hello@thenalandacollective.com" className={styles.link}>hello@thenalandacollective.com</a></li>
          </ul>
        </div>
        <div>
          <span className={styles.colLabel}>Legal</span>
          <ul className={styles.colLinks}>
            <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
            <li><Link href="/terms" className={styles.link}>Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.copy}>© {new Date().getFullYear()} The Nalanda Collective. Guided by Maitri.</span>
        <div className={styles.legal}>
          <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
          <Link href="/terms" className={styles.legalLink}>Terms</Link>
        </div>
      </div>
    </footer>
  )
}
```

```css
/* Footer.module.css */
.footer { background: var(--ink); padding: 6rem 5rem 3.5rem; }
.inner { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 3.5rem; padding-bottom: 4rem; border-bottom: 1px solid rgba(245,239,224,.07); }
.logo { font-family: var(--serif); font-size: 1.15rem; font-weight: 700; color: var(--cream); margin-bottom: 0.4rem; }
.guided { font-family: var(--sans); font-size: 0.75rem; color: var(--gold); opacity: 0.55; font-style: italic; margin-bottom: 1.5rem; }
.divider { width: 48px; height: 1px; background: var(--gold); opacity: 0.2; margin-bottom: 1.5rem; }
.tagline { font-family: var(--serif); font-size: 0.9rem; line-height: 1.8; color: rgba(245,239,224,.18); font-style: italic; margin-bottom: 2rem; }
.social { display: flex; gap: 1.5rem; }
.socialLink { font-family: var(--sans); font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,239,224,.25); text-decoration: none; transition: color var(--transition); }
.socialLink:hover { color: var(--gold); }
.colLabel { font-family: var(--sans); font-size: 0.58rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); opacity: 0.5; margin-bottom: 1.8rem; display: block; }
.colLinks { list-style: none; }
.colLinks li { margin-bottom: 0.8rem; }
.email { margin-top: 1rem !important; }
.link { font-family: var(--sans); font-size: 0.78rem; color: rgba(245,239,224,.28); text-decoration: none; letter-spacing: 0.04em; transition: color var(--transition); }
.link:hover { color: var(--gold); }
.bottom { padding-top: 2.5rem; display: flex; justify-content: space-between; align-items: center; }
.copy { font-family: var(--sans); font-size: 0.62rem; letter-spacing: 0.12em; color: rgba(245,239,224,.15); }
.legal { display: flex; gap: 2rem; }
.legalLink { font-family: var(--sans); font-size: 0.62rem; letter-spacing: 0.1em; color: rgba(245,239,224,.15); text-decoration: none; transition: color var(--transition); }
.legalLink:hover { color: rgba(245,239,224,.4); }
@media (max-width: 900px) { .footer { padding: 5rem 2rem 3rem; } .inner { grid-template-columns: 1fr 1fr; gap: 3rem; } }
@media (max-width: 600px) { .inner { grid-template-columns: 1fr; } .bottom { flex-direction: column; gap: 1rem; } }
```

---

---

## PAGE SECTION COMPONENTS

---

### 7. Hero

Two-column split. Headline left, body + CTA right. Min 90vh.

**Copy guidance:** The subheadline is where Pillars 1 and 2 first appear. It names the challenge, names the response, and extends an invitation — in that order.

```tsx
// components/sections/Hero.tsx
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './Hero.module.css'

interface HeroProps {
  eyebrow?: string
  headline: React.ReactNode
  subheadline: string
  bodyCopy?: string
  primaryCta: { label: string; href: string }
}

export function Hero({ eyebrow, headline, subheadline, bodyCopy, primaryCta }: HeroProps) {
  return (
    <section className={styles.hero}>
      <FadeIn className={styles.left}>
        {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
        <h1 className={styles.headline}>{headline}</h1>
      </FadeIn>
      <FadeIn delay={150} className={styles.right}>
        <p className={styles.sub}>{subheadline}</p>
        <Button href={primaryCta.href} variant="primary">{primaryCta.label}</Button>
        {bodyCopy && <p className={styles.body}>{bodyCopy}</p>}
        <span className={styles.scroll} aria-hidden="true">Scroll</span>
      </FadeIn>
    </section>
  )
}
```

**Default copy:**
```tsx
<Hero
  eyebrow="The Nalanda Collective · est. 427 CE"
  headline={<>Every<span className={styles.accent}>thing</span><br/>is con<span className={styles.accent}>nect</span><br/>ed.</>}
  subheadline="The challenges facing people and the living world are serious, interconnected, and urgent. So are the solutions — and the people building them. We back those founders with capital, open knowledge, and the deep conviction that we are more capable together than apart."
  primaryCta={{ label: 'Explore our work →', href: '/ventures' }}
  bodyCopy="Named after Nalanda University — founded 427 CE in Bihar, India. The greatest gathering of minds the world had ever seen. It lasted 700 years on the logic of open knowledge and shared purpose."
/>
```

```css
/* Hero.module.css */
.hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 90vh; border-bottom: 2px solid var(--ink); }
.left { padding: 5rem; border-right: 1px solid var(--border-dark); display: flex; flex-direction: column; justify-content: flex-end; }
.headline { font-family: var(--serif); font-size: clamp(4.5rem, 8.5vw, 9.5rem); font-weight: 900; line-height: 0.88; letter-spacing: -0.035em; color: var(--ink); }
.accent { color: var(--amber); }
.right { padding: 5rem; display: flex; flex-direction: column; justify-content: flex-end; gap: 2.5rem; }
.sub { font-family: var(--serif); font-size: 1.2rem; line-height: 1.75; color: rgba(20,18,14,.52); }
.body { font-family: var(--sans); font-size: 0.78rem; line-height: 1.85; color: var(--text-muted); font-weight: 300; }
.scroll { font-family: var(--sans); font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(20,18,14,.22); display: flex; align-items: center; gap: 1rem; }
.scroll::after { content: ''; width: 50px; height: 1px; background: rgba(20,18,14,.2); }
@media (max-width: 900px) { .hero { grid-template-columns: 1fr; min-height: auto; } .left { padding: 4rem 2rem 3rem; border-right: none; border-bottom: 1px solid var(--border-dark); } .right { padding: 3rem 2rem 4rem; } }
```

---

### 8. ProofBar

**Copy guidance:** These numbers are not vanity metrics. They are evidence that abundance and open knowledge create durable institutions. Annotate at least one with its significance.

```tsx
// components/sections/ProofBar.tsx
import styles from './ProofBar.module.css'

interface ProofItem { number: string; label: string }
interface ProofBarProps { items?: ProofItem[]; variant?: 'light' | 'dark' }

export const NALANDA_PROOF: ProofItem[] = [
  { number: '700',     label: 'years — longer than most empires' },
  { number: '10,000',  label: 'students at peak' },
  { number: '9M',      label: 'manuscripts, freely available to all' },
  { number: '427 CE',  label: 'founded in Bihar, India' },
  { number: '1,000yr', label: 'investment horizon' },
]

export function ProofBar({ items = NALANDA_PROOF, variant = 'light' }: ProofBarProps) {
  return (
    <div className={`${styles.bar} ${styles[variant]}`} role="list" aria-label="Nalanda proof points">
      {items.map((item, i) => (
        <div key={i} className={styles.item} role="listitem">
          <div className={styles.num}>{item.number}</div>
          <div className={styles.label}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}
```

```css
/* ProofBar.module.css */
.bar { display: grid; grid-template-columns: repeat(5, 1fr); }
.light { border-bottom: 2px solid var(--ink); }
.dark { border-bottom: 1px solid rgba(201,148,58,.1); }
.item { padding: 2.2rem 2.5rem; border-right: 1px solid var(--border-dark); }
.dark .item { border-right-color: rgba(201,148,58,.08); }
.item:last-child { border-right: none; }
.num { font-family: var(--serif); font-size: 2.6rem; font-weight: 900; line-height: 1; margin-bottom: 0.35rem; letter-spacing: -0.025em; }
.light .num { color: var(--amber); }
.dark .num { color: var(--gold); }
.label { font-family: var(--sans); font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; }
.light .label { color: var(--text-muted); }
.dark .label { color: var(--text-muted-dark); }
@media (max-width: 768px) { .bar { grid-template-columns: repeat(3, 1fr); } .item:nth-child(3) { border-right: none; } .item:nth-child(n+4) { border-top: 1px solid var(--border-dark); } }
```

---

### 9. EditorialBlock

**Copy guidance:** This is where Pillars 1 + 2 land at full depth. Reads like the opening of a serious essay. Structure: challenge → failure mode → Nalanda proof → declaration.

```tsx
// components/sections/EditorialBlock.tsx
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './EditorialBlock.module.css'

interface EditorialBlockProps {
  eyebrow?: string
  text: React.ReactNode
  variant?: 'light' | 'dark'
}

export function EditorialBlock({ eyebrow, text, variant = 'light' }: EditorialBlockProps) {
  return (
    <section className={`${styles.block} ${styles[variant]}`}>
      {eyebrow && <div className={styles.labelCol}><EyebrowLabel variant={variant}>{eyebrow}</EyebrowLabel></div>}
      <FadeIn><p className={styles.text}>{text}</p></FadeIn>
    </section>
  )
}
```

**Default copy:**
```tsx
<EditorialBlock
  eyebrow="Why Nalanda"
  text={<>
    The pace of ecological breakdown is outrunning the pace of capital deployed into solutions.
    This is not inevitable. It is a <em>coordination problem</em> — and the fragmentation of effort,
    capital, and knowledge among the people working on it makes it worse. In 427 CE, a university
    was founded in Bihar that offered a different model: open knowledge, genuine collaboration,
    no intellectual walls. For <em>700 years</em>, it held. We named our studio after it.
    Not as a metaphor. As a commitment.
  </>}
/>
```

```css
/* EditorialBlock.module.css */
.block { padding: var(--section-y) var(--section-x); display: grid; grid-template-columns: 240px 1fr; gap: 5rem; align-items: start; border-bottom: 1px solid var(--border); }
.labelCol { padding-top: 0.5rem; }
.text { font-family: var(--serif); font-size: clamp(1.9rem, 3.2vw, 3rem); font-weight: 700; line-height: 1.18; letter-spacing: -0.02em; }
.light .text { color: var(--ink); }
.dark .text { color: var(--cream); }
.light .text :global(em) { color: var(--amber); font-style: normal; }
.dark .text :global(em) { color: var(--gold); font-style: normal; }
@media (max-width: 900px) { .block { grid-template-columns: 1fr; gap: 2rem; } }
```

---

### 10. Interlude ← NOCTURNE SECTION

**Copy guidance:** Short. Declarative. Timeless. Each quote should carry one of the three pillars at its most distilled. The accent word or phrase in gold is always the pivot — the moment the sentence turns from observation to conviction.

```tsx
// components/sections/Interlude.tsx
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './Interlude.module.css'

interface InterludeProps {
  quote: React.ReactNode
  subtitle?: string
}

export function Interlude({ quote, subtitle }: InterludeProps) {
  return (
    <div className={styles.interlude}>
      <FadeIn>
        <blockquote className={styles.quote}>{quote}</blockquote>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </FadeIn>
    </div>
  )
}
```

**Approved quotes (use these, do not invent new ones without brand review):**
```tsx
// Option A — Founding principle
<Interlude
  quote={<>Knowledge — and capital — deployed with <span className={styles.accent}>genuine loving kindness</span> compounds across centuries.</>}
  subtitle="The Nalanda Collective · Founding Principle"
/>

// Option B — On open knowledge
<Interlude
  quote={<>The old university had <span className={styles.accent}>no paywalls.</span> Neither does our network.</>}
  subtitle="The Nalanda Collective"
/>

// Option C — On collaboration
<Interlude
  quote={<>Collaboration is not a strategy for second place. It is <span className={styles.accent}>how durable institutions are built.</span></>}
  subtitle="The Nalanda Collective"
/>

// Option D — On abundance
<Interlude
  quote={<>We are not competing for a fixed pool of success. We are <span className={styles.accent}>building a larger one.</span></>}
  subtitle="The Nalanda Collective"
/>

// Option E — On the challenges
<Interlude
  quote={<>The challenges are serious. So is the <span className={styles.accent}>collective intelligence</span> of the people working on them.</>}
  subtitle="The Nalanda Collective"
/>
```

```css
/* Interlude.module.css */
.interlude { background: var(--nocturne); padding: var(--interlude-y) var(--section-x); position: relative; overflow: hidden; }
.interlude::before { content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%); width: 900px; height: 900px; background: radial-gradient(circle, rgba(201,148,58,.07) 0%, transparent 58%); pointer-events: none; }
.interlude::after { content: ''; position: absolute; bottom: -300px; right: -200px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(42,74,48,.10) 0%, transparent 60%); pointer-events: none; }
.quote { font-family: var(--serif); font-size: clamp(2.4rem, 5.5vw, 6rem); font-weight: 900; line-height: 0.92; letter-spacing: -0.035em; color: var(--cream); max-width: 1000px; position: relative; border: none; padding: 0; }
.accent { color: var(--gold); }
.subtitle { font-family: var(--sans); font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--text-muted-dark); margin-top: 3rem; position: relative; }
```

---

### 11. PhilosophySection ← NOCTURNE SECTION

**Copy guidance:** Each of the three cards must connect its philosophical framework directly to the collaboration / abundance stance. The philosophy is not decorative — it is the explanation for why the brand behaves the way it does.

```tsx
// components/sections/PhilosophySection.tsx
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './PhilosophySection.module.css'

interface PhilCard { number: string; stream: string; headline: string; body: string }

// Copy is canonical — do not change without brand review
const CARDS: PhilCard[] = [
  {
    number: '01',
    stream: 'Hermetic Wisdom',
    headline: 'As above, so below.',
    body: 'You cannot extract value from one part of a system without affecting the whole. Investment is not separate from the ecology it touches, the community it lands in, or the culture it funds. We evaluate capital decisions the same way we evaluate integrity — as a single coherent whole.',
  },
  {
    number: '02',
    stream: 'Quantum Coherence',
    headline: 'Everything is entangled.',
    body: 'Quantum physics teaches that entangled systems cannot be understood in isolation. When any node in a network succeeds, the whole field shifts. This is why we invest in the success of the entire ecosystem — not just our portfolio. A rising tide is not a metaphor. It is a mechanism.',
  },
  {
    number: '03',
    stream: 'Power vs Force',
    headline: 'Scarcity exhausts. Abundance compounds.',
    body: "Scarcity logic is force — it requires constant effort, creates resistance, and erodes what it touches. Abundance logic is power — self-sustaining, generative, and durable across time. Nalanda lasted 700 years on this understanding. We are building on the same foundation.",
  },
]

export function PhilosophySection() {
  return (
    <section className={styles.section}>
      <FadeIn className={styles.header}>
        <EyebrowLabel variant="dark">Our Philosophy</EyebrowLabel>
        <h2 className={styles.headline}>Three streams.<br />One coherent whole.</h2>
        <p className={styles.intro}>Three philosophical lenses — not as rules, but as a way of seeing. Every decision we make runs through all three.</p>
      </FadeIn>
      <div className={styles.grid}>
        {CARDS.map((card, i) => (
          <FadeIn key={card.number} delay={i * 100} className={styles.card}>
            <span className={styles.num}>{card.number}</span>
            <p className={styles.stream}>{card.stream}</p>
            <h3 className={styles.cardHead}>{card.headline}</h3>
            <p className={styles.body}>{card.body}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
```

```css
/* PhilosophySection.module.css */
.section { background: var(--nocturne-2); padding: var(--section-y) var(--section-x); position: relative; overflow: hidden; }
.section::before { content: ''; position: absolute; top: -100px; right: -100px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(201,148,58,.055) 0%, transparent 60%); pointer-events: none; }
.header { text-align: center; margin-bottom: 5rem; position: relative; }
.headline { font-family: var(--serif); font-size: clamp(2.2rem, 3.5vw, 3.2rem); font-weight: 900; letter-spacing: -0.025em; color: var(--cream); line-height: 1; margin-bottom: 1.2rem; }
.intro { font-family: var(--sans); font-size: 0.88rem; line-height: 1.8; color: var(--text-body-dark); max-width: 480px; margin: 0 auto; font-weight: 300; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(201,148,58,.08); position: relative; }
.card { background: var(--nocturne-2); padding: 3.5rem 3rem; transition: background var(--transition); }
.card:hover { background: rgba(13,13,28,.95); }
.num { font-family: var(--sans); font-size: 0.58rem; letter-spacing: 0.3em; color: var(--gold); opacity: 0.5; margin-bottom: 1.5rem; display: block; }
.stream { font-family: var(--serif); font-size: 0.82rem; font-weight: 700; color: var(--gold); margin-bottom: 0.8rem; letter-spacing: 0.04em; text-transform: uppercase; }
.cardHead { font-family: var(--serif); font-size: 1.6rem; font-weight: 900; color: var(--cream); margin-bottom: 1rem; line-height: 1.1; letter-spacing: -0.02em; }
.body { font-family: var(--sans); font-size: 0.82rem; line-height: 1.85; color: var(--text-body-dark); font-weight: 300; }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
```

---

### 12. PracticeCard

```tsx
// components/cards/PracticeCard.tsx
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './PracticeCard.module.css'

interface PracticeCardProps { number: string; headline: string; body: string; delay?: number }

// Canonical copy — do not change without brand review
export const PRACTICE_CARDS = [
  {
    number: '01 — Venture',
    headline: 'Capital as a living system.',
    body: 'Early-stage investment guided by Maitri, long-horizon thinking, and genuine mission-method coherence. We go in early, stay involved across the full arc, and share what we learn openly with the whole ecosystem.',
  },
  {
    number: '02 — Studio',
    headline: 'Your story is your strategy.',
    body: 'We co-create ventures from the ground up — embedding Maitri as the operating philosophy from day one. Culture, narrative, brand, and capital as one coherent whole, built in genuine collaboration.',
  },
  {
    number: '03 — Advisory',
    headline: 'Thinking partners for the long arc.',
    body: 'Genuine counsel — not consulting — for founders navigating capital, consciousness, and long-horizon impact. We hold our knowledge lightly and share it freely. What works should travel.',
  },
]

export function PracticeCard({ number, headline, body, delay = 0 }: PracticeCardProps) {
  return (
    <FadeIn delay={delay}>
      <article className={styles.card}>
        <span className={styles.num}>{number}</span>
        <h3 className={styles.headline}>{headline}</h3>
        <p className={styles.body}>{body}</p>
      </article>
    </FadeIn>
  )
}
```

```css
/* PracticeCard.module.css */
.card { border-top: 2px solid var(--ink); padding-top: 2rem; transition: border-color var(--transition); }
.card:hover { border-top-color: var(--amber); }
.num { font-family: var(--sans); font-size: 0.58rem; letter-spacing: 0.3em; color: rgba(20,18,14,.25); margin-bottom: 1.2rem; display: block; }
.headline { font-family: var(--serif); font-size: 1.5rem; font-weight: 700; color: var(--ink); margin-bottom: 0.8rem; line-height: 1.12; letter-spacing: -0.015em; }
.body { font-family: var(--sans); font-size: 0.85rem; line-height: 1.85; color: var(--text-body); font-weight: 300; }
```

---

### 13. ConnectPaths

**Copy guidance:** The invitation must be expansive — not just to capital-seeking founders, but to everyone in the ecosystem. The framing is abundance: there is room, bring what you know.

```tsx
// components/sections/ConnectPaths.tsx
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './ConnectPaths.module.css'

const PATHS = [
  { label: 'For founders', headline: 'Tell us about your work', href: '/connect?type=founder' },
  { label: 'For capital partners', headline: 'Explore co-investment', href: '/connect?type=capital' },
  { label: 'For collaborators', headline: 'Join the collective', href: '/connect?type=collaborator' },
]

export function ConnectPaths() {
  return (
    <section className={styles.section}>
      <FadeIn className={styles.left}>
        <EyebrowLabel>Begin the conversation</EyebrowLabel>
        <h2 className={styles.headline}>
          Building something that matters for{' '}
          <span className={styles.accent}>all living things?</span>
        </h2>
        <p className={styles.body}>
          Whether you are building, investing, advising, researching, or simply paying close attention —
          if the work of creating a thriving planet for all living things is your work too, we want to know you.
          Bring what you know. There is room.
        </p>
        <Button href="/connect" variant="primary">Begin the conversation →</Button>
      </FadeIn>
      <div className={styles.right}>
        {PATHS.map(path => (
          <a key={path.href} href={path.href} className={styles.path}>
            <div>
              <span className={styles.pathLabel}>{path.label}</span>
              <h3 className={styles.pathHead}>{path.headline}</h3>
            </div>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
```

```css
/* ConnectPaths.module.css */
.section { display: grid; grid-template-columns: 1fr 1fr; border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); }
.left { padding: 6rem 5rem; border-right: 1px solid var(--border-dark); }
.headline { font-family: var(--serif); font-size: clamp(2.5rem, 4.5vw, 4.5rem); font-weight: 900; letter-spacing: -0.03em; color: var(--ink); line-height: 0.95; margin-bottom: 2rem; }
.accent { color: var(--amber); }
.body { font-family: var(--sans); font-size: 0.88rem; line-height: 1.85; color: var(--text-body); font-weight: 300; max-width: 420px; margin-bottom: 3rem; }
.right { display: flex; flex-direction: column; }
.path { padding: 2.5rem 5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: inherit; transition: background var(--transition); }
.path:last-child { border-bottom: none; }
.path:hover { background: rgba(20,18,14,.02); }
.path:hover .arrow { color: var(--amber); }
.pathLabel { font-family: var(--sans); font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(20,18,14,.3); margin-bottom: 0.5rem; display: block; }
.pathHead { font-family: var(--serif); font-size: 1.4rem; font-weight: 700; color: var(--ink); letter-spacing: -0.01em; }
.arrow { font-size: 1.4rem; color: rgba(20,18,14,.2); transition: color var(--transition); }
@media (max-width: 900px) { .section { grid-template-columns: 1fr; } .left { padding: 4rem 2rem; } .path { padding: 2rem; } }
```

---

### 14. JournalCard

```tsx
// components/cards/JournalCard.tsx
import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'
import styles from './JournalCard.module.css'

interface JournalCardProps {
  slug: string; issueLabel: string; headline: string
  excerpt: string; date: string; readTime?: string
  variant?: 'featured' | 'standard'; delay?: number
}

export function JournalCard({ slug, issueLabel, headline, excerpt, date, readTime, variant = 'standard', delay = 0 }: JournalCardProps) {
  const formatted = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  return (
    <FadeIn delay={delay}>
      <Link href={`/journal/${slug}`} className={`${styles.card} ${styles[variant]}`}>
        <span className={styles.issue}>{issueLabel}</span>
        <h3 className={styles.headline}>{headline}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.meta}>
          <span>{formatted}{readTime ? ` · ${readTime}` : ''}</span>
          <span className={styles.cta}>Read →</span>
        </div>
      </Link>
    </FadeIn>
  )
}
```

```css
/* JournalCard.module.css */
.card { display: block; text-decoration: none; color: inherit; transition: opacity var(--transition); }
.card:hover { opacity: 0.75; }
.featured { padding: 3rem 3rem 3rem 0; border-right: 1px solid var(--border-dark); }
.featured .headline { font-size: clamp(1.8rem, 3vw, 2.6rem); letter-spacing: -0.025em; }
.standard { padding: 2.5rem 0 2.5rem 3rem; border-bottom: 1px solid var(--border); }
.standard:last-child { border-bottom: none; }
.standard .headline { font-size: 1.1rem; }
.issue { font-family: var(--sans); font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--amber); margin-bottom: 1.2rem; display: block; }
.headline { font-family: var(--serif); font-weight: 700; color: var(--ink); margin-bottom: 0.8rem; line-height: 1.12; }
.excerpt { font-family: var(--sans); font-size: 0.85rem; line-height: 1.85; color: var(--text-body); font-weight: 300; margin-bottom: 1.5rem; }
.meta { display: flex; justify-content: space-between; font-family: var(--sans); font-size: 0.65rem; letter-spacing: 0.1em; color: var(--text-muted); }
.cta { color: var(--amber); }
```

---

### 15. ContactForm

```tsx
// components/forms/ContactForm.tsx
'use client'
import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import styles from './ContactForm.module.css'

type ContactType = 'founder' | 'capital' | 'collaborator' | 'other' | ''
type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', organization:'', type:'' as ContactType, message:'', referral:'' })
  const [status, setStatus] = useState<Status>('idle')
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({...f, [k]: e.target.value}))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch { setStatus('error') }
  }

  if (status === 'sent') return (
    <div className={styles.confirmation}>
      <p className={styles.confirmTitle}>We received your message.</p>
      <p className={styles.confirmBody}>We read every message personally and respond when we sense genuine alignment — usually within two weeks. If we are not the right fit, we will tell you honestly and try to connect you with someone who is.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Name *</label>
          <input id="name" type="text" required value={form.name} onChange={set('name')} className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email *</label>
          <input id="email" type="email" required value={form.email} onChange={set('email')} className={styles.input} />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="org" className={styles.label}>Organisation</label>
        <input id="org" type="text" value={form.organization} onChange={set('organization')} className={styles.input} />
      </div>
      <div className={styles.field}>
        <label htmlFor="type" className={styles.label}>I am reaching out as a *</label>
        <select id="type" required value={form.type} onChange={set('type')} className={`${styles.input} ${styles.select}`}>
          <option value="" disabled>Select one</option>
          <option value="founder">Founder</option>
          <option value="capital">Capital Partner</option>
          <option value="collaborator">Collaborator</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>Tell us about your work and what you are looking for *</label>
        <textarea id="message" required rows={7} value={form.message} onChange={set('message')}
          className={`${styles.input} ${styles.textarea}`}
          placeholder="We are not looking for a polished pitch. We are looking for genuine truth — and genuine alignment." />
      </div>
      <div className={styles.field}>
        <label htmlFor="referral" className={styles.label}>How did you find us?</label>
        <input id="referral" type="text" value={form.referral} onChange={set('referral')} className={styles.input} />
      </div>
      <div className={styles.footer}>
        <Button type="submit" variant="primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send →'}
        </Button>
        <p className={styles.note}>We read every message personally. If we are not the right fit, we will tell you — and try to connect you with someone who is.</p>
      </div>
      {status === 'error' && <p className={styles.error}>Something went wrong. Email us at hello@thenalandacollective.com</p>}
    </form>
  )
}
```

```css
/* ContactForm.module.css */
.form { max-width: 680px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; }
.label { font-family: var(--sans); font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); }
.input { font-family: var(--serif); font-size: 1rem; color: var(--ink); background: #fff; border: 1px solid var(--border-dark); padding: 0.9rem 1rem; width: 100%; appearance: none; border-radius: 0; transition: border-color var(--transition); }
.input:focus { outline: none; border-color: var(--amber); }
.input::placeholder { color: rgba(20,18,14,.22); font-style: italic; }
.select { cursor: pointer; }
.textarea { resize: vertical; min-height: 160px; line-height: 1.7; }
.footer { display: flex; align-items: flex-start; gap: 2rem; margin-top: 0.5rem; }
.note { font-family: var(--serif); font-size: 0.88rem; font-style: italic; color: var(--text-muted); line-height: 1.7; }
.error { font-family: var(--sans); font-size: 0.82rem; color: #8A3A2A; margin-top: 1rem; }
.confirmation { padding: 3rem 0; }
.confirmTitle { font-family: var(--serif); font-size: 2rem; font-weight: 700; color: var(--ink); margin-bottom: 1rem; letter-spacing: -0.02em; }
.confirmBody { font-family: var(--sans); font-size: 0.9rem; line-height: 1.85; color: var(--text-body); }
@media (max-width: 600px) { .row { grid-template-columns: 1fr; } .footer { flex-direction: column; } }
```

---

---

## GRID PATTERNS

```css
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
.grid-focus { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--border-dark); }
.grid-focus > *:nth-child(3n) { border-right: none; }
.grid-focus > *:nth-last-child(-n+3) { border-bottom: none; }
.grid-nocturne { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(201,148,58,.08); }
.grid-journal { display: grid; grid-template-columns: 2fr 1fr; }
.grid-editorial { display: grid; grid-template-columns: 240px 1fr; gap: 5rem; }
@media (max-width: 1024px) { .grid-3, .grid-focus, .grid-nocturne { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .grid-3, .grid-focus, .grid-nocturne, .grid-journal, .grid-editorial { grid-template-columns: 1fr; } .grid-editorial { gap: 2rem; } }
```

---

---

## COMPONENT GENERATION CHECKLIST

When Cursor generates any new component:

1. Read .cursorrules and this file — find the closest existing pattern
2. CSS Modules only — one .module.css per component
3. CSS custom properties only — never hardcode hex values
4. Amber on light · Gold on dark — never swapped
5. Playfair Display for headlines ≥1rem · Inter for everything else
6. No italic as default · Upright 900 is the voice
7. No border-radius · No box-shadow · No gradients except defined glows
8. FadeIn on any section content that scrolls into view
9. All props TypeScript-typed — no any
10. Mobile styles included

**Copy checklist:**
- Does this copy name a challenge with specificity?
- Does it invite participation rather than produce spectator anxiety?
- Does it position the ecosystem (not Nalanda) as the hero?
- Is there any scarcity language? (Must not be)
- Does the contact / CTA copy include "If we are not the right fit, we will tell you"?

---
*The Nalanda Collective — components.md v3.0*
*Challenge · Collaboration · Abundance as Operating System*
*Playfair Display 900 · Manuscript base + Nocturne interludes · Inter for UI*
