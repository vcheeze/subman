---
target: the landing page
total_score: 22
p0_count: 0
p1_count: 4
p2_count: 1
timestamp: 2026-06-25T09-25-06Z
slug: src-routes-index-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | CTA and microcopy are clear; no loading/async states needed on a static landing |
| 2 | Match System / Real World | 2 | Guilt-framed copy clashes with PRODUCT.md's reflective, non-shame tone |
| 3 | User Control and Freedom | 3 | Single scroll path and signup CTA; no trap states |
| 4 | Consistency and Standards | 2 | `font-mono` on marketing + guilt copy contradict DESIGN.md and PRODUCT.md |
| 5 | Error Prevention | 3 | n/a for static marketing surface |
| 6 | Recognition Rather Than Recall | 2 | No product UI preview — visitor can't recognize what Subman actually does |
| 7 | Flexibility and Efficiency | 2 | One CTA path; no sign-in link in nav for returning users |
| 8 | Aesthetic and Minimalist Design | 2 | Repetitive serif h2 sections + logo card grid add template weight without payoff |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 2 | No privacy/terms links in footer; minimal trust context |
| **Total** | | **22/40** | **Acceptable — significant brand and hierarchy gaps before ship** |

## Anti-Patterns Verdict

**LLM assessment**: Reads as a competent but generic SaaS landing page — not full purple-gradient slop, but several training-data tells: centered logo nav, hero in a muted rounded container, identical subscription logo cards, icon + label trust row, and guilt-adjacent problem framing. The committed Cormorant + tangerine CTA are on-brand, but mono body text and gray-dominant hero headline pull toward "developer tool template" rather than Monzo-cheerful subscription audit. Would not scream AI immediately, but a design-literate visitor would clock "startup landing page scaffold."

**Deterministic scan**: `detect.mjs` on `src/routes/index.tsx` returned **0 findings** (clean). No gradient text, eyebrows, side-stripes, or ghost-card detector hits in source.

**Visual overlays**: Not available — script injection for `detect.js` overlay was blocked in this session. Browser review used screenshots + CDP scroll on `http://localhost:3000/`.

## Overall Impression

The landing has a coherent type pairing and restrained orange accent, but it tells the wrong emotional story: shame about unused subs instead of clarity about value. The hero visually undermines its own headline (most words are muted gray), and the page never shows the product's signature experience (value scoring, renewal reflection). The single biggest opportunity: replace the guilt + logo-card middle with a candid, cheerful product moment that proves "true value, not just cost."

## What's Working

1. **Type pairing when serif leads** — Cormorant Garamond headlines on cool near-white surfaces match DESIGN.md's editorial + fintech north star; footer CTA block feels intentional.
2. **Restrained accent** — Warm tangerine appears only on primary buttons; no purple gradients or drenched orange; honors the One Voice Rule.
3. **Supporting copy gems** — "You don't need another budgeting app…" and "Reflect Before You Renew" land the product voice; witty without being flippant.

## Priority Issues

### [P1] Guilt-framed problem section contradicts brand promise
- **Why it matters**: PRODUCT.md explicitly rejects guilt-tripping budget apps and promises "clarity over guilt." The h2 "You're Probably Paying for Things You Don't Use" and the $159.99/month line shame the reader — the opposite of the reflective audit persona.
- **Fix**: Reframe around value awareness: e.g. "Know what each subscription is actually doing for you" with copy that acknowledges keeping subs you love, not just cutting waste.
- **Suggested command**: `$impeccable clarify`

### [P1] Hero headline hierarchy is inverted
- **Why it matters**: The h1 uses `text-muted-foreground` as the base with only "Simplicity" and "Clarity" in foreground. Most of the headline reads as secondary/de-emphasized on a muted panel — weak focal point and borderline contrast on Whisper bg.
- **Fix**: Full headline in Ink (`text-foreground`); use weight, size, or accent on one phrase only. Add `text-wrap: balance` per DESIGN.md.
- **Suggested command**: `$impeccable typeset`

### [P1] Mono font on marketing surface
- **Why it matters**: `font-mono` wraps the entire landing section; DESIGN.md assigns Geist Mono to authed app shell only. Mono body + buttons feel technical/cold, not Manrope-cheerful — undermines Monzo energy.
- **Fix**: Remove `font-mono` from `index.tsx`; keep Manrope for body, Cormorant for display.
- **Suggested command**: `$impeccable typeset`

### [P1] Subscription logo card grid matches anti-reference pattern
- **Why it matters**: Four identical cards (logo + name + price) are exactly the "identical icon + heading + blurb feature grids" listed in PRODUCT.md anti-references. They don't demonstrate Subman's value lens — only familiar brands.
- **Fix**: Replace with one legible product visualization (star-rating on a sub, monthly total with context) or a single editorial stat block — not a logo grid.
- **Suggested command**: `$impeccable distill`

### [P2] No product preview — visitor can't recognize the app
- **Why it matters**: Nielsen #6 fails: nothing shows star ratings, renewal prompts, or the "friendly audit" UI. Visitor must sign up to learn what Subman does beyond copy.
- **Fix**: Add one annotated screenshot or live UI mock of the core loop (add sub → rate value → see true cost).
- **Suggested command**: `$impeccable craft`

## Persona Red Flags

**Jordan (First-Timer)**: After the hero, still unclear what Subman does differently from a spreadsheet or Mint — no UI preview, no "how it works" step. Trust row icons lack explanatory copy beyond one line. Will hesitate at signup.

**Riley (Stress Tester)**: "$159.99/month" math doesn't match the four example subs shown (~$67) — feels exaggerated, erodes trust with deliberate readers. ScrollArea root wrapper traps scroll (keyboard PageDown ineffective without finding viewport).

**Casey (Mobile)**: Hero h1 at `text-6xl` risks overflow/clipping ("Your" clips container edge in viewport test). Subscription card grid becomes 2-column on small screens — cramped logos without scroll affordance.

**Renee (Reflective Auditor — project persona)**: Opens for a calm clarity check before renewal; "You're Probably Paying for Things You Don't Use" headline triggers the guilt PRODUCT.md promises to avoid. Abandons before CTA.

## Minor Observations

- `motion.div` hero fade uses spring with no `prefers-reduced-motion` guard (authed routes use `useReducedMotion`; landing doesn't).
- Nav is logo-only — no Sign in link for returning users.
- Footer lacks Privacy/Terms links (routes exist at `/privacy`, `/terms`).
- Logo `alt='logo'` is non-descriptive.
- Middle sections ("Cut Through the Noise", trust grid) are thin — heading + 2 lines with no visual payoff; rhythm feels padded.
- `rounded-2xl` on hero/footer containers slightly exceeds card radius guidance.

## Questions to Consider

- What if the hero showed one subscription with a star rating instead of abstract "Simplicity and Clarity"?
- Does the guilt section earn its place, or would a single honest total ("$67/mo across 4 subs — what are you getting back?") feel more Subman?
- What would a confident version look like if the page committed to wit in one memorable moment instead of three repetitive serif h2 blocks?
