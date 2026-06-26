---
target: src/routes/_authed/onboarding.tsx
total_score: 24
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-06-26T06-46-18Z
slug: src-routes-authed-onboarding-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Spinner on create; toasts cover success/error. No skeleton if household creation is slow beyond spinner. |
| 2 | Match System / Real World | 3 | Copy is candid and Monzo-adjacent; household framing fits the product. |
| 3 | User Control and Freedom | 2 | Solo path exists, but "Already have an account?" on an authed route is confusing; no clear skip. |
| 4 | Consistency and Standards | 1 | Custom layout, nested Cards, size-14 logo, and fixed text-3xl diverge from accept-invite's AuthPageShell pattern. |
| 5 | Error Prevention | 3 | Empty household name blocked with toast; partner email optional. |
| 6 | Recognition Rather Than Recall | 3 | Two labeled paths ("Just for me" / "Share with someone") are scannable. |
| 7 | Flexibility and Efficiency | 2 | Primary solo CTA is one click; household path requires form even when user only wanted to browse. |
| 8 | Aesthetic and Minimalist Design | 2 | Twin Card blocks + orphan Separator + xs footnote compete; hierarchy unclear vs open accept-invite column. |
| 9 | Error Recovery | 3 | Toasts name failures and partial success (invite failed but household created). |
| 10 | Help and Documentation | 2 | 48-hour expiry only in xs footnote; InviteLinkPanel repeats it on success anyway. |
| **Total** | | **24/40** | **Acceptable — consistency and hierarchy work needed** |

## Anti-Patterns Verdict

**LLM assessment**: Partially — not full AI slop (no gradient text, no eyebrow kickers, no side stripes), but the twin Card grid is generic onboarding grammar. Serif `CardTitle` inside product form sections and a card-in-card feel read as assembled rather than Subman's editorial "Friendly Audit." The orphan `Separator` with no label is decorative noise.

**Deterministic scan**: Clean — `detect.mjs` returned 0 findings on `onboarding.tsx` before and after alignment.

**Browser visualization**: Not run — no dev server available in this session. Assessment based on source review and comparison to `accept-invite.tsx`.

## Overall Impression

The onboarding logic is sound — solo vs household, optional invite, success state with copy link — but the surface looked like a different product than the invite flow you already polished. The biggest gap was **shared auth shell vocabulary**: accept-invite uses `AuthPageShell`, centered serif headline, border-t action sections, and `size='lg'` buttons; onboarding rolled its own wider column, smaller logo, and nested Cards.

## What's Working

1. **Honest copy** — "Track what you pay for and whether it still feels worth it" matches PRODUCT.md clarity-over-guilt without nagging.
2. **Two-path IA** — Solo default elevated first; household is secondary with optional invite. Cognitive load stays low (two choices, chunked fields).
3. **Success state with InviteLinkPanel** — Reuses the same invite-link pattern as Settings; partner gets a real URL, not email-wait.

## Priority Issues

### [P1] Layout shell inconsistent with accept-invite
- **Why it matters**: Users who create a household then send an invite link see one visual language; recipients see another. Trust breaks at the handoff.
- **Fix**: Wrap both onboarding states in `AuthPageShell` + `AuthPageLogo`; match headline scale (`text-2xl lg:text-3xl`), `max-w-sm/md`, and centered column.
- **Suggested command**: `$impeccable polish onboarding`

### [P1] Nested Cards where accept-invite uses open sections
- **Why it matters**: DESIGN.md bans nested cards; accept-invite already moved to `border-t pt-8` sections. Onboarding's twin Cards felt cramped and generic SaaS onboarding.
- **Fix**: Replace Cards with two border-t sections; use `font-medium text-sm` section labels (Manrope), not serif CardTitle.
- **Suggested command**: `$impeccable layout onboarding`

### [P1] Wrong escape copy for authed users
- **Why it matters**: "Already have an account?" on a route behind `authMiddleware` contradicts system state and erodes confidence.
- **Fix**: Replace with outline "Skip for now" → `/app`, matching accept-invite's "Not now" pattern.
- **Suggested command**: `$impeccable clarify onboarding`

### [P2] Logo and typography drift
- **Why it matters**: `size-14` logo and fixed `text-3xl` vs accept-invite's `size-16` and responsive headline scale.
- **Fix**: Use `AuthPageLogo` (size-16) and shared headline classes.
- **Suggested command**: `$impeccable polish onboarding`

### [P2] Orphan separator and buried expiry note
- **Why it matters**: A lone horizontal line before xs footnote adds visual noise without meaning; expiry is duplicated once InviteLinkPanel appears.
- **Fix**: Drop the separator; keep expiry in InviteLinkPanel copy only (or one inline mention in household section).
- **Suggested command**: `$impeccable distill onboarding`

## Persona Red Flags

**Jordan (First-Timer)**: "Already have an account?" after signing up — thinks they're in the wrong place. Two full Card blocks feel like two separate apps, not one choice.

**Casey (Mobile)**: `max-w-lg` column is wider than accept-invite's thumb-friendly shell; primary actions weren't `size='lg'` (smaller tap targets).

**Alex (Power User)**: No "Skip for now" — must pick a card or hunt for the small "Go to your subs" link.

## Minor Observations

- Serif display on `CardTitle` inside form cards conflicts with product register (display fonts for headlines only).
- Success state duplicated footer reassurance that InviteLinkPanel already covers.
- `_authed` wraps everything in `font-mono` — onboarding inherits mono body text unlike accept-invite (outside authed layout).

## Questions to Consider

- Should onboarding live outside `_authed` (or override mono) so body copy matches accept-invite's Manrope?
- Is the household form better collapsed behind "Share with someone" until tapped (progressive disclosure)?
- After alignment, does the solo CTA need to stay primary orange while household stays outline — or invert emphasis?
