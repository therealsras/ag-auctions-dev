# Agentic Auctions Implementation TODO

Status key:
- [ ] Not started
- [x] Completed
- [-] Deferred/blocked

Last updated: 2026-02-15

## Phase 0: Foundation and Tooling
- [x] Define folder architecture for `src/server`, `src/features`, shared schemas, and centralized `/tests` layout
- [x] Add Docker Compose topology with `postgres-dev` (`5432`) and `postgres-test` (`5433`)
- [x] Document and wire env contract: `DATABASE_URL` (dev) and `DATABASE_TEST_URL` (test)
- [x] Add DB lifecycle scripts: `dev:db:up`, `test:db:up`, `test:db:down`
- [x] Add Prisma + PostgreSQL configuration
- [x] Create initial Prisma schema + migration
- [x] Configure BetterAuth base setup
- [x] Configure Vitest and add smoke tests across `/tests/unit` and `/tests/integration`
- [x] Add DB-backed integration smoke test against `postgres-test` with minimal repository round-trip
- [x] Configure Playwright and add smoke E2E under `/tests/e2e`
- [x] Add hybrid orchestration contract: scripts manage DB lifecycle; Playwright fixtures manage test data/session/runtime context
- [x] Add test DB reset + deterministic seed bootstrap once per e2e run
- [x] Add failure-path check for missing `DATABASE_TEST_URL` with clear startup/test error
- [x] Verify dev/test DB isolation behavior (no cross-environment data leakage)
- [x] Run acceptance gate (final)
- [x] Acceptance check: DB services up verification (`npm run test:db:up`)
- [x] Acceptance check: test DB reset verification (`npm run test:db:reset`)
- [x] Acceptance check: `npm run lint`
- [x] Acceptance check: `npm run typecheck`
- [x] Acceptance check: Vitest (`npm run test:unit`, `npm run test:integration`)
- [x] Acceptance check: Playwright (`npm run test:e2e`)

## Phase 1: Authentication and User Profile
- [ ] Implement register/login/logout flows
- [ ] Add protected route utility
- [ ] Build profile page and edit flow
- [ ] Add Zod schema for profile updates
- [ ] Add unit/integration tests
- [ ] Add Playwright auth and profile E2E tests
- [ ] Run phase acceptance gate

## Phase 2: Listing Creation
- [ ] Design listing and listing photo domain interfaces
- [ ] Implement create listing form (RHF + Zod)
- [ ] Implement photo upload flow
- [ ] Implement listing create service and DB persistence
- [ ] Build listing details page
- [ ] Add Vitest coverage for schema/services
- [ ] Add Playwright listing create E2E
- [ ] Run phase acceptance gate

## Phase 3: Browse and Search
- [ ] Implement listing index with pagination
- [ ] Implement keyword search + filters + sort
- [ ] Sync UI state to URL query params
- [ ] Add Vitest coverage for filter/query logic
- [ ] Add Playwright browse/search E2E
- [ ] Run phase acceptance gate

## Phase 4: Bidding + Realtime
- [ ] Implement bid rule engine and validation
- [ ] Implement transactional bid placement
- [ ] Implement real-time bid updates
- [ ] Show bid history on listing detail
- [ ] Add concurrency and authorization tests
- [ ] Add multi-user Playwright bidding E2E
- [ ] Run phase acceptance gate

## Phase 5: Auction End + Notifications
- [ ] Implement scheduled auction close job
- [ ] Implement winner selection and persistence
- [ ] Implement notification creation + read state
- [ ] Add idempotency safeguards
- [ ] Add service tests for close logic edge cases
- [ ] Add Playwright auction-close E2E
- [ ] Run phase acceptance gate

## Phase 6: User Dashboard
- [ ] Implement dashboard data queries
- [ ] Build sections: my listings, my bids, watching
- [ ] Implement watch/unwatch interactions
- [ ] Add Vitest coverage for dashboard services
- [ ] Add Playwright dashboard E2E
- [ ] Run phase acceptance gate

## Phase 7: AI Smart Listing Creator
- [ ] Implement image-to-listing AI adapter using Vercel AI SDK
- [ ] Add strict output schema validation and retry/fallback handling
- [ ] Integrate AI suggestions into create listing form
- [ ] Persist generation logs
- [ ] Add Vitest coverage for parser/adapters
- [ ] Add Playwright AI suggestion E2E
- [ ] Run phase acceptance gate

## Phase 8: AI Natural Language Search
- [ ] Implement natural language query parse endpoint
- [ ] Translate parsed output to structured listing filters
- [ ] Expose parsed filters in UI for transparency
- [ ] Add parser fallback for ambiguous queries
- [ ] Add Vitest parser and normalization tests
- [ ] Add Playwright NL search E2E
- [ ] Run phase acceptance gate

## Phase 9: AI Description Enhancer
- [ ] Implement description rewrite endpoint
- [ ] Add rewrite options UI and user selection flow
- [ ] Add safety checks and graceful failure UX
- [ ] Persist generation logs
- [ ] Add Vitest coverage for rewrite parsing and safety branches
- [ ] Add Playwright enhancer E2E
- [ ] Run phase acceptance gate

## Ongoing Project Tasks
- [ ] Keep `agent/spec.md` updated before each phase implementation
- [ ] Keep `agent/notes.md` updated with bug/requirements checklist items
- [ ] Keep `agent/lessons.md` updated with durable correction rules
