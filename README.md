# crm-demo

Hands-on CRM learning project for **Next.js App Router + TanStack Query + Zustand**, using **DummyJSON** as the mock backend.

## Goal

By the end of September 2026, be able to:

- work comfortably with Next.js App Router
- understand Server vs Client Components
- fetch and mutate remote data correctly
- use TanStack Query for server state
- use Zustand for shared client/UI state
- make clear state-ownership decisions
- build a realistic CRUD flow without relying on step-by-step tutorials

## Learning plan

Start here: [`learning-plan/README.md`](./learning-plan/README.md)

The plan is split into 7 focused days:

1. Next.js foundation
2. Server vs Client Components + data fetching
3. Rendering, caching, Route Handlers
4. TanStack Query fundamentals
5. Mutations, invalidation, optimistic updates
6. Zustand and state ownership
7. End-to-end CRM integration

## Mock backend

DummyJSON: https://dummyjson.com

Primary endpoints:

- `GET /users`
- `GET /users/:id`
- `GET /users/search?q=...`
- `PATCH /users/:id`
- `POST /users/add`

> DummyJSON simulates mutations; changes are not permanently persisted.

## Architecture principle

```text
Next.js App Router
├── Server Components -> server-side rendering/data concerns
├── Client Components -> interaction/browser concerns
├── TanStack Query -> remote/server state
└── Zustand -> shared client/UI state
```

Prefer `useState` for truly local state and URL search params for shareable filters, search, sort and pagination.

## Agent guidance

See [`AGENTS.md`](./AGENTS.md) for repository-specific learning and code-review rules.
