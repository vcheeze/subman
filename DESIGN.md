---
name: Subman
description: Clarity-first subscription management with Monzo warmth and editorial serif moments.
colors:
  background: "oklch(0.9938 0.0013 106.4231)"
  foreground: "oklch(0.2431 0.0076 95.3724)"
  primary: "oklch(0.6908 0.1909 45.0151)"
  primary-foreground: "oklch(0.9938 0.0013 106.4231)"
  secondary: "oklch(0.9312 0.0029 84.5594)"
  muted: "oklch(0.9556 0.0017 67.802)"
  muted-foreground: "oklch(0.4981 0.0078 106.6789)"
  accent: "oklch(0.9583 0.0371 79.1125)"
  accent-foreground: "oklch(0.5855 0.1743 42.7357)"
  destructive: "oklch(0.6271 0.1936 33.34)"
  border: "oklch(0.8852 0.0042 91.4508)"
  card: "oklch(0.9923 0.0025 48.7201)"
  ring: "oklch(0.745 0.1322 54.6845)"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "calc(0.25rem - 4px)"
  md: "calc(0.25rem - 2px)"
  lg: "0.25rem"
  xl: "calc(0.25rem + 4px)"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
    height: "2.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
  card-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "1.5rem"
  input-default:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    height: "2.25rem"
    padding: "0.25rem 0.625rem"
---

# Design System: Subman

## Overview

**Creative North Star: "The Friendly Audit"**

Subman looks like a fintech app that grew up reading magazines — Monzo's approachable money clarity, with Cormorant Garamond giving headlines editorial weight. The UI is product-first: dense enough to be useful, light enough to feel human. Wit lives in copy and micro-moments, not in decorative chrome. Surfaces stay calm; orange appears when something needs attention or action.

This system explicitly rejects generic SaaS landing clichés, guilt-tripping budget apps, and corporate fintech stiffness (see PRODUCT.md anti-references). No purple gradients, hero metrics, cream body backgrounds, or eyebrow kickers on every section.

**Key Characteristics:**

- Warm tangerine accent on cool near-white surfaces — restrained, not drenched
- Serif display + sans body + mono for app chrome (authed routes)
- Tight 4px base radius — confident, not pill-shaped
- Subtle ring + xs shadow for depth; flat at rest on most surfaces
- Motion via spring/ease-out reveals; always respects reduced motion

## Colors

Warm orange carries action and brand identity; neutrals stay barely tinted toward hue 106 (cool paper, not cream).

### Primary

- **Warm Tangerine** (oklch(0.6908 0.1909 45.0151)): Primary buttons, links, focus rings, sidebar active states. The single voice of action — use sparingly on any screen.

### Secondary

- **Soft Stone** (oklch(0.9312 0.0029 84.5594)): Secondary buttons, low-emphasis fills. Neutral support, never competing with primary.

### Tertiary

- **Apricot Wash** (oklch(0.9583 0.0371 79.1125)): Accent backgrounds, sidebar highlights, hover tints. Warmth without saturation.

### Neutral

- **Cool Paper** (oklch(0.9938 0.0013 106.4231)): Page background. Chroma near zero — not sand, not cream.
- **Ink** (oklch(0.2431 0.0076 95.3724)): Primary body text and headings on light surfaces.
- **Whisper** (oklch(0.9556 0.0017 67.802)): Muted section backgrounds (e.g. landing hero container).
- **Slate Hint** (oklch(0.4981 0.0078 106.6789)): Secondary text — must stay ≥4.5:1 against Cool Paper; bump toward Ink if close.
- **Hairline** (oklch(0.8852 0.0042 91.4508)): Borders and input strokes.
- **Card White** (oklch(0.9923 0.0025 48.7201)): Elevated surfaces, cards, popovers.

### Named Rules

**The One Voice Rule.** Primary orange appears on ≤10% of any given screen. Its rarity signals action, not decoration.

**The No-Cream Rule.** Background neutrals stay at chroma ≤0.006. Warmth comes from accent and typography, not a sand-tinted body.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif)
**Body Font:** Manrope (with system sans fallback)
**Label/Mono Font:** Geist Mono for app-shell routes and data-dense UI

**Character:** Editorial headlines meet friendly fintech body copy. Serif for conviction on marketing and key product moments; Manrope for everything interactive; mono where the app feels like a tool.

### Hierarchy

- **Display** (600, clamp(2.5rem, 8vw, 6rem), 1.1): Landing heroes, major section titles. `text-wrap: balance`. Letter-spacing ≥ -0.04em floor.
- **Headline** (600, 1.875–3.75rem, 1.15): Page titles inside the app, card group headers.
- **Title** (500, 1rem, 1.4): Card titles, form section labels.
- **Body** (400, 1rem/0.875rem on md+, 1.6): Descriptions, helper text. Max ~70ch in prose blocks.
- **Label** (500, 0.875rem, 1.4): Buttons, inputs, table headers.
- **Mono** (400, 0.875rem, 1.5): Authed app shell (`font-mono` on `_authed` layout), metadata, costs.

### Named Rules

**The Pairing Rule.** Never stack two similar sans-serifs. Cormorant + Manrope is the only display/body pair.

**The Display Ceiling Rule.** Hero clamp max is 6rem (~96px). Larger reads as shouting, not designing.

## Elevation

Flat-by-default with tonal layering. Cards use a 1px ring at 10% foreground opacity plus `shadow-xs` — never border plus wide blur together on the same element. Depth comes from background steps (background → muted → card) before shadows escalate.

### Shadow Vocabulary

- **xs** (`0px 4px 8px -1px hsl(0 0% 0% / 0.05)`): Inputs, outline buttons, cards at rest.
- **sm–md**: Reserved for hover/focus elevation on interactive panels — rare.
- **2xl**: Not used in product UI.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows respond to state (hover, focus, modal), not decorate idle cards.

**The No Ghost-Card Rule.** Never pair `border: 1px solid` with soft shadows ≥16px blur on the same element. Pick one depth strategy.

## Components

### Buttons

- **Shape:** Gently squared (4px radius / `--radius-lg`)
- **Primary:** Warm Tangerine fill, Cool Paper text, h-9 default / h-10 lg, px-2.5, font-medium 14px
- **Hover / Focus:** primary/80 background; focus-visible ring-3 at ring/50; active translate-y-px
- **Outline:** Hairline border, background fill, shadow-xs; hover → muted
- **Ghost / Secondary:** Muted fills for tertiary actions; destructive uses tinted destructive/10

### Cards / Containers

- **Corner Style:** 12px (`rounded-xl`) — top of card radius range, not pill
- **Background:** Card White with ring-1 ring-foreground/10
- **Shadow Strategy:** shadow-xs only; no stacked wide blur
- **Internal Padding:** py-6 px-6 default; sm variant py-4 px-4

### Inputs / Fields

- **Style:** Hairline border, transparent bg, shadow-xs, 4px radius, h-9
- **Focus:** border-ring + ring-3 ring-ring/50
- **Placeholder:** muted-foreground — verify 4.5:1 contrast; darken if needed
- **Error:** destructive border + ring destructive/20

### Navigation

- **Marketing:** Centered logo + serif wordmark; minimal links; no sticky eyebrow kickers
- **App:** Theme toggle, icon buttons, tooltips; mono font shell; motion stagger on panel entrance (0.06s stagger, ease-out 0.35s)

### Star Rating (signature)

- Custom `@/components/star-rating` for subscription value scoring — keep interactive, not decorative; ties to "true value" product purpose.

## Do's and Don'ts

### Do:

- **Do** use Warm Tangerine only for primary actions, links, and focus — ≤10% of surface area.
- **Do** lead marketing headlines with Cormorant Garamond; keep forms and tables in Manrope.
- **Do** use muted sections (Whisper bg) for hero containment instead of gradient fills.
- **Do** respect `prefers-reduced-motion`: crossfade or instant state changes for all motion/react animations.
- **Do** write candid, lightly witty copy in empty states and confirmations — Monzo energy, not stand-up comedy.

### Don't:

- **Don't** use generic SaaS patterns: purple gradients, hero metrics, identical icon+heading+blurb feature grids.
- **Don't** guilt-trip in copy or UI — no alarmist red spend totals without context; clarity over shame.
- **Don't** adopt corporate fintech visuals: navy/gold, stock photos, trust-badge walls.
- **Don't** use AI-default UI: cream/sand body backgrounds, eyebrow kickers on every section, side-stripe card accents, gradient text.
- **Don't** exceed 16px card radius or pair 1px borders with wide soft shadows on the same element.
- **Don't** nest cards inside cards — use spacing and typography for hierarchy instead.
