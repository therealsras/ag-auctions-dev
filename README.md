# Agentic Auctions

Phase 0 baseline scaffolding for a Next.js + Prisma + PostgreSQL auction app.

## Code Structure

- `src/lib/env.ts`: required environment variable helpers.
- `src/lib/db/create-prisma-client.ts`: Prisma client factory.
- `src/lib/db/prisma.ts`: shared Prisma singleton wiring.
- `src/lib/auth/index.ts`: Better Auth server configuration.
- `src/lib/schemas/*`: shared Zod schemas.
- `src/lib/actions/*`: server-side mutation actions.
- `src/lib/queries/*`: server-side read/query helpers.
- `src/app/api/auth/[...all]/route.ts`: Next.js auth route handler.

## Environment

Copy `.env.example` to `.env` and set secrets.

Required variables:
- `DATABASE_URL` for dev DB (`postgres-dev`)
- `DATABASE_TEST_URL` for integration/e2e DB (`postgres-test`)
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

## Local Database Topology

Docker Compose defines:
- `postgres-dev` on host port `5432`
- `postgres-test` on host port `5433`

Commands:
- `npm run dev:db:up`
- `npm run test:db:up`
- `npm run test:db:down`
- `npm run test:db:reset`

## App Development

- `npm run dev`
- `npm run build`
- `npm run start`

## Validation and Tests

- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run test:integration` (fails fast if `DATABASE_TEST_URL` is missing)
- `npm run test:e2e`

### Test Orchestration Contract

- DB lifecycle (container start/stop) is managed by scripts.
- Playwright fixtures manage runtime test context.
- Test DB reset + deterministic seed happens once per Playwright run in global setup.
