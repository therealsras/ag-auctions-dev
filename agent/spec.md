# Agentic Auctions Technical Specification

## Document Control
- Project: `agentic-auctions`
- Tech stack: Next.js 16, TypeScript, Tailwind CSS, ShadCN, Prisma (PostgreSQL), BetterAuth, React Hook Form + Zod, Vercel AI SDK
- Status: Living document (updated per phase before implementation)
- Last updated: 2026-02-15

## Product Scope
A simplified eBay-style auction platform where users can create listings and place bids. The platform includes authentication, listing lifecycle management, bidding, search, dashboards, and AI-assisted listing/search/content workflows.

## Goals
- Build in clear, test-gated phases.
- Keep architecture simple but production-leaning.
- Use strongly typed contracts across DB, API, UI, and validation.
- Ensure each phase includes comprehensive automated testing (Vitest + Playwright when applicable).

## Non-Goals (Initial)
- Multi-currency settlement and payment processing.
- Shipping label integrations.
- Advanced anti-fraud/risk scoring.
- Native mobile apps.

## Proposed High-Level Architecture
- Frontend: Next.js App Router pages, server components where appropriate, client components for interactivity.
- Backend: Route handlers and server actions (decision per feature), shared service layer for domain logic.
- Data: PostgreSQL via Prisma ORM.
- Auth: BetterAuth with DB-backed sessions.
- Realtime: WebSocket or SSE channel for bid updates.
- Background/automation: scheduled jobs for auction close + winner notification.
- AI: Vercel AI SDK integrations behind server-side adapters with usage limits and observability.

## Cross-Cutting Standards
- Validation: Zod schemas for all form and API inputs.
- Forms: React Hook Form + Zod resolver.
- UI: ShadCN primitives + Tailwind.
- Authorization: owner and role checks in server-side domain layer (not UI-only).
- Observability: structured logs around critical flows (auth, listing create, bids, auction close, AI generation).
- Error handling: typed domain errors mapped to user-safe messages.
- Accessibility: keyboard support, semantic labels, focus management.
- Testing requirement per phase:
  - Unit/integration tests in Vitest for domain logic, validation, and server handlers.
  - Playwright E2E for user-critical flows once UI exists for the phase.
  - Acceptance gate: lint + typecheck + relevant Vitest + relevant Playwright pass.

## Testing Strategy (Global)
- Vitest:
  - Test pure domain services first (auction rules, bid rules, AI parsing/transforms).
  - Test adapters (Prisma repositories, auth wrappers) with controlled fixtures/mocks where practical.
  - Test route handlers/server actions for input validation and authz branches.
  - Run integration tests against `postgres-test` via `DATABASE_TEST_URL` by default.
- Playwright:
  - Focus on core end-user journeys per phase.
  - Use stable seed data and deterministic clocks where auction timing matters.
  - Include negative-path coverage (invalid form, unauthorized actions).
  - Use fixtures for test data/session/runtime context, not Docker lifecycle management.
- Test database lifecycle:
  - `postgres-test` is reset once per full e2e run and seeded with deterministic fixtures.
  - Test DB storage is ephemeral by default.
- CI target (future):
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run test`
  - `npx playwright test`

## Local Infrastructure Contracts (Phase 0 Baseline)
- Docker Compose:
  - One compose topology with two PostgreSQL services:
    - `postgres-dev` (local development DB)
    - `postgres-test` (integration/e2e DB)
  - Fixed host ports:
    - `postgres-dev`: `5432`
    - `postgres-test`: `5433`
- Environment variables:
  - `DATABASE_URL` points to `postgres-dev`.
  - `DATABASE_TEST_URL` points to `postgres-test`.
- Script contracts:
  - `dev:db:up` starts local dev DB dependencies.
  - `test:db:up` starts local test DB dependencies.
  - `test:db:down` stops local test DB dependencies.
  - E2E entrypoint depends on test DB availability and reset/seed bootstrap.

### Phase 0 Implementation Notes (2026-02-15)
- `docker-compose.yml` defines `postgres-dev` (`5432`) and `postgres-test` (`5433`), with isolated storage.
- Env contract is documented in `.env.example` and `.env.test.example`.
- Prisma is configured with standard schema datasource URL (`env("DATABASE_URL")`) in `prisma/schema.prisma`.
- Initial migration is checked in under `prisma/migrations/20260215000100_phase0_init/migration.sql`.
- BetterAuth base setup is wired in `src/lib/auth/index.ts` with Next.js route handler under `src/app/api/auth/[...all]/route.ts`.
- Vitest is split into unit and integration configs with centralized tests under `/tests`.
- Integration test startup fails fast when `DATABASE_TEST_URL` is missing (`scripts/ensure-test-db-url.ts`).
- Playwright global setup resets/seeds the test DB once per run and fixtures manage runtime context (`tests/e2e/fixtures.ts`).

## Project Structure Conventions
- Canonical test root: `/tests`
- Required subfolders:
  - `/tests/unit`
  - `/tests/integration`
  - `/tests/fixtures`
  - `/tests/e2e`
- Policy:
  - Centralize tests under `/tests/*` rather than colocating tests in app source folders.

## Data Model (Initial Draft)
- `User`: id, email, displayName, avatarUrl, createdAt, updatedAt
- `Session`/`Account`/`Verification`: BetterAuth required entities
- `Listing`: id, sellerId, title, description, category, startingBid, currentBid, endAt, status, createdAt, updatedAt
- `ListingPhoto`: id, listingId, url, order
- `Bid`: id, listingId, bidderId, amount, createdAt
- `Watchlist`: id, userId, listingId, createdAt
- `AuctionResult`: id, listingId, winnerId (nullable), finalPrice (nullable), closedAt, reason
- `Notification`: id, userId, type, payload, readAt, createdAt
- `AiGenerationLog`: id, userId, feature, input, output, createdAt

Notes:
- Keep money values in integer minor units (e.g., cents) for safety.
- Add DB constraints and indexes during schema phase definition.

## Phase Plan

### Phase 0: Foundation and Tooling
#### Objective
Establish baseline architecture, quality gates, and developer workflow.

#### Scope
- Configure Prisma + PostgreSQL and initial migrations.
- Define Docker Compose-based local DB topology with `postgres-dev` and `postgres-test`.
- Enforce fixed local port mapping (`5432` dev, `5433` test) and explicit env contracts.
- Configure BetterAuth scaffolding.
- Configure Vitest test runner and basic test utilities.
- Configure Playwright with at least one smoke E2E.
- Define hybrid orchestration where scripts manage DB lifecycle and Playwright fixtures manage test runtime context.
- Add shared app structure for services, repositories, schemas, and UI components.

#### Deliverables
- Compose file and DB service definitions for local development and testing.
- Working DB connection + migration workflow.
- Documented env contract for `DATABASE_URL` and `DATABASE_TEST_URL`.
- Documented DB lifecycle scripts (`dev:db:up`, `test:db:up`, `test:db:down`) and e2e bootstrap/reset flow.
- Canonical `/tests` structure with `unit`, `integration`, `fixtures`, and `e2e`.
- Auth and app boot without runtime errors.
- Testing commands documented and executable.

#### Acceptance Criteria
- Dev and test DB services are independently runnable and reachable.
- Dev/test DB isolation is verified (no cross-environment data leakage).
- Test DB reset-once-per-run workflow is documented and validated for e2e.
- Lint, typecheck, Vitest smoke tests (including DB-backed integration smoke), and Playwright smoke test pass.

#### Required Tests
- Vitest:
  - schema/util smoke tests
  - DB-backed integration smoke against `postgres-test`, including one minimal repository round-trip
- Playwright:
  - app shell loads and unauthenticated landing page rendering
  - smoke run uses test DB orchestration with deterministic reset/seed bootstrap
- Failure-path checks:
  - missing `DATABASE_TEST_URL` fails fast with a clear test startup error

---

### Phase 1: Authentication and User Profile
#### Objective
Allow users to register, login, logout, and manage basic profile details.

#### Scope
- Register/login/logout flows with BetterAuth.
- Profile page (view/edit display name, avatar URL placeholder).
- Protected route patterns for authenticated areas.

#### API/Domain Requirements
- Session retrieval helper and route guard.
- Profile update validation schema via Zod.

#### Acceptance Criteria
- Users can authenticate and persist sessions.
- Unauthorized users cannot access protected routes.

#### Required Tests
- Vitest: auth guards, profile input validation, profile update service.
- Playwright: register, login, logout, edit profile happy path + invalid input path.

---

### Phase 2: Listing Creation (Photos, Description, Starting Bid, End Date)
#### Objective
Enable sellers to create auction listings.

#### Scope
- Listing create form with RHF + Zod.
- Photo upload workflow (initial local/provider abstraction).
- Listing persistence via Prisma.
- Initial listing detail page.

#### Validation Rules (initial)
- Title required, bounded length.
- Description required.
- Starting bid > 0.
- End date must be future and within configurable max duration.
- At least 1 photo, max configurable count.

#### Acceptance Criteria
- Authenticated users can create valid listings and view them.
- Invalid submissions show field-level errors.

#### Required Tests
- Vitest: listing schema + service + repository tests.
- Playwright: create listing happy path, validation error path, unauthorized create redirect.

---

### Phase 3: Browse and Search Listings
#### Objective
Allow users to discover listings quickly.

#### Scope
- Listing index page with pagination.
- Search by keyword + basic filters (category, price, ending soon).
- Sort options (newest, ending soon, price asc/desc).

#### Acceptance Criteria
- Users can browse, filter, and sort with consistent results.
- Query params represent search state.

#### Required Tests
- Vitest: search query parser + filter builder.
- Playwright: browse flow, combined filters, empty-state behavior.

---

### Phase 4: Bidding with Real-Time Updates
#### Objective
Support fair, validated bidding and live UI updates.

#### Scope
- Place bid flow with server-side bid rule enforcement.
- Real-time channel for new bids/current bid updates.
- Bid history on listing detail.

#### Core Rules
- Bid must be greater than current bid and minimum increment.
- No bids after auction end time.
- Seller cannot bid on own listing.

#### Acceptance Criteria
- Valid bids accepted and persisted atomically.
- Concurrent bids resolve correctly and deterministically.
- Active viewers see near real-time current bid updates.

#### Required Tests
- Vitest: bid rule engine, concurrency behavior (transactional tests), authorization checks.
- Playwright: multi-user bidding scenario and live update visibility.

---

### Phase 5: Auction End Automation and Winner Notification
#### Objective
Close auctions automatically and notify users.

#### Scope
- Scheduled job/worker to close expired auctions.
- Winner selection and auction result persistence.
- Notifications to seller and winning bidder.

#### Acceptance Criteria
- Auctions transition to closed exactly once.
- Correct winner/final price calculation.
- Notifications generated idempotently.

#### Required Tests
- Vitest: auction close service, idempotency, no-bid edge case.
- Playwright: time-controlled auction closure scenario and notification visibility.

---

### Phase 6: User Dashboard (My Listings, My Bids, Watching)
#### Objective
Provide users a central dashboard for activity management.

#### Scope
- Dashboard tabs/sections:
  - My listings (active/ended)
  - My bids (leading/outbid/won/lost)
  - Watching (watchlist management)
- Quick links/actions to relevant listing pages.

#### Acceptance Criteria
- Dashboard data is accurate and authorization-safe.
- Watchlist add/remove is reflected in UI and DB.

#### Required Tests
- Vitest: dashboard query services and watchlist mutations.
- Playwright: watch/unwatch flows and dashboard state transitions.

---

### Phase 7: AI Feature - Smart Listing Creator
#### Objective
Accelerate listing creation from photos using AI.

#### Scope
- Upload one or more photos and trigger AI suggestion generation.
- AI returns suggested title, description, category, and starting price.
- User must review/edit before saving listing.

#### Safety and Reliability
- Server-side prompt templates and schema-constrained output parsing.
- Fallback UX for failed generations.
- Track generation metadata in `AiGenerationLog`.

#### Acceptance Criteria
- Suggestions generated with bounded latency and valid structured format.
- User can accept partial/full suggestions and submit successfully.

#### Required Tests
- Vitest: AI response schema parsing, fallback handling, prompt adapter tests.
- Playwright: generate suggestions and create listing from edited AI output.

---

### Phase 8: AI Feature - Natural Language Search
#### Objective
Transform free-text queries into structured listing filters.

#### Scope
- Accept inputs like "vintage watches under £100".
- Parse query to normalized filter object.
- Execute against existing listing search backend.

#### Acceptance Criteria
- Structured filters are explainable and user-visible.
- Unsupported terms degrade gracefully (partial parse + keyword fallback).

#### Required Tests
- Vitest: parser transform contracts, currency/price normalization, fallback behavior.
- Playwright: natural language query input and resulting filtered results.

---

### Phase 9: AI Feature - Description Enhancer
#### Objective
Improve seller-provided listing descriptions with AI rewriting.

#### Scope
- User enters base description and requests enhancement.
- AI returns revised copy options.
- User picks/edits final description before save.

#### Acceptance Criteria
- Enhanced text returned in expected style and safe format.
- User remains in control of final submitted content.

#### Required Tests
- Vitest: rewrite schema parse and moderation/safety branch handling.
- Playwright: end-to-end enhancer workflow from draft to submission.

---

## Security and Abuse Considerations
- Server-validated permissions for all writes.
- Rate-limit sensitive endpoints (auth, bids, AI generation).
- Audit trail for bids and auction state changes.
- Basic content safety checks for AI-generated/user-generated text.

## Performance Targets (Initial)
- Listing browse/search p95 server response: < 400ms at small scale.
- Bid placement end-to-end acknowledgement: < 500ms typical.
- Real-time bid propagation to subscribers: < 2s.

## Open Decisions to Nail Down Per Phase
- Realtime transport: WebSocket vs SSE.
- Auction close scheduler: platform cron vs queue worker.
- File storage provider for photos.
- Notification channel(s): in-app only vs email later.
- AI model/provider choices and cost controls.

## Change Log
- 2026-02-15: Initial phase-based technical specification created.
