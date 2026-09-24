# Day 7 — End-to-end CRM integration

Build one complete feature without following a tutorial line by line.

## `/customers`
- list
- search
- pagination
- customer detail link
- loading state
- error state
- empty state

## `/customers/[id]`
- customer profile
- edit form
- mutation
- cache refresh

## Global UI
Use Zustand for one genuinely shared client state such as sidebar or filter panel.

## Suggested structure

```text
app/
├── layout.tsx
├── dashboard/page.tsx
├── customers/
│   ├── page.tsx
│   ├── loading.tsx
│   ├── [id]/page.tsx
│   └── _components/
├── api/customers/
└── providers/query-provider.tsx
lib/
├── api/customers.ts
└── query-keys.ts
store/
└── ui-store.ts
```

## State ownership decision tree

```text
Data from API/server?
├── yes -> Server Component fetching or TanStack Query
└── no
    └── Local to one component?
        ├── yes -> useState
        └── no -> Zustand if distant components need it
```

Prefer URL search params for shareable state such as search, page, sort and filters.

## Final review checklist
- No unnecessary root-level `"use client"`.
- API data is not duplicated into Zustand.
- Query keys include parameters that change server data.
- Mutations invalidate/update only relevant queries.
- Global state is actually global.
- Server-only and browser-only concerns are separated.
- You can explain every major architectural choice without relying on library slogans.
