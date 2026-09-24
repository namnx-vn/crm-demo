# Day 3 — Rendering, caching, Route Handlers

## Learn
- static vs dynamic rendering
- request-time rendering
- caching and revalidation concepts
- Route Handlers
- direct external API calls vs proxying through Next.js

## Build
Create `app/api/customers/route.ts` that proxies customer list requests to DummyJSON.

Optional: create `app/api/customers/[id]/route.ts` for customer detail.

## Acceptance criteria
- You understand browser -> Next.js Route Handler -> DummyJSON.
- You can explain when a proxy layer is useful.
- You can explain why not every request needs a Route Handler.

## Questions
- What is SSR in Next.js?
- Practical difference between static and dynamic rendering?
- Where can secrets safely live?
