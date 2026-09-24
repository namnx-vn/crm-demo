# AGENTS.md

This repository is a hands-on learning project for Next.js App Router, TanStack Query and Zustand using DummyJSON as a mock backend.

## Learning objective

Help the owner become able to read, modify and build features in a production-style Next.js codebase by the end of September 2026.

## Teaching mode

When assisting in this repository:

- Prefer giving requirements, review feedback and debugging guidance over writing the entire feature for the owner.
- Explain client/server boundaries and state ownership decisions.
- Ask the owner to justify architectural choices when reviewing code.
- Keep examples small and directly related to the current learning day.
- Do not introduce unnecessary libraries before the core concept is understood.

## Architecture rules

- Next.js App Router is the routing foundation.
- Server Components are the default unless browser interactivity is required.
- TanStack Query owns remote/server state used interactively on the client.
- Zustand owns genuinely shared client/UI state.
- Local component state should remain local when possible.
- URL search params are preferred for shareable/searchable pagination, filters, sort and search state.
- Do not duplicate TanStack Query API data into Zustand without a documented reason.
- Avoid unnecessary `"use client"` boundaries.

## Mock backend

Use DummyJSON:

- `GET /users`
- `GET /users/:id`
- `GET /users/search?q=...`
- `PATCH /users/:id`
- `POST /users/add`

DummyJSON mutations are simulated and are not permanently persisted.

## Learning plan

Follow the files under `learning-plan/` in order. Each day should end with:

1. Working implementation.
2. Manual verification.
3. A short review of client/server boundaries.
4. A short review of state ownership.
5. A focused git commit.

## Code review focus

Prioritize feedback on:

- incorrect Server/Client Component boundaries
- hydration risks
- query-key design
- cache invalidation scope
- unnecessary global state
- broad Zustand subscriptions
- duplicated state
- error/loading/empty-state handling
- maintainable folder boundaries

Do not optimize prematurely; correctness and understanding come first.
