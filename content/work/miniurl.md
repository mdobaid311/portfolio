<!--
OWNER, before this page is final (plan B6):
- Node count, requests per second and p95 redirect latency from a load test, and the cache hit rate (item 7), for an outcome line and a "What happened" section.
- The one decision that was genuinely hard, the options you weighed, and why you chose what you did (item 11). "The hard part" below only restates the design from the project summary.
- Two or three honest sentences for "What I would do differently" (item 11).
- Year and role for the meta row (lib/data.ts).
-->

## The problem

A URL shortener has two jobs: resolve links fast, and never hand out the same short code twice. The second one gets hard as soon as several instances are writing at once.

## What I built

Three services behind one API, on a multi-node Kubernetes cluster I host myself. The diagram above is the whole system: a client, the three services, and the three stores they lean on. ZooKeeper hands out unique ranges of Base62 codes, Redis caches the hot URLs, and MongoDB runs as a replica set. JWT auth, analytics and rate limiting sit on top.

The cluster autoscales, and updates roll out with zero downtime. It was built to be run rather than demoed. The code is on [GitHub](https://github.com/mdobaid311/MiniURL).

## The hard part

Unique codes with more than one writer. Instead of every instance generating codes and hoping they never collide, ZooKeeper gives each one its own range of Base62 codes to issue from, so two instances can never hand out the same code.
