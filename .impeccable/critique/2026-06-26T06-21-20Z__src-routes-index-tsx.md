---
target: src/routes/index.tsx
total_score: 29
p0_count: 0
p1_count: 1
p2_count: 3
timestamp: 2026-06-26T06-21-20Z
slug: src-routes-index-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | CTAs and microcopy clear; preview stats briefly show $0.00 before count-up |
| 2 | Match System / Real World | 3 | Value-first copy; receipt metaphor lands without guilt framing |
| 3 | User Control and Freedom | 3 | Sign in in nav, clear signup path, no trap states |
| 4 | Consistency and Standards | 3 | Aligns with DESIGN.md tokens; nav horizontal padding differs from sections |
| 5 | Error Prevention | 3 | n/a for static marketing surface |
| 6 | Recognition Rather Than Recall | 3 | Product preview shows ratings and monthly total — core loop is visible |
| 7 | Flexibility and Efficiency | 2 | Single primary CTA; returning users have Sign in only |
| 8 | Aesthetic and Minimalist Design | 3 | Editorial rhythm improved; same four subs appear twice on one scroll |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 3 | Privacy, Terms, and trust copy present in footer |
| **Total** | | **29/40** | **Good — polish and narrative tightening before ship** |

## Anti-Patterns Verdict

**LLM assessment**: No longer reads as generic guilt-trip SaaS. Cormorant + restrained tangerine, hero product preview with value bars, and the editorial charges section feel intentional and Subman-specific. Remaining tells: three-column icon trust row (mild feature-grid echo), uppercase `/ your subscriptions` kicker inside the preview (one instance, mimics app chrome), and listing the same four subscriptions twice (preview + receipt). Would not immediately scream AI; a careful reader notices repetition rather than template scaffolding.

**Deterministic scan**: `detect.mjs` on `src/routes/index.tsx`, `landing-charges-section.tsx`, and `landing-product-preview.tsx` returned **0 findings**.

**Visual overlays**: Not run — browser automation unavailable in this session. Assessment based on source review and prior live screenshots from this branch.

## Overall Impression

A clear step up from the first critique. The page now proves the product (value ratings, monthly total), speaks in the right voice, and holds a consistent 6xl grid. The biggest remaining gap is narrative efficiency: the charges section re-lists what the hero preview already showed, without adding the value lens that makes Subman different from a receipt app.

## What's Working

1. **Hero product preview** — Animated stats and orange value bars demonstrate the signature loop; matches authed app language without requiring signup.
2. **Editorial charges section** — Asymmetric quote + receipt layout reads as magazine-fintech, not a nested accent card; honest $62.98 total.
3. **Page rhythm** — Muted hero card → white editorial content → white trust → gap → muted footer CTA; guilt copy and inverted hero hierarchy are gone.

## Priority Issues

### [P1] Same four subscriptions appear twice without new information
- **Why it matters**: Hero preview and charges receipt both list Spotify, ChatGPT, Netflix, Prime at identical prices. Scroll fatigue and cognitive load — visitor processes the same data twice, and the receipt still omits value ratings (Subman's differentiator).
- **Fix**: Either merge (one combined moment in hero) or differentiate charges section — e.g. receipt shows costs only as a teaser line, then preview owns the full value view; or add per-line value scores in the receipt column.
- **Suggested command**: `$impeccable distill`

### [P2] Preview stats flash $0.00 before count-up animation
- **Why it matters**: First paint shows wrong numbers; undermines "clarity" brand promise and confuses fast scrollers.
- **Fix**: Start motion values at final values with opacity-only entrance, or use CSS `contentVisibility` / skeleton that doesn't show misleading figures.
- **Suggested command**: `$impeccable polish`

### [P2] Trust row still echoes icon + heading + blurb grid
- **Why it matters**: PRODUCT anti-reference warns against identical feature grids; three equal columns with Tabler icons is the mild version of that pattern.
- **Fix**: Collapse to one sentence of trust prose with inline emphasis, or two items max with more explanatory copy — not three parallel icon columns.
- **Suggested command**: `$impeccable distill`

### [P2] Scroll-triggered motion on charges and trust sections
- **Why it matters**: Multiple `whileInView` fades on one landing page is the fade-on-scroll reflex; fine individually but cumulative on a short page.
- **Fix**: Keep motion on hero + preview (signature); make charges/trust static or animate only the receipt row stagger without section-level fades.
- **Suggested command**: `$impeccable animate`

## Persona Red Flags

**Jordan (First-Timer)**: Understands the product from the preview; may wonder why subscriptions are listed again in the receipt block without star ratings.

**Riley (Stress Tester)**: $0.00 / 0.0 visible if animation hasn't run or reduced-motion path races hydration; receipt math ($62.98) matches preview — good consistency.

**Casey (Mobile)**: Two-column hero collapses sensibly; receipt + quote stack on small screens; trust three-column grid may feel cramped on narrow phones before `sm:grid-cols-3`.

**Renee (Reflective Auditor)**: Tone now matches PRODUCT.md — clarity without shame; "Reflect before you renew" footer resonates.

## Minor Observations

- Nav uses `px-2 lg:px-4` while sections use `px-4 lg:px-8` — logo/Sign in sit slightly inset relative to content.
- Footer h2 maxes at `3rem` while trust/charges max at `2.5rem` — minor heading scale drift.
- Product preview is `aria-hidden` — acceptable for decorative mock, but charges receipt is real text and should stay in accessibility tree (it is).
- `uppercase tracking-wide` on `/ your subscriptions` is app-chrome voice; fine once, but watch for spreading to other sections.

## Questions to Consider

- What if the charges section showed one sub's cost next to its star rating instead of re-listing all four?
- Does the trust section need three icons, or one confident privacy sentence?
- What would happen if hero preview numbers were correct on first paint, with motion only on the bars?
