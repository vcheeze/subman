---
target: accept invite page
total_score: 23
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-06-25T21-31-05Z
slug: src-routes-accept-invite-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Loading is a lone spinner; no preview of what's coming. Auth success only visible after full redirect. |
| 2 | Match System / Real World | 3 | Copy is plain and honest; "household" fits the product. |
| 3 | User Control and Freedom | 3 | "Not now" and sign-out paths exist; guest can't skip auth (correct for task). |
| 4 | Consistency and Standards | 2 | Layout diverges from `/signin` and `/onboarding`: nested card, smaller logo, eyebrow label, auth crammed inside a card header. |
| 5 | Error Prevention | 3 | Locked invite email and Google mismatch warning are good guardrails. |
| 6 | Recognition Rather Than Recall | 2 | Invited email repeated 4+ times across description, fields, and footnotes. |
| 7 | Flexibility and Efficiency | 2 | Sign-in / sign-up tabs + Google is adequate; no streamlined one-tap path for returning users. |
| 8 | Aesthetic and Minimalist Design | 1 | Three competing headline layers, card-in-card structure, dense form stack — visual noise without hierarchy. |
| 9 | Error Recovery | 3 | Wrong-account alert is clear; error states on invite failure are helpful. |
| 10 | Help and Documentation | 2 | 48-hour expiry is buried in xs footnote; no inline reassurance about what joining means. |
| **Total** | | **23/40** | **Acceptable — significant visual and hierarchy work needed** |

## Anti-Patterns Verdict

**LLM assessment**: Yes — this reads as AI-assembled auth UI bolted onto an invite preview. The tell is the stacked pattern: tiny contextual label ("Household invite" + icon) → serif hero → separate card with a second title ("Sign in to accept") → tabs → separator → Google → more fine print. That is generic SaaS onboarding grammar, not Subman's "Friendly Audit" voice. It lacks the calm editorial confidence of onboarding and the open breathing room of sign-in.

**Deterministic scan**: Clean — `detect.mjs` returned 0 findings on `accept-invite.tsx` and `invite-auth-panel.tsx`. The problems are compositional and tonal, not rule-violation slop (no gradient text, no side stripes). The eyebrow label is a voice/hierarchy issue the detector doesn't flag.

**Browser visualization**: Not run — no dev server tab available in this session. Assessment based on source review and comparison to sibling auth surfaces.

## Overall Impression

The flow works; the presentation doesn't. You built the right architecture (public preview, inline auth, redirect preservation) but the page feels like two unrelated screens welded together: a marketing blurb floating above a stock auth card. The single biggest opportunity is to **collapse to one visual story** — one headline, one surface, auth as a natural step — matching the open layout of `/signin` instead of nesting everything in a card.

## What's Working

1. **Honest copy** — "Use {email} — the invite is tied to that address" and the wrong-account warning are candid in a Monzo-adjacent way. That fits PRODUCT.md.
2. **Functional completeness** — Guest preview, sign-in/sign-up tabs, Google with redirect, accept state, error states for expired/invalid invites. The bones are right.
3. **Email lock on invite** — Readonly email prevents a common failure mode; the UX just needs to *look* intentional, not disabled.

## Priority Issues

### [P1] Triple headline hierarchy fights itself
- **Why it matters**: Users scan for one answer — "what am I doing here?" Three titles (eyebrow, "Join X", "Sign in to accept") compete; the actual task (authenticate) gets buried.
- **Fix**: One serif headline: "Join {household}". Subline carries inviter + one-line value prop. Drop the eyebrow and the card's duplicate `CardTitle`.
- **Suggested command**: `$impeccable layout accept-invite`

### [P1] Card nesting makes auth feel cramped and generic
- **Why it matters**: `/signin` uses a full-viewport open layout — no card wrapper. Stuffing tabs, two forms, Google, and alerts inside `Card` + `CardHeader border-b` creates a nested-box feel (card-in-card) and compresses vertical rhythm.
- **Fix**: Remove the outer card for the auth state. Use tonal separation (muted wash band or single bordered panel) like `InviteLinkPanel`, or match sign-in's borderless centered column.
- **Suggested command**: `$impeccable polish accept-invite`

### [P1] Inconsistent with Subman's auth surfaces
- **Why it matters**: Logo is `size-12` here vs `size-16` on sign-in/sign-up. Typography scale differs (`text-3xl` hero vs sign-in's `text-2xl lg:text-3xl`). Users arriving from a text link then hitting a visually different auth pattern lose trust.
- **Fix**: Extract a shared `AuthShell` or match sign-in dimensions, spacing, and logo treatment exactly.
- **Suggested command**: `$impeccable extract auth-shell`

### [P2] "Household invite" eyebrow is AI grammar
- **Why it matters**: PRODUCT.md and DESIGN.md explicitly reject eyebrow kickers. This is the exact pattern — small label + icon above the real heading.
- **Fix**: Delete it. Let the headline and inviter line carry context.
- **Suggested command**: `$impeccable quieter accept-invite`

### [P2] InviteAuthPanel density exceeds working-memory limits
- **Why it matters**: At the auth decision point users see: tabs (2) + email + password + toggle + primary CTA + separator + Google + email reminder + card description above = 8+ distinct elements.
- **Fix**: Default to sign-in only; "New here? Create account" as a text link. Or single-column progressive: email shown once as a badge/chip, not a readonly input that looks broken.
- **Suggested command**: `$impeccable distill invite-auth-panel`

## Persona Red Flags

**Jordan (First-Timer)**: Three headings before the first input. Tab control adds a decision before the first decision. Readonly email field looks greyed-out/disabled — may think they can't proceed. No confirmation of what "accept" gives them (shared Netflix list? full account access?).

**Casey (Mobile, one-handed)**: Primary actions start mid-screen after long preamble. Password row with adjacent icon button is tight on narrow widths. Expiry warning is easy to miss at the bottom in `text-xs`.

**Morgan (Partner invited via text — project-specific)**: Arrives skeptical from a link in iMessage. Page looks like a login wall, not a personal invitation from their partner. Inviter is a plain text span — no warmth, no "from {name}" moment. Doesn't feel like Subman's cheerful clarity; feels like enterprise SSO.

## Minor Observations

- Loading state is a bare spinner — a skeleton matching the final layout would reduce layout shift.
- `CardDescription` embeds raw email in backticks-free prose — long emails wrap awkwardly in narrow card.
- Google button uses empty `alt` on image; sign-in uses `alt='Google G'`.
- Accepted state ("Ready to join?") still uses card wrapper while the CTA could be a single confident primary button below the hero.
- Error page ("Invite not available") is fine functionally but visually disconnected from the success state.

## Questions to Consider

- What if the invite preview and auth shared one continuous surface — hero bleeds into form without a card seam?
- What if the inviter's name were the emotional anchor ("Alex invited you") instead of the org name alone?
- What would this page look like if you deleted the card entirely and copied `/signin`'s layout verbatim, with invite context as a single paragraph above the form?
