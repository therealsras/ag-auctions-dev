# Release Flow (Simple Setup)

This project uses a single GitHub repository and a single Vercel project.

## Goal

Keep releases simple while still preventing obvious breakages.

## Branch Strategy

- `main`: always deployable; Vercel production is connected to this branch.
- `feature/*`: short-lived branches for changes.

## Daily Workflow

1. Create a feature branch from `main`.
2. Build the change in small commits.
3. Run local checks before opening a PR:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run test`
4. Open a PR into `main`.
5. Ensure CI passes on the PR.
6. Merge PR to `main`.
7. Vercel auto-deploys from `main`.

## CI Expectations

At minimum, PR CI should run:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`

Optional for later:

- Add `npm run build` in CI if you want an explicit build gate before merge.

## Vercel Setup

- One Vercel project connected to this GitHub repo.
- Production branch set to `main`.
- PRs get Preview Deployments automatically.
- Merge to `main` triggers Production deployment.

## Recommended Guardrails

- Protect `main` in GitHub:
  - Require PRs before merge.
  - Require CI checks to pass.
  - Optional: require 1 approving review.

## What "Ready to Merge" Means

A PR is ready when:

- Scope is focused and understandable.
- CI is green.
- Preview deployment behaves as expected for the changed feature.

## Notes For This Learning Project

- Keep process lightweight; avoid extra environments until needed.
- Prefer shipping small, frequent PRs over long-lived branches.
- Add staging/production split later only when team size or risk justifies it.
