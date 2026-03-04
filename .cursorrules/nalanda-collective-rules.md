# The Nalanda Collective — Cursor & Claude Development Rules
## .cursorrules / rules.md
### Version 1.0 — Active in all development sessions

---

## ABOUT THIS FILE

This file governs all AI-assisted development for The Nalanda Collective website and applications. It is to be placed in the root of the project as `.cursorrules` so Cursor reads it automatically, and as `rules.md` in `/docs` for reference.

When developing with Claude or Cursor, these rules are not suggestions. They are the operating standard. Every component, every line of copy, every design decision is evaluated against them before it ships.

The philosophy behind this file mirrors the philosophy of the brand: as within, so without. The code, the design, and the content must all express the same values. Coherence is not just our investment thesis. It is our development standard.

---

---

## PART 1: PROJECT IDENTITY

### The Brand

**Full name:** The Nalanda Collective
**Short form:** Nalanda Collective (no "The" in some UI contexts — see usage rules below)
**Guided by:** Maitri (मैत्री)
**Primary tagline:** Everything is connected. We invest accordingly.
**Domain:** thenalandacollective.com
**Type:** Impact venture studio

### Name Usage Rules

- In body copy and formal contexts: always "The Nalanda Collective" with capital T
- In UI chrome (nav logo, footer logo, favicon alt text): "the nalanda collective" lowercase
- In page titles and meta: "The Nalanda Collective"
- Never: "Nalanda" alone as the brand name in copy (it refers to the historical institution)
- Never: "TNC" as an abbreviation in user-facing contexts
- Never: "Nalanda Ventures" — this is a previous name, now retired
- Never: "Maitri" as the brand name — it is the guiding philosophy, not the name

### Taglines — Approved for Use

1. Everything is connected. We invest accordingly. *(primary — use everywhere)*
2. Coherence is our strategy. *(for philosophy contexts)*
3. Quietly transforming everything. *(for brand advertising)*
4. Still. Intentional. Unstoppable. *(high-impact moments only — use sparingly)*
5. People. Planet. One story. *(for broader audiences)*
6. The future remembers what we build now. *(for forward-looking / legacy contexts)*

### What We Are

An impact venture studio. Not:
- A fund (we are a studio that invests, not a fund)
- An accelerator or incubator
- A consulting firm
- An NGO or nonprofit
- A "sustainability company"

---

---

## PART 2: DESIGN SYSTEM

### Color Palette

```css
:root {
  /* Primary */
  --color-indigo:       #1B1F4B;  /* Deep Indigo — primary dark background */
  --color-gold:         #C9943A;  /* Living Gold — primary accent, all CTAs, labels */
  --color-cream:        #F5EFE0;  /* Warm Cream — primary light background */

  /* Secondary */
  --color-gold-light:   #E8C97A;  /* Light Gold — hover states, highlights */
  --color-terracotta:   #A85C40;  /* Earth Terracotta — error states, emphasis */
  --color-sage:         #8FAF8A;  /* Sage Mist — success states, nature contexts */
  --color-forest:       #2C4A3E;  /* Deep Forest — alternative dark background */

  /* Semantic */
  --color-text-primary:    #1B1F4B;
  --color-text-secondary:  rgba(27, 31, 75, 0.65);
  --color-text-tertiary:   rgba(27, 31, 75, 0.4);
  --color-text-on-dark:    #F5EFE0;
  --color-text-on-dark-secondary: rgba(245, 239, 224, 0.55);
  --color-text-on-dark-tertiary:  rgba(245, 239, 224, 0.3);
  --color-border-light:    rgba(27, 31, 75, 0.1);
  --color-border-gold:     rgba(201, 148, 58, 0.3);
  --color-border-gold-hover: rgba(201, 148, 58, 1);
}
```

**Color rules:**

- Never use pure white (#FFFFFF) as a background — always use Warm Cream (#F5EFE0)
- Never use pure black (#000000) — always use Deep Indigo (#1B1F4B)
- Gold is the only accent color in primary UI — terracotta and sage are contextual only
- On dark backgrounds: text in Warm Cream, accents in Living Gold
- On light backgrounds: text in Deep Indigo, accents in Living Gold
- Gold on gold is never acceptable
- Never introduce new colors without explicit brand approval

---

### Typography

```css
:root {
  --font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-sans:  'Neue Haas Grotesk', 'Aktiv Grotesk', 'Helvetica Neue', Arial, sans-serif;
}
```

**Font loading (Next.js):**
```javascript
import { Cormorant_Garamond } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
})
```

**Type scale:**
```css
:root {
  --text-xs:    0.7rem;    /* 11.2px — eyebrow labels only */
  --text-sm:    0.85rem;   /* 13.6px — captions, meta */
  --text-base:  1.05rem;   /* 16.8px — body copy */
  --text-lg:    1.2rem;    /* 19.2px — lead paragraphs */
  --text-xl:    1.5rem;    /* 24px — small headings */
  --text-2xl:   2rem;      /* 32px — section headings */
  --text-3xl:   2.5rem;    /* 40px — page headings */
  --text-4xl:   3.5rem;    /* 56px — display headings */
  --text-hero:  clamp(3rem, 7vw, 7rem); /* Hero H1 */
}
```

**Typography rules:**

- All headings (H1–H3): Cormorant Garamond, font-weight 300 or 400
- H1 and display text: always italic (font-style: italic)
- Body copy: Cormorant Garamond at 1.05rem, line-height 1.8–1.9
- UI elements (nav, labels, buttons, captions): font-sans
- Eyebrow labels: font-sans, uppercase, letter-spacing 0.35em, font-size var(--text-xs), color var(--color-gold)
- Never use font-weight 700 (bold) anywhere in the UI
- Never use Cormorant Garamond for UI chrome — reserve it for editorial content
- Line height for headlines: 1.1–1.3
- Line height for body: 1.8–1.9
- Letter spacing for headings: -0.01em to 0.02em (tight to neutral)
- Letter spacing for eyebrow labels: 0.35em (very wide)
- Letter spacing for button text: 0.12–0.15em

---

### Spacing

```css
:root {
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */
  --space-48:  12rem;     /* 192px */
}
```

**Section padding standard:** 8rem vertical (var(--space-32)) on desktop, 4rem on mobile
**Hero padding:** 10–12rem top on desktop
**Interlude sections:** 10–12rem vertical — these must breathe

---

### Border & Radius

```css
:root {
  --border-hairline: 0.5px;
  --border-thin:     1px;
  --radius-none:     0;
  --radius-sm:       2px;
  --radius-base:     4px;
}
```

**Border rules:**
- The brand aesthetic is mostly rectangular — minimal rounding
- Maximum border-radius: 4px (buttons, cards)
- Never use large radius values (8px+) — they read as too modern/casual
- Hairline borders (0.5px) for decorative dividers
- 1px borders for functional UI elements

---

### Shadows & Effects

- No box shadows on cards — use border instead
- No drop shadows on text
- No gradients except: subtle radial gradient overlays on hero sections (max 8% opacity)
- No blur effects except: nav backdrop-blur when scrolled (subtle, max 10px)
- Hover states: border color change + subtle transform translateY(-4px) on cards

---

### Animation & Motion

```css
:root {
  --transition-fast:   all 0.2s ease;
  --transition-base:   all 0.3s ease;
  --transition-slow:   all 0.6s ease;
  --transition-fade:   opacity 0.8s ease, transform 0.8s ease;
}
```

**Motion principles:**
- Slow, organic, purposeful — never snappy or energetic
- Fade-in on scroll: opacity 0 → 1, translateY 30px → 0, 0.8s ease
- Page transitions: fade only, no slide effects
- Hover transitions: 0.3s ease
- The scroll sequence (three tagline frames): trigger on scroll position, fade transition between frames, do not auto-advance
- No spin, bounce, or attention-seeking animations anywhere

---

---

## PART 3: COMPONENT STANDARDS

### Navigation

**Structure:**
```
[logo: "the nalanda collective"] .............. [About] [Philosophy] [Ventures] [Studio] [Journal] [Connect →]
```

**Behavior:**
- Transparent on hero sections, transitions to semi-opaque cream/indigo on scroll
- Logo: lowercase wordmark SVG, color transitions with background
- Nav links: font-sans, uppercase, letter-spacing 0.12em, font-size 0.8rem
- CTA "Connect →": gold color, underline on hover
- Mobile: hamburger → full-screen overlay, same links
- Active state: subtle gold underline, not bold
- No dropdown menus — flat navigation only

**DO NOT:**
- Add dropdown menus or mega-menus
- Use a sticky nav that takes up vertical space on mobile
- Add icons to nav links
- Change the nav link order without brand approval

---

### Hero Sections

**Structure:**
```
[eyebrow label — small, gold, uppercase, spaced]
[H1 — large italic serif, 2 lines max, intentional line break]
[subheadline — body serif, 1–2 lines, muted]
[optional: secondary line — very small, below divider]
[CTA(s)]
[scroll indicator]
```

**Rules:**
- H1 line breaks are intentional typographic decisions — preserve them exactly
- Eyebrow labels always in gold, always uppercase, always letter-spacing 0.35em
- Dark hero backgrounds: Deep Indigo
- Light hero backgrounds: Warm Cream
- Always include a scroll indicator on full-screen heroes
- Hero minimum height: 100vh
- Never center-justify hero text — always left-align

---

### Section Labels (Eyebrows)

```css
.section-label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);         /* 0.7rem */
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-gold);
  font-weight: 400;
  display: block;
  margin-bottom: 1.5rem;
}
```

Always appears above the section H2. Never in the same line as the H2. Never in serif. Never in any color other than Living Gold.

---

### Buttons & CTAs

**Primary button (dark background):**
```css
.btn-primary {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
  padding: 1rem 2.5rem;
  background: transparent;
  transition: var(--transition-base);
  cursor: pointer;
  border-radius: var(--radius-base);
}
.btn-primary:hover {
  background: var(--color-gold);
  color: var(--color-indigo);
}
```

**Text CTA (inline links with arrow):**
```css
.cta-text {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  color: var(--color-gold);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: var(--transition-base);
}
.cta-text:hover {
  border-bottom-color: var(--color-gold);
}
```

**CTA copy rules:**
- Always include directional arrow: →
- Never "Learn More", "Click Here", "Read More", "Submit"
- Always specific and directional:
  - `Explore our philosophy →`
  - `Tell us about your work →`
  - `Begin the conversation →`
  - `Read the full essay →`
  - `See all ventures →`
  - `Start the conversation →`
- The → is part of the label. Never omit it.

---

### Cards

**Standard content card:**
```css
.card {
  padding: 2.5rem;
  background: white;
  border-top: 2px solid var(--color-gold);
  transition: var(--transition-base);
}
.card:hover {
  transform: translateY(-4px);
}
```

**Bordered card (on cream background):**
```css
.card-bordered {
  padding: 2.5rem;
  border: 1px solid var(--color-border-light);
  transition: var(--transition-base);
}
.card-bordered:hover {
  border-color: var(--color-gold);
  background: white;
}
```

**Left-border principle card:**
```css
.card-principle {
  padding: 2rem 2.5rem;
  border-left: 1px solid var(--color-border-gold);
  transition: border-color var(--transition-base);
}
.card-principle:hover {
  border-left-color: var(--color-gold);
}
```

**Card rules:**
- No box shadows
- Hover: translateY(-4px) maximum — never more
- Card titles: Cormorant Garamond italic
- Card numbers: font-sans, 0.7rem, letter-spacing 0.25em, gold
- Card body: Cormorant Garamond, opacity 0.65 on light backgrounds

---

### Interlude / Pull Quote Sections

These are the full-width dark sections between content sections. They are the breath between ideas.

**Rules:**
- Always full-width
- Always dark background (Deep Indigo or Deep Forest)
- Always generous vertical padding (10–12rem)
- Text: Cormorant Garamond italic, 2–5rem depending on length, max 3 lines
- Text color: Warm Cream, accent words in Living Gold
- Never crowd these sections
- Never add multiple elements — text only, maximum one short supporting line below
- They must feel like a pause, not a content section

---

### Dividers

**Hairline gold divider:**
```css
.divider {
  width: 100%;
  height: 0.5px;
  background: var(--color-gold);
  opacity: 0.3;
}
```

**Short accent line (below logo in footer, under wordmark):**
```css
.accent-line {
  width: 80px;
  height: 1px;
  background: var(--color-gold);
  opacity: 0.5;
}
```

---

### Tables

Used in Philosophy page (Power vs Force comparison) and brand guidelines.

```css
table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-serif);
  font-size: 0.95rem;
}
th {
  background: var(--color-indigo);
  color: var(--color-gold);
  padding: 0.9rem 1.2rem;
  text-align: left;
  font-weight: 400;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-family: var(--font-sans);
}
td {
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid var(--color-border-light);
  vertical-align: top;
  line-height: 1.6;
}
tr:nth-child(even) td {
  background: rgba(27, 31, 75, 0.02);
}
td:first-child {
  color: var(--color-terracotta);
  font-style: italic;
}
```

---

### Forms

```css
.form-field {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border-light);
  background: white;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--color-indigo);
  border-radius: var(--radius-base);
  transition: border-color var(--transition-base);
}
.form-field:focus {
  outline: none;
  border-color: var(--color-gold);
}
.form-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  display: block;
  margin-bottom: 0.5rem;
}
```

**Form rules:**
- Labels always above fields, never placeholder-only
- Submit button: "Send →" — never "Submit", "Go", or "Send Message"
- Always include a human note below the form about how responses are handled
- Never use red error states — use terracotta (#A85C40) instead
- Required field indicator: subtle asterisk, never aggressive

---

---

## PART 4: COPY & CONTENT RULES

### The Non-Negotiables

These rules apply to every word that appears in the UI. No exceptions.

**1. Power, not force. Always.**
Every piece of copy is evaluated against David Hawkins' level 200 threshold before it ships. Ask: is this operating from courage, truth, and love — or from fear, manipulation, and urgency?

Never use:
- Urgency language: "Act now", "Don't miss out", "Limited time", "Before it's too late"
- Fear language: "The planet is dying", "We're running out of time"
- Guilt language: "You have a responsibility to...", "Think of what you're leaving behind"
- Superiority language: "We're the best", "Unlike other impact investors"
- Pressure language: "Join thousands of others", "Don't be left behind"

Always use:
- Invitation: "We'd be honored to...", "We'd love to explore..."
- Responsibility: "We will...", "We are committed to..."
- Service: "How can we help?", "We are here to support..."
- Long-horizon framing: "We are building for the next thousand years"
- Specificity over superlative: "Here's what we've built" over "We're the best"

**2. The Nalanda voice. Always.**
Warm but not soft. Visionary but grounded. Confident but never arrogant. Ancient but urgent.

The brand sounds like: a deeply wise person speaking quietly in a room — certain of what they believe, generous in how they share it, unhurried in their delivery.

The brand does not sound like: a startup pitch, an NGO appeal, a corporate sustainability report, or a wellness brand.

**3. Specific over vague. Always.**
"We invested in seven founders building regenerative food systems" is stronger than "We invest in impactful companies."
"700 years" is stronger than "centuries."
"10,000 students from across Asia" is stronger than "thousands of learners."
Numbers are power when they are true and specific.

**4. Show, don't declare.**
Never use: "sustainable", "green", "ESG", "impact" (sparingly), "responsible", "ethical" as standalone descriptors. These words have been drained of meaning by overuse. Show the specifics instead.

**5. Lowercase brand name in UI chrome.**
In the nav logo and footer logo: "the nalanda collective" — all lowercase. In body copy and headings: "The Nalanda Collective" — title case with capital T.

---

### Word & Phrase Reference

**Use:**
- "The Nalanda Collective" (formal), "the nalanda collective" (logo/UI)
- "guided by Maitri"
- "all living things"
- "sacred relationship between people and planet"
- "thousand-year horizon" / "thousand-year thinking"
- "regenerative"
- "coherence" / "coherent"
- "power, not force"
- "as within, so without"
- "loving kindness"
- "unconditional care"
- "long-horizon"
- "living systems"
- "collective wisdom"
- "founders building for all living things"
- "ancient wisdom"
- "begin the conversation"

**Avoid:**
- "sustainable" / "sustainability" (use "regenerative" instead)
- "green" as an adjective for anything brand-related
- "ESG"
- "impact investing" (prefer "impact venture studio" or just describe what we do)
- "ecosystem" as a metaphor for business relationships (we use it literally)
- "disruptive" / "disruption"
- "scalable" (use "durable" or "long-horizon" instead)
- "synergy"
- "leverage" in a financial sense
- "ROI" in primary messaging (use "return" if necessary, prefer "what this leaves behind")
- "portfolio companies" (prefer "portfolio" or "the founders we back")
- Any war metaphors: "target", "campaign", "capture", "dominate"
- "TNC" as abbreviation
- "Nalanda" alone to mean The Nalanda Collective (it refers to the historical institution)

---

### Content Hierarchy

Every page should follow this structure:
1. **Bold claim** — what we believe, stated with confidence
2. **Proof** — specific evidence, historical or contemporary
3. **Story** — the narrative that connects claim to proof
4. **Specifics** — detail, depth, the things that earn credibility
5. **Invitation** — how the reader can be part of this

Do not skip steps. Do not reverse the order. The claim earns attention. The proof earns trust. The story creates connection. The specifics create conviction. The invitation creates action.

---

### CTA Hierarchy

Every page has one primary CTA and optionally one secondary. Never more than two.

**Primary CTAs by page:**
- Home: "Explore our work →"
- About: "Read our full story →" or "Connect →"
- Philosophy: "Read the full philosophy →" (internal) or "Connect →"
- Ventures: "Tell us about your work →"
- Studio: "Start the conversation →"
- Journal: "Read the journal →"
- Connect: "Send →" (form submission)

**Secondary CTAs:**
Always less prominent than primary. Text links, not buttons.

---

### The Sanskrit Rule

When using Sanskrit words or Devanagari script in the UI:
- मैत्री (Maitri) — always followed by "(मैत्री)" if using roman first, or "— Maitri" if using Devanagari first
- नालंदा (Nalanda) — can be used decoratively in headers with translation context nearby
- Never use Sanskrit without contextual translation nearby
- Font: the system serif stack handles Devanagari acceptably. Do not load a separate Devanagari font unless specifically approved.

---

---

## PART 5: NEXT.JS DEVELOPMENT RULES

### Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with font variables
│   ├── page.tsx            # Home
│   ├── about/
│   │   └── page.tsx
│   ├── philosophy/
│   │   └── page.tsx
│   ├── ventures/
│   │   └── page.tsx
│   ├── studio/
│   │   └── page.tsx
│   ├── journal/
│   │   ├── page.tsx        # Journal index
│   │   └── [slug]/
│   │       └── page.tsx    # Individual journal posts
│   └── connect/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── EyebrowLabel.tsx
│   │   ├── SectionDivider.tsx
│   │   └── FadeIn.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Interlude.tsx
│   │   ├── PhilosophyCard.tsx
│   │   ├── FocusAreaCard.tsx
│   │   ├── VentureCard.tsx
│   │   └── TeamCard.tsx
│   └── forms/
│       └── ContactForm.tsx
├── lib/
│   ├── fonts.ts
│   └── utils.ts
├── styles/
│   ├── globals.css         # CSS custom properties, resets
│   └── typography.css      # Type scale, editorial styles
├── content/                # MDX files for journal posts
│   └── journal/
├── public/
│   ├── fonts/              # Self-hosted fallbacks if needed
│   └── images/
└── docs/
    └── rules.md            # This file
```

---

### Component Conventions

**Naming:**
- Components: PascalCase (Nav.tsx, HeroSection.tsx)
- Utilities: camelCase (formatDate.ts)
- CSS classes: kebab-case (section-label, hero-headline)
- CSS variables: kebab-case with -- prefix (--color-gold, --font-serif)

**Component props — always typed:**
```typescript
interface HeroProps {
  eyebrow?: string
  headline: string        // Use \n for intentional line breaks
  subheadline?: string
  cta?: {
    label: string
    href: string
  }
  variant?: 'dark' | 'light'
}
```

**Intentional line breaks in headlines:**
When copy specifies a line break in a headline, preserve it:
```tsx
// Correct — respects the typographic intention
<h1 className="hero-headline">
  Everything is connected.<br />
  We invest accordingly.
</h1>

// Wrong — loses the intentional phrasing
<h1 className="hero-headline">
  Everything is connected. We invest accordingly.
</h1>
```

---

### Scroll Animations

Use IntersectionObserver for fade-in animations. Do not use heavy animation libraries.

```typescript
// FadeIn.tsx — standard scroll reveal component
'use client'
import { useEffect, useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number  // ms delay for staggered reveals
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, delay)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`fade-in ${className || ''}`}>
      {children}
    </div>
  )
}
```

```css
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

### Image Standards

**Alt text rules:**
- Always meaningful, never "image of..." or empty
- Describe the subject and its relevance to Nalanda
- Example: alt="Ruins of the original Nalanda university, Bihar, India"

**Image handling:**
- Always use next/image with explicit width and height
- Priority prop on hero images
- Lazy load all below-fold images
- Prefer atmospheric photography: natural light, earth tones, ancient textures, living systems
- Never use: generic stock photos, isolated solar panels, handshakes, people in suits, charts-as-hero images

**Placeholder during loading:**
- Use the brand cream color as background placeholder
- Never flash white

---

### Performance

- Fonts: Google Fonts via next/font (never CDN link in HTML)
- Images: next/image always
- No heavy animation libraries (Framer Motion only if truly necessary, and only for simple fades)
- Avoid large client components — prefer server components for static content
- Journal posts: MDX with next-mdx-remote or Contentlayer

---

### SEO

**Page title format:** `[Page Name] — The Nalanda Collective`

**Meta description defaults:**
```typescript
export const defaultMetadata = {
  title: 'The Nalanda Collective — Everything is connected. We invest accordingly.',
  description: 'An impact venture studio guided by Maitri — unconditional loving kindness toward all living things. Named after the university that lasted 700 years. Backing founders building regenerative futures.',
  openGraph: {
    siteName: 'The Nalanda Collective',
    type: 'website',
    locale: 'en_US',
  },
}
```

**robots.txt:** Allow all crawlers, sitemap at /sitemap.xml
**Canonical URLs:** Always set, especially for journal posts
**Structured data:** Organization schema on all pages, FAQPage on /connect, Article schema on journal posts

---

---

## PART 6: ACCESSIBILITY

- Color contrast: all text must meet WCAG AA minimum (4.5:1 for normal text, 3:1 for large text)
- Gold on cream (#C9943A on #F5EFE0): passes AA for large text (3.1:1) — use at 1.2rem+ only
- Gold on indigo (#C9943A on #1B1F4B): passes AA (4.7:1) ✓
- Cream on indigo (#F5EFE0 on #1B1F4B): passes AAA (14.5:1) ✓
- All interactive elements: visible focus states using gold outline
- Images: meaningful alt text always
- Forms: labels always associated with inputs (not placeholder-only)
- Skip-to-content link at top of every page
- Semantic HTML: use article, section, nav, main, aside correctly
- Heading hierarchy: never skip levels (H1 → H2 → H3)

---

---

## PART 7: WHAT CURSOR / CLAUDE SHOULD NEVER DO

This section is explicit direction for AI-assisted development. When generating code, copy, or design decisions, do not:

**Design:**
- Introduce new colors not in the brand palette
- Use border-radius > 4px
- Add box shadows
- Use animations faster than 0.3s or more energetic than a simple fade/translate
- Use white (#FFF) as a background
- Use bold (font-weight 700) anywhere
- Introduce sans-serif for editorial headings
- Make the layout feel "startup-y" or "tech company-y"

**Copy:**
- Write urgency-based CTAs ("Act now", "Don't miss out", "Limited time")
- Use "sustainable", "green", or "ESG" as primary descriptors
- Write in a corporate tone
- Use superlatives without evidence ("best", "leading", "premier")
- Write "Learn More" as a CTA — ever
- Refer to the brand as "Nalanda" without "The Nalanda Collective" or "Collective"
- Use "Maitri" as the brand name
- Refer to the company as a "fund"

**Code:**
- Use inline styles except for dynamic values that cannot be in CSS
- Import animation libraries unless specifically requested
- Use `<img>` tags instead of next/image
- Skip alt text on images
- Use `any` type in TypeScript without a comment explaining why
- Create client components unnecessarily — prefer server components
- Add dependencies without checking if the existing stack handles the need
- Skip loading and error states on async components

**Content:**
- Invent company achievements, portfolio companies, or team members — mark all such content as [PLACEHOLDER: description]
- Write testimonials or quotes — mark as [TESTIMONIAL PLACEHOLDER]
- Assume investment amounts, focus areas, or portfolio details — mark as [TO BE CONFIRMED]

---

---

## PART 8: PLACEHOLDER CONVENTIONS

When generating components or pages that require real content not yet available, use these conventions so placeholders are easy to find and fill:

```
[PLACEHOLDER: team member name]
[PLACEHOLDER: team member bio — 2-3 sentences in Nalanda voice]
[PLACEHOLDER: portfolio company name]
[PLACEHOLDER: portfolio company description]
[PLACEHOLDER: investment amount / stage]
[PLACEHOLDER: founder quote]
[PLACEHOLDER: journal post title]
[PLACEHOLDER: hero image — atmospheric, earth tones, living systems]
[PLACEHOLDER: team photo]
[TESTIMONIAL PLACEHOLDER: founder/LP name and quote]
[TO BE CONFIRMED: specific metric or claim requiring verification]
[COMING SOON: feature not yet built]
```

All placeholders must be visually obvious in the UI — use a distinct background color (sage, #8FAF8A, at 20% opacity) so they are never accidentally shipped to production.

---

---

## PART 9: QUICK REFERENCE

### The 10-Second Brand Check

Before shipping any component, copy, or design decision, ask:

1. Does this feel ancient and quietly contemporary?
2. Is the typography Cormorant Garamond where it should be?
3. Are the colors only from the approved palette?
4. Is this copy operating above Hawkins' level 200?
5. Does this invite rather than pressure?
6. Does this feel like it belongs next to the rest of the site?
7. Would someone who read the brand guidelines recognize this as Nalanda?
8. Is there a "Learn More" anywhere? (If yes: fix it)
9. Is there any white (#FFF) or black (#000)? (If yes: fix it)
10. Does this feel coherent — aligned across design, copy, and intent?

---

### The One-Line Brand Voice Test

Read the copy aloud. Ask: does this sound like a deeply wise person speaking quietly and with warmth — or does it sound like a startup, a nonprofit appeal, or a corporate press release?

If it does not pass: rewrite.

---

### Emergency Color Reference

| Use | Color | Hex |
|-----|-------|-----|
| Primary dark bg | Deep Indigo | #1B1F4B |
| Primary accent | Living Gold | #C9943A |
| Primary light bg | Warm Cream | #F5EFE0 |
| Secondary dark bg | Deep Forest | #2C4A3E |
| Error / emphasis | Earth Terracotta | #A85C40 |
| Success / nature | Sage Mist | #8FAF8A |

---

### Emergency Font Reference

| Use | Font | Weight | Style |
|-----|------|--------|-------|
| All headings | Cormorant Garamond | 300–400 | italic for H1/display |
| Body copy | Cormorant Garamond | 300–400 | normal |
| UI chrome | Neue Haas Grotesk | 400 | normal |
| Eyebrow labels | Neue Haas Grotesk | 400 | uppercase |
| Buttons | Neue Haas Grotesk | 400 | uppercase |

---

*The Nalanda Collective — Development Rules v1.0*
*Everything is connected. We build accordingly.*
*Guided by Maitri.*
