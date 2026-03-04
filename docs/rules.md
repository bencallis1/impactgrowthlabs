# The Nalanda Collective — Development Rules
### v3.0 — Voice & Narrative Update: Challenge · Collaboration · Abundance
### Save as `.cursorrules` in project root AND `/docs/rules.md`

---

## PART 1 — PROJECT IDENTITY

**Full name:** The Nalanda Collective
**Lowercase UI form:** the nalanda collective
**Never use:** TNC · Nalanda alone · Nalanda Ventures · "the collective"
**Domain:** thenalandacollective.com
**Tagline:** Everything is connected. We invest accordingly.
**Guided by:** Maitri (मैत्री) — unconditional loving kindness toward all living things
**What we are:** An impact venture studio
**What we are not:** A fund · accelerator · incubator · consulting firm · NGO · VC

### Approved taglines (only these — never invent new ones)
1. Everything is connected. We invest accordingly.
2. Named after the university that lasted 700 years.
3. Capital guided by Maitri.
4. Knowledge and capital, deployed with loving kindness.
5. An impact venture studio guided by Maitri.
6. We go in early and stay involved across the full arc.

---

## PART 2 — DESIGN SYSTEM (LOCKED)

### 2.1 Colour Tokens

```css
:root {
  /* ── MANUSCRIPT (light sections) ── */
  --parchment:       #EDEAE0;   /* Primary background */
  --parchment-d:     #E5E1D4;   /* Journal, alternate light sections */
  --ink:             #14120E;   /* Text, structural borders, buttons, footer bg */
  --ink-2:           #1e1b15;   /* Secondary ink elements */
  --amber:           #B8832A;   /* Accent on LIGHT backgrounds ONLY */

  /* ── NOCTURNE (dark interlude sections) ── */
  --nocturne:        #080810;   /* Primary dark interlude background */
  --nocturne-2:      #0d0d1c;   /* Philosophy section background */
  --gold:            #C9943A;   /* Accent on DARK backgrounds ONLY */
  --cream:           #F5EFE0;   /* Text on dark backgrounds */

  /* ── SEMANTIC ── */
  --border:          rgba(20,18,14,.12);
  --border-dark:     rgba(20,18,14,.22);
  --text-body:       rgba(20,18,14,.45);
  --text-muted:      rgba(20,18,14,.28);
  --text-body-dark:  rgba(245,239,224,.32);
  --text-muted-dark: rgba(245,239,224,.18);
}
```

**Critical rules:** --amber on light only · --gold on dark only · Never #fff background · Never #000 text.

### 2.2 Section Rhythm (MANDATORY)

```
Nav             → parchment
Hero            → parchment
Proof Bar       → parchment
Editorial       → parchment
Practices       → parchment
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Interlude #1    → NOCTURNE   ← big quote + radial glow
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Focus Areas     → parchment
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Philosophy      → NOCTURNE   ← three streams
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Journal         → parchment-d
Connect CTA     → parchment
Footer          → ink (#14120E)
```

Never two nocturne sections adjacent · Never open a page with nocturne · Nocturne must be preceded AND followed by parchment.

### 2.3 Typography

```css
:root {
  --serif: 'Playfair Display', Georgia, serif;
  --sans:  'Inter', system-ui, sans-serif;
}
```

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Size | Tracking |
|---|---|---|---|---|
| H1 Hero | Playfair Display | 900 | clamp(4.5rem, 8.5vw, 9.5rem) | -0.035em |
| Interlude Quote | Playfair Display | 900 | clamp(2.4rem, 5.5vw, 6rem) | -0.035em |
| H2 Section | Playfair Display | 900 | clamp(2.2rem, 3.5vw, 3.2rem) | -0.025em |
| H3 Card | Playfair Display | 700 | 1.5rem | -0.015em |
| Editorial body | Playfair Display | 700 | clamp(1.9rem, 3.2vw, 3rem) | -0.02em |
| Stat number | Playfair Display | 900 | 2.6rem | -0.025em |
| Body large | Inter | 300 | 1.1–1.2rem | 0 |
| Body | Inter | 300 | 0.85–0.9rem | 0 |
| Eyebrow | Inter | 400 | 0.62rem | 0.42em |
| Button | Inter | 400 | 0.72rem | 0.16em |

Playfair Display for headlines ≥1rem only · Never italic as default · Upright 900 is the voice.

### 2.4 Spacing & Borders

```css
:root {
  --section-y: 7rem; --section-x: 5rem;
  --interlude-y: 11rem; --card-pad: 2.8rem;
  --transition: 0.25s ease; --transition-slow: 0.75s ease;
}
@media (max-width: 768px) {
  :root { --section-y: 5rem; --section-x: 2rem; --interlude-y: 6rem; }
}
```

Primary: `2px solid var(--ink)` · Secondary: `1px solid var(--border)` · **Border-radius: 0 everywhere · Box-shadow: none everywhere.**

### 2.5 Radial Glow (nocturne sections only)

```css
.nocturne-section::before {
  content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
  width: 900px; height: 900px;
  background: radial-gradient(circle, rgba(201,148,58,.07) 0%, transparent 58%);
  pointer-events: none;
}
.nocturne-section::after {
  content: ''; position: absolute; bottom: -300px; right: -200px;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(42,74,48,.10) 0%, transparent 60%);
  pointer-events: none;
}
```

On nocturne backgrounds ONLY · Max opacity: 0.07 gold, 0.12 green · pointer-events:none · parent needs overflow:hidden.

---

## PART 3 — BRAND NARRATIVE & VOICE

This is the most important section in this file. All copy generation begins here.

### 3.1 The Core Tension the Brand Holds

The Nalanda Collective exists inside a specific, productive tension. The brand must hold both sides without collapsing into either.

**The reality we name without flinching:**
The challenges facing people and the living world are not abstract, distant, or theoretical. Ecological breakdown, deepening inequality, the extractive logic baked into most capital structures — these are real, serious, and accelerating. We do not look away. We do not soften hard truths with corporate euphemism. We do not reframe crisis as opportunity. The brand states clearly: the stakes are high, the window matters, and the approaches that got us here are not adequate to what this moment requires.

**The stance we take in response:**
We do not meet this reality with fear, competition, or scarcity. We meet it with Maitri — unconditional loving kindness toward all living things — and with the conviction that human beings, when they share knowledge freely and work in genuine collaboration, are capable of extraordinary coherence. The proof of concept is Nalanda itself: 700 years, 10,000 students, 9 million manuscripts freely available to all who came. An institution that endured because its operating system was generosity, not gatekeeping.

**The tone that results from holding both:**
Sober but not despairing. Clear-eyed but not cynical. Urgent but not anxious. Confident but not arrogant. We name hard things plainly, then hold the door open.

---

### 3.2 Pillar 1 — The Challenges Are Real, and They Require All of Us

**What this pillar says:**
The fragmentation of effort, capital, and knowledge among people working on the same problems is itself one of the core problems. No single actor — fund, founder, government, NGO — can solve this alone. What's needed is coordination: shared vocabulary, shared will, the willingness to act in concert rather than in competition.

**What the language does:**
- Names the challenge with specificity, not abstraction
- Does not catastrophise or dramatise — states plainly, then pivots toward response
- Makes clear that coordinated action is both possible and historically proven
- Invites the reader into participation, not spectator anxiety

**Approved examples:**
✅ *"The pace of ecological breakdown is outrunning the pace of capital deployment into solutions. This is not inevitable. It is a coordination problem — and coordination problems are solvable."*
✅ *"The challenges are serious. The fragmentation of the people working on them makes them more serious still. We exist, in part, to help address that."*
✅ *"What the moment requires is not heroic individual effort. It is coherent collective action — which is harder, and more durable."*

**Prohibited:**
❌ *"The planet is dying and we need to act NOW."* — catastrophising
❌ *"We believe in a better world."* — no stakes, no specificity
❌ *"Impact investing is a growing market."* — this is category marketing, not truth-telling

---

### 3.3 Pillar 2 — Collaboration and Open Knowledge Are the Strategy

**What this pillar says:**
The original Nalanda University had no patents, no intellectual property walls, no competitive moat built on withholding. Scholars arrived from across the known world — China, Korea, Persia, Sri Lanka — and shared freely what they had learned. The institution lasted 700 years in part because it was built on the logic of abundance: knowledge shared grows larger, not smaller.

This is the direct ancestor of how The Nalanda Collective operates. We share our frameworks publicly. We refer founders to better-fit partners. We write honestly about what we've gotten wrong. We co-invest, co-create, and treat the success of the whole ecosystem as a measure of our own.

**What the language does:**
- Treats collaboration as a strategic asset, not a PR talking point
- Uses "we" expansively — not just our team, but everyone working on this
- Never positions Nalanda as the hero — the collective intelligence of the network is the hero
- Makes co-creation and open knowledge feel like natural consequences of the philosophy

**Approved examples:**
✅ *"We hold our frameworks lightly and share them freely. What works should travel."*
✅ *"If we are not the right partner for your work, we will tell you honestly — and we will try to connect you with someone who is. The goal is that the work gets funded, not that we funded it."*
✅ *"The best solutions to complex problems rarely come from a single source. They emerge from networks of people who trust each other enough to think out loud together."*
✅ *"We co-invest wherever possible. Shared ownership of outcomes produces better outcomes."*

**Prohibited:**
❌ *"Our proprietary methodology sets us apart."* — inverts the values
❌ *"We're selective about who we work with."* — scarcity signal; replace with specificity about fit
❌ *"Exclusive access to our network."* — exclusivity is antithetical to the operating system

---

### 3.4 Pillar 3 — Abundance as Operating System

**What this pillar says:**
Most capital operates from a scarcity assumption: fixed opportunities, competitive advantage built on exclusivity, success measured relative to others. The Nalanda Collective operates from the inverse premise — and treats this not as idealism, but as strategic intelligence grounded in historical evidence.

Regenerative systems produce more over time than extractive ones. Open knowledge compounds; hoarded knowledge stagnates. Networks built on trust outlast those built on control. A founder we helped connect to a better-fit partner today may become a collaborator, a co-investor, or the source of the best referrals for years. Nalanda lasted 700 years on this logic.

**What the language does:**
- Frames success as expandable, not fixed
- Names generosity as intelligent long-horizon strategy, not charity
- Uses long-horizon framing throughout
- Never implies scarcity of opportunity, access, or belonging

**Approved examples:**
✅ *"We invest in the success of the whole ecosystem, not just our portfolio. These are not in tension."*
✅ *"Helping others win is not a cost. It is how durable institutions are built."*
✅ *"We are not competing for a fixed pool of success. We are working, alongside many others, to build a larger one."*
✅ *"There is room. Bring what you know."*

**Prohibited:**
❌ *"We only work with a small number of companies each year."* → Replace: *"We go deep with a small number of companies at a time — because depth is what the relationship requires."*
❌ *"Exclusive access to our network."* — never
❌ *"Our track record gives us an edge."* — competition framing; use contribution framing

---

### 3.5 The Narrative Arc (all long-form copy follows this)

```
1. NAME THE REALITY       The challenges are real, specific, and serious
2. LOCATE THE FAILURE     Why fragmented, scarcity-based approaches aren't enough
3. OFFER THE REFRAME      What becomes possible with Maitri, collaboration, abundance
4. GROUND IN PROOF        Nalanda's 700 years · The compounding logic of open knowledge
5. EXTEND THE INVITATION  You are part of this. Here is how to step in.
```

No section skips steps. No section reverses the sequence. Steps 4 and 5 are always present.

---

### 3.6 Vocabulary

**Use:**
Maitri · regenerative · coherence / coherent · all living things · long-horizon · power not force · as within so without · living system · collective intelligence · open knowledge · shared abundance · co-creation · coordination · solidarity · thousand-year horizon · mission-method coherence · the whole ecosystem

**Never use:**
sustainable (as primary descriptor) · green · ESG · disruptive · innovative · scalable · synergy · leverage · ecosystem (as business metaphor) · ROI · exclusive / exclusivity · proprietary · competitive advantage · war metaphors · "the collective" alone · TNC

### 3.7 Sanskrit rule
Maitri (मैत्री) — translate on first use per page. Never assume the reader knows it.

### 3.8 CTAs (these phrases only)
- "Explore our work →"
- "Begin the conversation →"
- "Join the collective →"
- "Share what you know →"
- "Tell us about your work →"
- "Read the essay →"
- "View all →" / "See all →"
- "Send →" (form submit only)

Never: Learn More · Click Here · Submit · Get Started · Exclusive Access

---

## PART 4 — COPY PATTERNS BY SECTION

### Hero subheadline
Pattern: [Scale of challenge] + [Why coherence is the answer] + [Invitation]

*"The challenges facing people and the living world are serious, interconnected, and urgent. So are the solutions — and the people building them. We back those founders with capital, open knowledge, and the deep conviction that we are more capable together than apart."*

### Proof Bar
Numbers carry historical weight. Annotate significance:
- *"700 years — longer than most empires, built on open knowledge"*
- *"9 million manuscripts — freely available to all scholars"*

### Editorial / Why Nalanda
Carries Pillars 1 + 2 at full depth. Structure:
1. Name the challenge (specific, 1–2 sentences)
2. Name the failure in how capital currently responds (1 sentence)
3. The Nalanda precedent as proof of a different way (2–3 sentences)
4. Declarative sentence about what The Nalanda Collective is doing about it

### Interlude Quotes (Nocturne)
Short. Declarative. Timeless. Carved-in-stone register. Approved:
- *"Knowledge — and capital — deployed with genuine loving kindness compounds across centuries."*
- *"The old university had no paywalls. Neither does our network."*
- *"Collaboration is not a strategy for second place. It is how durable institutions are built."*
- *"We are not competing for a fixed pool of success. We are building a larger one."*
- *"The challenges are serious. So is the collective intelligence of people working on them."*
- *"What we know is not ours to keep. It is ours to share."*

### Philosophy Cards (Nocturne)
Connect each framework to the collaboration / abundance stance:
- **Hermetic:** You cannot extract from one part without affecting the whole. Investment is not separate from ecology.
- **Quantum:** When any node in the network succeeds, the whole field shifts. We invest in the field, not just the node.
- **Power vs Force:** Scarcity logic is force — it exhausts itself. Abundance logic is power — it compounds.

### Connect / CTA section
*"Whether you are building, investing, advising, researching, or simply paying close attention — if the work of creating a thriving planet for all living things is your work too, we want to know you. Bring what you know. There is room."*

### Journal (on-brand topics)
- Nalanda as open knowledge infrastructure — the 1,500-year-old argument for commons-based capital
- Why fragmentation of impact capital is itself a core problem
- The case for radical transparency: what we've gotten wrong and learned
- Maitri as investment thesis, not brand attribute
- What the burning of Nalanda's library teaches us about short-term thinking
- On abundance mentality as long-horizon strategy, not charity
- Co-investment as a practice of coherence

---

## PART 5 — PROJECT STRUCTURE

```
/app
  /about /philosophy /ventures /studio /journal/[slug] /connect
  layout.tsx  page.tsx  globals.css
/components
  /layout    Nav · Footer
  /ui        EyebrowLabel · FadeIn · Button · Tag
  /sections  Hero · ProofBar · EditorialBlock · Interlude · PhilosophySection · FocusGrid · JournalTease · ConnectPaths
  /cards     PracticeCard · FocusAreaCard · VentureCard · JournalCard · PhilosophyCard
  /forms     ContactForm
/content  /docs  /public/images
```

TypeScript · CSS Modules · No Tailwind · No Framer Motion · next/image · Radix UI primitives only.

---

## PART 6 — ACCESSIBILITY

| Pair | Contrast | WCAG |
|---|---|---|
| Ink on Parchment (#14120E / #EDEAE0) | 14.2:1 | AAA |
| Amber on Parchment (#B8832A / #EDEAE0) | 3.8:1 | AA Large |
| Cream on Nocturne (#F5EFE0 / #080810) | 16.1:1 | AAA |
| Gold on Nocturne (#C9943A / #080810) | 4.7:1 | AA |

Focus light: `outline: 2px solid var(--amber); outline-offset: 3px;`
Focus dark: `outline: 2px solid var(--gold); outline-offset: 3px;`
Headings: never skip levels · Skip-to-content: always present.

---

## PART 7 — ABSOLUTE PROHIBITIONS

**Design:** No colours outside tokens · border-radius: 0 · No box-shadows · No gradients except defined glows · Never two nocturne sections adjacent · Amber on dark = error · Gold on light = error

**Typography:** Playfair Display for headlines ≥1rem only · No italic as default headline · Inter only for UI/body

**Copy:**
- ❌ Scarcity language (exclusive, proprietary, limited, competitive advantage)
- ❌ Urgency or fear-based CTAs
- ❌ Language positioning Nalanda as the hero — the ecosystem is the hero
- ❌ "Sustainable", "green", "ESG" as primary descriptors
- ❌ "Maitri" without translation on first use
- ❌ Invented data — use [PLACEHOLDER]
- ❌ Copy that produces spectator anxiety without inviting action

**Code:** No Tailwind · No Framer Motion · No img tags · No missing alt · No TypeScript any

---

## PART 8 — 10-SECOND QUALITY CHECK

1. Every headline in Playfair Display 900?
2. Amber on light only, gold on dark only?
3. Section follows Manuscript → Nocturne rhythm?
4. Border-radius anywhere? (Must be zero)
5. Does copy name the challenge with specificity, not abstraction?
6. Does copy position the ecosystem — not Nalanda — as the hero?
7. Any scarcity language? (Must not be)
8. Does copy invite participation rather than produce spectator anxiety?
9. Is "Maitri" translated on first use? (Must be)
10. Does this feel like something worth reading slowly? (It must)

---

## PART 9 — QUICK REFERENCE

| Token | Hex | Use |
|---|---|---|
| --parchment | #EDEAE0 | All light backgrounds |
| --parchment-d | #E5E1D4 | Journal, alternate sections |
| --ink | #14120E | Text, borders, buttons, footer |
| --amber | #B8832A | Accent on light ONLY |
| --nocturne | #080810 | Interlude backgrounds |
| --nocturne-2 | #0d0d1c | Philosophy section |
| --gold | #C9943A | Accent on dark ONLY |
| --cream | #F5EFE0 | Text on dark |

| Role | Font | Weight | Size |
|---|---|---|---|
| H1 Hero | Playfair Display | 900 | clamp(4.5rem, 8.5vw, 9.5rem) |
| H2 Section | Playfair Display | 900 | clamp(2.2rem, 3.5vw, 3.2rem) |
| Interlude Quote | Playfair Display | 900 | clamp(2.4rem, 5.5vw, 6rem) |
| H3 Card | Playfair Display | 700 | 1.5rem |
| Body large | Inter | 300 | 1.1–1.2rem |
| Body | Inter | 300 | 0.85–0.9rem |
| Eyebrow | Inter | 400 | 0.62rem + 0.42em |

---
*The Nalanda Collective — rules.md v3.0*
*Challenge · Collaboration · Abundance as Operating System*
*Playfair Display 900 · Manuscript base + Nocturne interludes · Inter for UI*
