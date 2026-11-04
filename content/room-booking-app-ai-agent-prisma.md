Twenty-five requests for the same room at the same moment: one booking, twenty-four refusals. This post builds the app that does that, from an empty folder to a live URL, with an AI coding agent doing the typing and the Prisma stack doing the rest: Prisma ORM for the data, [Prisma Postgres](https://www.prisma.io/postgres) for the database and [Prisma Compute](https://www.prisma.io/compute) for hosting. Prisma's skills tell the agent how the platform works today, one Composer module provisions the database, and one workflow deploys every push.

This build was done with Claude Code and Opus 5.5. Any similar agent or model that can run shell commands and read Agent Skills can follow the same path. Everything here comes from building a template for Prisma's [app gallery](https://www.prisma.io/apps) in October 2026: the prompt, the code that matters, and what each Prisma piece took off your plate.

- Source and Deploy button: [github.com/mdobaid311/room-booking-prisma-template](https://github.com/mdobaid311/room-booking-prisma-template)
- The same template in Prisma's examples: [prisma/prisma-examples](https://github.com/prisma/prisma-examples/tree/latest/compute/room-booking-prisma-template)

## What you'll build

Rooms are rows on a timeline. Drag across free time to book, drag a booking to move it, drag its edge to resize it, click it to cancel. A taken slot turns red under the cursor before you drop, and the server enforces the same rules when two people race for the same slot. An empty database seeds six rooms and a day of demo bookings on the first visit, so a fresh deploy has something to show.

![The booking board in dark mode](/blog/screenshot-dark.png)

![The booking board in light mode](/blog/screenshot-light.png)

The interface is a glassmorphism theme, in light and dark: a clean, layered interface that suits a modern productivity tool. The page is a frosted window floating over soft fields of colour, and translucent layers blur what sits behind them (`blur(28px) saturate(170%)`), each at its own depth. The room panel, the timeline and the "Built with" cards are modular glass cards, controls are raised off them, and dialogs, popovers and toasts float above everything on their own overlay glass. A single violet accent carries the focus. The theme follows the system setting, and the theme button next to Export and Print switches it by hand.

Every value is a design token: a CSS custom property defined once with `light-dark()` (`--glass`, `--glass-card`, `--glass-raised`, `--glass-float`, `--blur`, `--accent` and so on). The scheduler is themed through the same tokens, with its `--rs-*` variables mapped onto them, so a new look is a change to one block and reaches every component. Bookings can also be exported as a calendar file or printed.

| Layer | What it uses |
| --- | --- |
| App | Next.js 16 App Router, React 19, Resource Scheduler 1.6 |
| ORM | Prisma ORM 8 (release candidate): a contract file, planned migrations, typed queries |
| Database | Prisma Postgres, provisioned on every deploy by Prisma Composer |
| Hosting | Prisma Compute (Bun runtime), deployed by GitHub Actions on every push |

## What you need

- **Node.js 24.11 or newer.** The template pins Node 24 in `.nvmrc`, and the local run and the deploy workflow were verified on it.
- **Bun**, for the local run that mimics Compute (`npm run dev:composer`). `prisma dev` runs on macOS and Linux, and stops on native Windows with `DEV.PLATFORM_UNSUPPORTED`. On Windows, run it in WSL, which I tested, or in a Linux container.
- **A Prisma account** with a workspace, and a **GitHub account**.
- **An AI coding agent** that can run shell commands and read Agent Skills. This build used Claude Code with Opus 5.5, and any similar agent or model should do the same: the skills are plain instruction files in a shared format. Prisma's docs name Claude Code, Cursor, Codex and Windsurf.

## Step 1: Give your agent the Prisma skills

Prisma ships instructions for agents as skills: a `SKILL.md` file plus reference material, which, per Prisma's docs, the agent uses on its own when it detects a relevant task. That keeps the agent on the platform as it is today, not as its training data remembers it. Install the one for Compute:

```bash
npx skills add prisma/skills --skill prisma-compute
```

The skills for Prisma ORM 8 (`prisma-8`) and for Composer (`prisma-composer-core-concepts`) ship inside the packages themselves, so they match the version you install. `prisma skills sync` copies them into the folders agents read (`.claude/skills`, `.cursor/skills`, `.agents/skills`, `.devin/skills`), and `prisma init` runs it and adds a `postinstall` hook that keeps them in sync.

What the skill changed on this build: `prisma-compute` (v2.0.0) says that the old `prisma.compute.ts`, `defineComputeConfig` and `compute:deploy` flow is gone and its commands now fail with `CLI.UNKNOWN_COMMAND`. The agent followed the skill and went straight to what exists today: a Composer module in `module.ts`, a service in `service.ts`, and `prisma deploy module.ts`. The same research, from the skills and the docs source, found three more things that shaped the build:

- `npm install prisma` installs Prisma 8. Its CLI is built around a contract file (`prisma contract emit`, `prisma migration plan`), with no `generate` command to remember.
- Prisma ORM 8 makes row locks a query method, and its transactions do not offer isolation levels yet, so the double-booking guard is a lock that makes writers queue (Step 4).
- With Composer, every deploy provisions its own Prisma Postgres database and applies your committed migrations before the app starts (Step 7).

Install only the skills you need. The full registry also includes older Prisma 7 skills, and Prisma's README says not to use their legacy recipes for ORM 8 setup.

Then give the agent the prompt. This one reproduces the app in this post:

```text
Build a meeting room booking app as a template for Prisma's app gallery.

Stack
- Next.js 16 (App Router), TypeScript, npm.
- Resource Scheduler (the resource-scheduler npm package) for the timeline.
- Prisma ORM 8, Prisma Postgres and Prisma Compute, deployed as a Prisma Composer
  module (module.ts and service.ts). Follow the Prisma skills for every platform
  decision.

Product
- Six rooms on two floors: Atlas, Borealis and Cirrus on Floor 1, Delta, Echo and
  Fjord on Floor 2, with 2 to 20 seats.
- A day and week timeline, rooms as rows grouped by floor. Drag across free time to
  book, drag a booking to move it, drag its edge to resize it, click a booking to
  cancel it. A slot that cannot be booked turns red before the drop.
- A "Find a time" panel: pick a length and a group size, see which rooms are free.
- A utilization row, calendar export (.ics) and print.
- Opening hours 08:00 to 18:00 and 30-minute slots on the office clock
  (Europe/Berlin). Nothing can be booked in the past.
- An empty database seeds the rooms and a day of demo bookings on the first visit.
- A glassmorphism look in light and dark mode: a frosted, translucent window over
  soft fields of colour, with one violet accent. Follow the system setting and add
  a theme button. Every colour, blur and radius is a design token (CSS custom
  properties).

Rules
- Two people booking the same room at the same moment must never both succeed.
  Lock the room row inside a transaction before checking, in a fixed order, and add
  a database exclusion constraint on (room, time range) as a backstop.
- One rule set for the browser and the server, independent of the machine's time
  zone.
- Optimistic updates that roll back with the server's message if someone else wins.

Delivery
- Tests that race real concurrent requests against real PostgreSQL.
- Run it locally the way Compute runs it.
- Deploy every push with a GitHub Actions workflow: the default branch to
  production, other branches to previews, signed in with OIDC, no secrets.
- Add a Deploy Button to the README and keep the repository within its limits:
  public, Composer module at the root, a build script, one lockfile, at most 100
  files, no file over 5 MB, no symlinks.
- Tell me when you need a login that only I can do.
```

## Step 2: Scaffold the project

The agent scaffolded with `create-prisma`, which needs no prompts:

```bash
npx create-prisma@0.14.6 room-booking --template next \
  --provider postgres --authoring psl --package-manager npm --skills none \
  --yes --json --no-deploy
```

It prints one JSON line (`{"ok":true,...,"nextSteps":[...]}`) listing what to run next, so an agent has no prose to parse. Drop `--skills none` if you want the scaffold to set up the skills for you; per Prisma's docs it runs `prisma init`.

You get Next.js 16, a Composer module (`module.ts`), a service (`service.ts`), a `prisma.config.ts` with an `orm` and a `composer` section, a starter contract, and a starter migration already planned for it (Step 3 replaces it). The finished template pins the toolchain to what the scaffold installs. At the time of writing that is Composer 0.35.0, `prisma` 8.0.0-rc.28, `@prisma/orm-postgres` 8.0.0-rc.20 and `alchemy` 2.0.0-beta.83, with the scaffold's `effect` 4.0.3 overrides. Prisma ORM 8 is moving fast, so check what the scaffold installs when you read this.

One thing to add to the scaffold's dependencies: the deploy loads `@effect/platform-bun` through alchemy, and npm did not install it at the top level of the project, so the deploy failed with "Alchemy could not load the required peer dependency". The template lists `@effect/platform-bun`, `@effect/platform-node` and `@effect/platform-node-shared` (all 4.0.3) as dev dependencies.

## Step 3: Model the data, and let the database refuse overlaps

A room has bookings, and a booking has a time range. In Prisma ORM 8 that is a contract in `src/prisma/contract.prisma`:

```prisma
// use prisma-8

model Room {
  id       String    @id @onCreate(cuid(2))
  name     String    @unique
  floor    String
  seats    Int
  bookings Booking[]
}

model Booking {
  id        String            @id @onCreate(cuid(2))
  title     String
  booker    String
  room      Room              @relation(fields: [roomId], references: [id], onDelete: Cascade)
  roomId    String
  startsAt  TimestamptzJsDate
  endsAt    TimestamptzJsDate
  createdAt TimestamptzJsDate @default(now())

  @@index([roomId, startsAt])
  @@check(expression: sql`"endsAt" > "startsAt"`, name: "booking_ends_after_start")
}
```

The first line has to stay: `prisma contract emit` only reads `.prisma` files that start with it. Bookings use `TimestamptzJsDate`, which reads as a JavaScript `Date`, because the scheduler component wants a `Date`.

The scaffold already shipped a starter migration for its own contract, so remove it before planning yours, or `migration plan` fails with `MIGRATION.PLAN_ORIGIN_UNKNOWN` (`--from @empty` works too). Then generate the types and plan the migration:

```bash
rm -r migrations/app/* migrations/snapshots/*
npm run contract:emit
npm run migration:plan -- --name init
```

`migration plan` prints the full SQL it is about to put in the migration, so the agent (and you) can review it before anything runs.

The contract cannot express a constraint that forbids overlapping time ranges, but PostgreSQL can. Prisma's docs say to put what the contract cannot express in a raw SQL step, so the agent edited the planned `migration.ts`: `createExtension('btree_gist')` first, then a `rawSql` step at the end:

```sql
ALTER TABLE "public"."Booking" ADD CONSTRAINT "booking_no_overlap"
  EXCLUDE USING gist ("roomId" WITH =, tstzrange("startsAt", "endsAt", '[)') WITH &&)
```

Then recompile the migration with `node migrations/app/<migration>/migration.ts`. Never edit the generated `ops.json` by hand. `prisma db verify` (without `--strict`) accepts the extra constraint instead of flagging it as drift. `btree_gist` is on Prisma Postgres's list of supported extensions and also exists in the local emulator, so the same migration runs locally, in previews and in production.

## Step 4: The booking API that cannot double-book

In Prisma ORM 8 the double-booking guard is a row lock: writers for the same room queue. (Transactions in ORM 8 do not offer isolation levels yet, so a `Serializable` transaction is not an option.) Each write locks the room row, reads the overlapping bookings, and only then checks and writes:

```ts
// src/server/bookings.ts, shortened
return db.transaction(async (tx) => {
  // Lock the room rows in id order: writers for the same room queue here.
  for (const id of [...new Set(roomIds)].sort()) {
    await tx.orm.public.Room.where({ id }).forNoKeyUpdate().first();
  }
  // Read the overlapping bookings, check them with the same rules the
  // browser uses (isPlacementAllowed from resource-scheduler/headless),
  // and write only if the placement is allowed.
});
```

- **Same lock order everywhere.** A move locks the booking first, then both rooms sorted by id, so concurrent writers queue instead of deadlocking. `FOR NO KEY UPDATE` rather than `FOR UPDATE`, so other transactions' foreign-key checks on rooms are not blocked.
- **The database as a backstop.** If a code path ever skips the lock, the exclusion constraint from Step 3 makes PostgreSQL refuse the overlap (`23P01`), and the API turns that into the same 409.
- **One rule set for browser and server.** The rules live in `src/lib/rules.ts` and run in both places. They must not depend on the machine's time zone: `getHours()` gives different answers in a browser in Berlin and a server in UTC, so the rules convert with `utcToZoned(start, OFFICE_TIME_ZONE)` on both sides.
- **Precise errors.** 400 with per-field messages (zod), 404, 409 naming the booking in the way (`Atlas is already booked from 9:00 AM to 9:30 AM ("Daily standup").`), and 422 for rule breaks such as opening hours.

The evidence:

- In a manual run against the running app, 20 parallel `POST /api/bookings` for one slot gave 1 × 201, 19 × 409 and one row in the table.
- In the integration tests against real PostgreSQL, 25 simultaneous bookings: 1 succeeds, 24 get a conflict. A create and a move racing for one slot: one wins. Two bookings swapping rooms, 10 rounds: no deadlock.
- With the lock and the constraint both removed, a plain check-then-insert does double-book. Either one alone prevents it.
- Mutation tests: deleting `forNoKeyUpdate()` or the `.sort()` makes the suite fail.

There are no retries and no serialization failures to handle, and the losing request gets a precise message instead of "try again".

## Step 5: The timeline board

The board is [Resource Scheduler](https://www.npmjs.com/package/resource-scheduler): rooms are resources grouped by floor, bookings are events. The agent wired it from the package's types and docs:

- `resources` with `group` (the floor) and `role` ("8 seats"), and `events` as a flat list with a `resourceId`.
- `timeZone` set to the office's zone. Handlers receive instants ready to store, render props receive wall-clock dates, and the same rule works on the server.
- `eventOverlap` and `isValidDrop` from the shared rules, so the footprint turns red where the rule says no, and a drag onto a busy slot sends no request at all.
- `onSlotSelect` opens a booking dialog, `onEventDrop` and `onEventResize` send a PATCH, `renderEventPopover` holds the Cancel button, and `onRangeChange` loads other days.

One import matters: the server must import `isPlacementAllowed` from `resource-scheduler/headless`. The main entry starts with `"use client"`, while the headless entry imports only `date-fns` and is safe on the server.

Bookings are optimistic: a grey pending card appears at once. If two people race for a slot, the loser's card is rolled back with the server's message (`Delta is already booked from 1:00 PM to 1:30 PM ("Winner").`) and the board reloads the visible day, so the loser can see what is in the way. The agent checked all of this in Chromium with Playwright: drag-select, empty submit, red footprint with no request, two tabs racing, move, cancel and next day, with no console errors.

## Step 6: Run it locally the way Compute runs it, and test it

```bash
npm run dev:composer
```

This builds the app and brings up `module.ts` with `prisma dev`: the production build running on Bun, against a local Prisma Postgres emulator, with no credentials and no account. Composer applies the committed migrations, including the hand-written constraint, to an empty database. It was up in about 11 seconds. The first page load seeded the demo data in 0.62 s, and the next took 0.02 s. `prisma dev` runs in the foreground (Ctrl+C stops it).

What you run locally is what Compute runs: the same production build on the same Bun runtime.

For tests, `npm test` runs 38 unit tests anywhere. With `TEST_DATABASE_URL` pointing at a throwaway PostgreSQL database it also runs 17 integration tests, after applying the migrations the same way a deploy does. Use real PostgreSQL for those, not the emulator: the emulator is PGlite, which accepts one connection at a time and queues the others, so row locks between "two users" mean nothing there.

Keep local settings in `.env.local`, which `next build` never copies into the deployed bundle.

## Step 7: Deploy to Prisma Compute

Two small files describe the whole deployment. `module.ts` declares a Prisma Postgres database built from the contract, and the app that depends on it:

```ts
// module.ts
import { module } from "@prisma/composer";
import { postgres } from "@prisma/composer-prisma-cloud/orm";

import { appContract } from "./src/prisma/composer.ts";
import app from "./service.ts";

export default module("room-booking-prisma-template", ({ provision }) => {
  const database = provision(
    postgres({ name: "database", contract: appContract, config: "./prisma.config.ts" }),
    { id: "database" },
  );

  provision(app, { deps: { database } });
});
```

`service.ts` declares the Next.js service and its dependency on that database:

```ts
// service.ts
import nextjs from "@prisma/composer/nextjs";
import { compute } from "@prisma/composer-prisma-cloud";
import { postgres } from "@prisma/composer-prisma-cloud/orm";

import { appContract } from "./src/prisma/composer.ts";

export default compute({
  name: "app",
  deps: { database: postgres(appContract) },
  build: nextjs({ module: import.meta.url, appDir: "." }),
});
```

The app gets its database client from Composer (`service.load()`), not from a `DATABASE_URL`, so there is no database URL to set in production. Keep `output: "standalone"` in `next.config` (the scaffold already sets it) and `nextjsBuild()` in the `composer` extensions of `prisma.config.ts`: without the standalone output, Prisma's docs warn, the deploy "completes" and the URL returns 504.

Deploy on every push with a GitHub Actions workflow. It signs in with GitHub's OIDC token, so the repository holds no secrets:

```yaml
# .github/workflows/prisma-deploy.yml, trimmed
name: prisma-deploy
on:
  push:
permissions:
  contents: read
  id-token: write
jobs:
  deploy:
    if: github.ref_type == 'branch'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
      - uses: oven-sh/setup-bun@v2
      - uses: prisma/cloud-deploy-action@v1
        with:
          build-command: npm run build
```

Connect the repository to a Prisma project once. From the CLI that is three commands: deploy once (`npm run deploy`), then `npx prisma project link <name>`, then `npx prisma git connect`. Or import the repository in the Console, which also opens the workflow pull request. After that, a push to the default branch deploys production, and a push to any other branch deploys a preview named after it, each with its own database. The first production deploy took 76 seconds in GitHub Actions, 34.5 s of it `prisma deploy`. The page then read 6 rooms and 12 bookings from Prisma Postgres, with a 13 ms query. Compute runs the app on Bun in one region, fixed at the first deploy.

To let other people copy the project, add a Deploy Button to the README. It needs a public repository with the Composer module at its root, a `build` script, one lockfile, at most 100 files and 25 MB, no file over 5 MB, and no symlinks or submodules. The button links to `console.prisma.io/new/clone?repository-url=<your repo>&project-name=<name>`. Prisma copies the repository into the visitor's GitHub account, creates a project and adds its own deploy workflow. Because Composer provisions the database, the first deploy needs no secrets, which is what a button URL requires. Before you share the button, click it from a clean account and check that the app comes up.

## Next.js and the Prisma stack fit together in a few lines

Next.js needs very little to run on the Prisma stack:

- `create-prisma --template next` scaffolds a Next.js 16 App Router app that is already wired to Prisma ORM, Prisma Postgres and Compute.
- One line tells Compute how to build and run it: `build: nextjs({ module: import.meta.url, appDir: "." })` in `service.ts`, using the adapter that ships in `@prisma/composer/nextjs`.
- One setting on the Next.js side: `output: "standalone"` in `next.config`.
- The database arrives as a typed client from `service.load()`, so the App Router page reads the rooms and the day's bookings on the server while the timeline runs in the browser.
- Prisma's template gallery has templates for other frameworks too, such as Hono.

## Deploy it with one click

The README has a "Deploy with Prisma" button, and [the link behind it](https://console.prisma.io/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmdobaid311%2Froom-booking-prisma-template&project-name=room-booking-prisma-template) is all a reader needs:

1. Click **Deploy with Prisma**.
2. Choose the workspace, your GitHub account, a repository name and its visibility, then click **Authorize GitHub and deploy**.
3. Prisma copies the repository into your account, creates a project and adds its deploy workflow. The first run provisions the Prisma Postgres database, applies the migrations and starts the app.

There are no environment variables or secrets to enter. A copy made this way went from click to live app in about two and a half minutes, and the Console listed the project as live.

## The same build by hand, in brief

1. **Scaffold.** `npx create-prisma@0.14.6 room-booking --template next --provider postgres --authoring psl --package-manager npm --skills none --yes --json --no-deploy`
2. **Model the data** in `src/prisma/contract.prisma` (`Room`, `Booking`), delete the scaffold's starter migration (`migrations/app/*`, `migrations/snapshots/*`), then run `npm run contract:emit` and `npm run migration:plan -- --name init`. Add `btree_gist` and the exclusion constraint as a raw SQL step in the planned `migration.ts`, and recompile it with `node`.
3. **Write the rules once** in `src/lib/rules.ts`: opening hours and "not in the past", read on the office clock with `utcToZoned`.
4. **Write the booking service** in `src/server/bookings.ts`: inside `db.transaction`, lock the room rows in id order with `forNoKeyUpdate()`, check with `isPlacementAllowed` from `resource-scheduler/headless`, then write. Map `23P01`, `40001` and `40P01` to a 409.
5. **Add the API routes** (create, move or resize, cancel, list by range) and a server component that reads the day's rooms and bookings.
6. **Build the board** with `<ResourceScheduler>`: `resources`, `events`, `timeZone`, the shared rules, and handlers for slot select, drop and resize, plus a booking dialog.
7. **Run and test.** `npm run dev:composer` runs it like Compute, and `npm test` runs the tests (set `TEST_DATABASE_URL` for the PostgreSQL ones).
8. **Deploy.** Keep `output: "standalone"`, add `.github/workflows/prisma-deploy.yml`, deploy once, link the project and connect the repository (`npx prisma project link <name>`, `npx prisma git connect`), and push. Add the Deploy Button to the README.

## How the Prisma stack made this convenient

The finished repository has no database URL in production, no migration job in CI and no deploy secrets. Each piece of the stack took one of those away:

| Prisma piece | What it saved | Where |
| --- | --- | --- |
| Skills (`prisma-compute`, `prisma-8`, Composer) | The agent followed the current Composer layout instead of the removed `prisma.compute.ts` flow | Step 1 |
| `create-prisma --yes --json` | A scaffold with no prompts and one JSON line of next steps, easy for an agent to read | Step 2 |
| Prisma ORM 8 contract and `migration plan` | Migration SQL you can review before it runs, a raw SQL step next to generated ones, and `db verify` (without `--strict`) that tolerates the extra constraint | Step 3 |
| ORM 8 query API | Row locks as a method (`forNoKeyUpdate()`), so writers queue without raw SQL | Step 4 |
| Prisma Postgres | `btree_gist` support, so one migration runs locally, in previews and in production | Step 3 |
| `prisma dev module.ts` | A local run on Bun against an emulator, with no credentials, up in about 11 s | Step 6 |
| Composer `postgres(contract)` | A database per deploy with migrations applied before the app starts, and no `DATABASE_URL` to manage | Step 7 |
| Deploy on push (`prisma/cloud-deploy-action`) | Production on the default branch, a preview with its own database on every other branch, signed in with OIDC | Step 7 |
| Deploy Button | One click copies the repository into your GitHub account and deploys it, with no secrets to enter | Step 7 |

## Why this stack suits an AI agent

With Prisma, the infrastructure of an app like this shrinks to three small files: a contract, a module and a workflow. That is a shape an agent handles well:

- **Every step is a command.** Scaffold, contract emit, migration plan, local run and deploy each have a CLI command, and the CLI can print JSON (`--json`).
- **Every change can be reviewed.** `prisma migration plan` shows the SQL before it runs, and tests that race real requests against real PostgreSQL show that the guard holds.
- **What passes locally ships.** The local run and the deploy use the same production build on Bun.
- **A person is needed for a few one-time steps.** Sign in to Prisma (`npx prisma auth login`), then, after the first deploy, link the project and connect GitHub (`npx prisma project link`, `npx prisma git connect`, or import the repository in the Console). After that, every push deploys with no login and no secrets.

For a new app on Prisma ORM 8 (at the time of writing, a release candidate), the whole path works end to end: one deploy provisions the database, applies the migrations and starts the app.

## Try it

- Source, README and the Deploy button: [github.com/mdobaid311/room-booking-prisma-template](https://github.com/mdobaid311/room-booking-prisma-template)
- Prisma's skills: [github.com/prisma/skills](https://github.com/prisma/skills)
- Resource Scheduler: [npmjs.com/package/resource-scheduler](https://www.npmjs.com/package/resource-scheduler)
