# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is **Subman** - a subscription management application built with:
- **Framework**: TanStack Start (React SSR framework)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Auth**: Better Auth
- **Deployment**: Cloudflare Workers
- **Package Manager**: pnpm

## Development Commands

### Essential Commands
```bash
# Start development server (port 3000)
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm build          # Includes type checking via tsc --noEmit
pnpm cf-typecheck   # Cloudflare specific types

# Testing
pnpm test           # Run all tests with Vitest
pnpm test --run     # Run tests once
pnpm test filename  # Run single test file (need to check Vitest docs)

# Code Quality
pnpm lint           # Biome linter
pnpm format         # Biome formatter
pnpm check          # Run both lint and format

# Database
pnpm db:generate    # Generate migrations
pnpm db:migrate     # Run migrations
pnpm db:push        # Push schema changes
pnpm db:pull        # Pull schema from DB
pnpm db:studio      # Open Drizzle Studio

# Deployment
pnpm deploy         # Build and deploy to Cloudflare
```

## Code Style Guidelines

### Formatting (Biome Configuration)
- **Indentation**: Tabs (not spaces)
- **Quotes**: Single quotes for both strings and JSX
- **Semicolons**: As needed (not required)
- **Trailing commas**: All (including function parameters)
- **Import organization**: Auto-organized on save

### TypeScript Standards
- **Strict mode**: Enabled with all strict checks
- **Unused code**: No unused locals or parameters allowed
- **Type safety**: No implicit `any`, proper typing required
- **Path aliases**: Use `@/` prefix for src imports (configured in tsconfig)

### Import Conventions
```typescript
// External libraries first
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'

// Internal imports with @ alias
import { db } from '@/db'
import { subscription } from '@/db/schema'
import type { SubscriptionFormData } from '@/routes/_authed/subs.add'
```

### Component Patterns
- Use functional components with React 19+ patterns
- Custom hooks should start with `use`
- UI components go in `@/components/ui/`
- Business logic components in `@/components/`
- Shared hooks in `@/hooks/`

### Data Fetching Patterns
```typescript
// Server functions with TanStack Start
export const fetchData = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data: { id } }) => {
    // Server-side logic
  })

// Query options
export const dataQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['data', id],
    queryFn: () => fetchData({ data: { id } }),
  })
```

### File-Based Routing
- Routes in `src/routes/` directory
- Layout routes start with `_` (e.g., `_auth.tsx`, `_authed.tsx`)
- Root layout: `__root.tsx`
- Use `Link` from `@tanstack/react-router` for navigation

### Database Patterns
```typescript
// Drizzle ORM usage
import { db } from '@/db'
import { subscription } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Queries
const subs = await db.query.subscription.findMany({
  where: eq(subscription.userId, userId),
})

// Mutations
await db.insert(subscription).values(data)
```

### Error Handling
- Use try-catch for async operations
- Throw errors for validation failures
- Better Auth handles auth errors automatically
- Validate user permissions in server functions

### Styling Guidelines
- Use Tailwind CSS classes
- shadcn/ui components for UI primitives
- Dark mode support via ThemeProvider
- Responsive design with Tailwind breakpoints

## File Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── theme-provider.tsx
├── db/                 # Database schema and connection
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and auth
├── middleware/         # TanStack middleware
├── queries/            # Data fetching logic
├── routes/             # File-based routing
│   ├── __root.tsx      # Root layout
│   ├── _auth/          # Auth routes
│   ├── _authed/        # Protected routes
│   └── api/            # API routes
├── integrations/       # Third-party integrations
├── styles.css          # Global styles
└── main.tsx           # App entry point
```

## Environment Setup

1. Install dependencies: `pnpm install`
2. Set up Better Auth secret: `npx @better-auth/cli secret`
3. Configure `.env.local` with database URL
4. Run migrations: `pnpm db:migrate`

## Testing Notes

- Uses Vitest with Testing Library
- Test files should follow `*.test.ts` or `*.spec.ts` patterns
- Component testing with @testing-library/react
- Mock server functions appropriately

## Deployment

- Target: Cloudflare Workers
- Build command: `pnpm build && pnpm wrangler deploy`
- Environment variables managed through Cloudflare

## Common Pitfalls

1. **Database access**: Use server functions for DB operations, not client-side
2. **Auth**: Routes under `_authed/` require authentication middleware
3. **Type safety**: Always import types with `type` keyword when possible
4. **CSS**: Global styles in `styles.css`, component styles via Tailwind
5. **Path aliases**: Always use `@/` for internal imports

## Code Quality Checks

Always run before committing:
```bash
pnpm check      # Runs both lint and format
pnpm build      # Ensures TypeScript compilation
```

This ensures code follows project standards and maintains type safety.

## Design Context

Strategic and visual design guidance lives outside this file:

- **[PRODUCT.md](./PRODUCT.md)** — register (`product`), users, purpose, brand personality, anti-references, and design principles. Read before any UI work.
- **[DESIGN.md](./DESIGN.md)** — OKLCH tokens, typography (Cormorant Garamond + Manrope + Geist Mono), components, elevation, and do's/don'ts. DESIGN.md wins on visual decisions; PRODUCT.md wins on voice and strategy.

Use `$impeccable` commands (e.g. `craft`, `polish`, `live`) for design iteration; live mode is pre-configured at `.impeccable/live/config.json`.