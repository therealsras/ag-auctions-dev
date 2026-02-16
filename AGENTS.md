# AGENTS.md

## Project Overview
- App: `agentic-auctions`
- Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, ESLint 9
- UI tooling present: `radix-ui`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `shadcn`

## Goal
- Build and iterate quickly while keeping changes minimal, tested, and aligned with existing patterns.

## Non-Negotiables
- All form-related components must use `react-hook-form` with `zod` schema validation.
- Use `shadcn` components whenever an equivalent exists; do not create custom primitives that duplicate them.
- If a required `shadcn` component is missing, install the latest version with `npx shadcn@latest add <component-name>`.

## Repository Structure
- App entry: `src/app/layout.tsx`, `src/app/page.tsx`
- Global styles: `src/app/globals.css`
- Shared utility: `src/lib/utils.ts`
- Static assets: `public/*`

## Local Development
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build production: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint`

## Coding Standards
- Use TypeScript for all new code.
- Keep components small and focused.
- Follow existing App Router conventions under `src/app`.
- Reuse `src/lib/utils.ts` helpers (`cn`) for class composition.
- Prefer existing dependencies before introducing new ones.
- Avoid broad refactors unless explicitly requested.
- Use Context7 MCP when library/API docs or setup/config guidance is needed.

## UI and Styling
- Use Tailwind utility classes and existing project patterns.
- Keep styles in component files unless truly global.
- Preserve responsive behavior for mobile and desktop.

## Change Management
- Scope changes to the user request.
- Do not revert unrelated local changes.
- Document assumptions and any follow-up work needed.

## Git Workflow (Required)
- Before implementing any feature/phase work, create and switch to a feature branch from `main`.
- Use branch names like `feature/<short-description>` (or another clear non-`main` branch name if needed).
- Do not implement directly on `main`.
- After the user explicitly confirms a phase is complete, stage all relevant changes, commit, and push the branch to GitHub.
- After push, open a PR from the feature branch into `main` so CI can run and gate merge.

## Notes for Future Agents
- This repository currently appears to be in an early scaffold phase.
- If adding architecture (state, API, DB, auth), record decisions in `README.md` or a dedicated `docs/` file.

## Definition of Done
- Run `npm run lint` with no errors.
- TypeScript typecheck passes with no errors (for example: `npx tsc --noEmit`).
- If relevant to the change, run `npm run build`.
- Manually verify impacted routes/components in dev server.
- Relevant tests pass locally.
- New/changed behavior is covered by tests.
- README/inline docs are updated when workflows or behavior change.
