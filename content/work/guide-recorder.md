<!--
OWNER, before this page is final (plan B6):
- A number for the outcome line (for example minutes to document a workflow, before and after) and anything measured so far, for a "What happened" section.
- The one decision that was genuinely hard, the options you weighed, and why you chose what you did (item 11). "The hard part" below only restates the summary.
- Two or three honest sentences for "What I would do differently" (item 11).
- Year and role for the meta row (lib/data.ts).
-->

## The problem

Documenting a workflow by hand means taking a screenshot for every click, and the guide is out of date the next time the interface changes.

## What I built

A Chrome extension, built on Manifest V3, records a browser workflow once. It streams clicks, input and screenshots to a Next.js backend, which writes each step with Google GenAI and redacts the sensitive parts. The result is a step-by-step guide you can edit, then export as Markdown, HTML or PDF. It runs local-first, with Prisma underneath.

It is still in development. The code is on [GitHub](https://github.com/mdobaid311/documentation-creation-tool).

## The hard part

What a recording catches. A real workflow passes through real data, like the customer's email in the example on the screen above, and none of that can end up in a guide someone shares. The backend redacts sensitive parts as it writes each step.
