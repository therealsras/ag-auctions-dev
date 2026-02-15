# Agentic Auctions Implementation TODO

Status key:
- [ ] Not started
- [x] Completed
- [-] Deferred/blocked

Last updated: 2026-02-15

## Phase 0: Foundation and Tooling
- [ ] Define folder architecture for `src/server`, `src/features`, and shared schemas
- [ ] Add Prisma + PostgreSQL configuration
- [ ] Create initial Prisma schema + migration
- [ ] Configure BetterAuth base setup
- [ ] Configure Vitest and add smoke tests
- [ ] Configure Playwright and add smoke E2E
- [ ] Add test data/seed strategy for local and CI
- [ ] Run acceptance gate (`lint`, `typecheck`, Vitest, Playwright)

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
