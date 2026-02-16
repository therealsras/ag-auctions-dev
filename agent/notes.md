# Agentic Auctions Notes

Purpose:
- Track bugs, new requirements, and follow-up tasks as checkable items.
- Keep entries scoped to a phase.

How to use:
- Add new notes as unchecked items.
- Mark completed items with `[x]`.
- Keep concise and actionable.

Last updated: 2026-02-16

## Backlog (Unassigned)
- [ ]

## Phase 0 Notes
- [x] Prisma7 should be used along with the prisma-client for better performance. 
- [x] scheme.prisma contains invalid config - should be resolved with correct prisma7 configuration.
- [x] seed.mjs can be removed.  use the updated process for seed data by specifying the seed option in prisma.config.ts
- [x] vitest.config.ts can use projects rather than seperate config file.
- [x] why do we have ensure-test-db-url.mjs and reset-test-db.ts as well as ts file equivalent? do we need? 
- [x] listing-repository. can we refactor nextjs server actions for data fetching queries into lib/queries/<feature-name> and for mutating actions lib/actions/<feature-name>
- [x] folder structure: auth/db and any other config should live in the lib folder. remove server folder.  remove repositories folder.  
- [x] check the repo for any files/folders that are not in use and can be removed. 

## Phase 1 Notes
- [x] Seed users.  update to the following user + 2 more with comical names:
name: Bob Bobbity
email: bob@test.com
password: Pa$$w0rd
image: https://randomuser.me/api/portraits/men/1.jpg
- [x] Login + register both failing.  Authclient is getting the baseurl from env.ts when it should be using the BETTER_AUTH_URL defined in the .env file.  This setting is convention based so does not need to be in the auth-client and causes CORS error due to using 127.0.0.1.  Remove the baseUrl helpers in the env.ts file and rely on .env for variables.  
- [x] Middleware.  next16 uses proxy.ts instead.  functionality remains the same but update to incorportate new naming.
- [x] Middleware.  Instead of using helper cookie methods use betterauth functionality to get the session.  Remove cookies helper.  
- [x] Tailwind button styling.  Tailwind4 uses cursor-default, can you update the globals.css so buttons & use cursor-pointer.  
- [x] User menu dropdown - should use cursor-pointer for the items.
## Phase 2 Notes
- [ ]

## Phase 3 Notes
- [ ]

## Phase 4 Notes
- [ ]

## Phase 5 Notes
- [ ]

## Phase 6 Notes
- [ ]

## Phase 7 Notes
- [ ]

## Phase 8 Notes
- [ ]

## Phase 9 Notes
- [ ]
