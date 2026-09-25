# Day 1 — Next.js foundation

## Goal
Build the routing mental model first. After this lesson, you should be able to look at a folder tree under `src/app` and predict the URL, shared layout, and route params without React Router.

## Learn
- App Router
- `app/`, `page.tsx`, `layout.tsx`
- nested routes
- dynamic route `[id]`
- `<Link />`
- Server Component as default

## Build
Routes used in this lesson:

```text
/
/dashboard
/customers
/customers/[id]
```

Mapping:

```text
src/app/page.tsx                  -> /
src/app/dashboard/page.tsx        -> /dashboard
src/app/customers/page.tsx        -> /customers
src/app/customers/[id]/page.tsx   -> /customers/:id
src/app/customers/layout.tsx      -> wraps /customers and /customers/:id
```

## Run the lesson

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and use the route playground.

### Exercise 1 — Predict the URL
Before opening the browser, answer these from the file tree:

1. What URL renders `src/app/dashboard/page.tsx`?
2. Which layout wraps `src/app/customers/[id]/page.tsx`?
3. For `/customers/7`, what is the value of `params.id`?

### Exercise 2 — Follow one navigation
1. Open `/`.
2. Click **Customers**.
3. Open a customer detail page.
4. Notice that the customer header from `src/app/customers/layout.tsx` remains around both pages.
5. Inspect `src/app/customers/[id]/page.tsx` and find where `params.id` is read.

### Exercise 3 — Server vs Client Component
Check these files:

- `src/app/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/customers/page.tsx`
- `src/app/customers/[id]/page.tsx`

None needs `"use client"` just to render JSX, receive route params, or fetch data on the server. Add a client boundary only when browser-only interactivity is required, such as state, effects, event handlers, or browser APIs.

## Acceptance criteria
- Navigation works without React Router.
- `/customers/[id]` reads route params.
- Shared layout is not duplicated.
- You can explain which components are Server Components by default.

## Questions to answer before Day 2
1. Why does Next.js not need React Router for normal app routing?
2. What is the difference between `layout.tsx` and `page.tsx`?
3. Why should `"use client"` not be added everywhere?
4. Given `src/app/orders/[orderId]/page.tsx`, what URL shape does it match and where do you read `orderId`?

## Short answers
- **Why no React Router?** App Router is file-system routing. Next.js builds the route tree from the `app` directory.
- **`page.tsx` vs `layout.tsx`?** `page.tsx` is the route's page UI; `layout.tsx` is a persistent shared wrapper for its descendant routes.
- **Why avoid `"use client"` everywhere?** It moves the component into the client graph and gives up server-only advantages where they are unnecessary. Keep the client boundary as small as the interaction requires.
