<!--
OWNER, before this page is final (plan B6):
- Weekly npm downloads, GitHub stars and bundle size (item 8), for an outcome line and a "What happened" section.
- The one decision that was genuinely hard, the options you weighed, and why you chose what you did (item 11). "The hard part" below only restates the constraint from the project summary.
- Two or three honest sentences for "What I would do differently" (item 11).
- Year and role for the meta row (lib/data.ts).
-->

## The problem

Booking screens put rooms, people or machines as rows on a timeline. Drawing that is the easy part. The rules are harder: two bookings for the same resource must never overlap, and that has to hold while someone is still dragging, not only once they let go.

## What I built

A free React component, written in TypeScript, that lays resources out as rows on a timeline. You can drag a booking across free time, move it, or resize it, and it works from the keyboard as well as the mouse. The no-double-booking checks live in a headless rules module, separate from the timeline that draws them.

It is MIT licensed and published on [npm](https://www.npmjs.com/package/resource-scheduler), with [docs and live demos](https://resource-scheduler-docs.vercel.app/). It also powers the room booking app in my post on [building one with an AI agent and the Prisma stack](/blog/room-booking-app-ai-agent-prisma).

## The hard part

Enforcing the overlap rules during the drag rather than after it. The check runs while the booking moves, so a double booking is never something you can put down. Keeping those rules in their own module means they are not tied to how the timeline happens to draw them.
