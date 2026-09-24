# Day 1 — Next.js foundation

## Learn
- App Router
- `app/`, `page.tsx`, `layout.tsx`
- nested routes
- dynamic route `[id]`
- `<Link />`
- Server Component as default

## Build
Create routes:

```text
/
/dashboard
/customers
/customers/[id]
```

## Acceptance criteria
- Navigation works without React Router.
- `/customers/[id]` reads route params.
- Shared layout is not duplicated.
- You can explain which components are Server Components by default.

## Questions
- Why does Next.js not need React Router for normal app routing?
- Difference between `layout.tsx` and `page.tsx`?
- Why should `"use client"` not be added everywhere?
