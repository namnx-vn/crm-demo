# Day 7 — End-to-end CRM integration

Build one complete feature without following a tutorial line by line.

## Status

Implemented in the main CRM flow.

## `/customers`
- list
- search
- pagination
- customer detail link
- loading state
- error state
- empty state

URL is the source of truth for shareable list state:

```text
/customers?search=Emily&page=2
        ↓
page.tsx parses searchParams
        ↓
CustomerTable receives search/page
        ↓
queryKey = ["customers", "list", { search, page, pageSize }]
        ↓
DummyJSON request uses q + skip + limit
```

Search resets the page to 1. Pagination changes only the URL. Changing the URL changes the query key, so TanStack Query owns each server-state cache entry separately.

The query function receives TanStack Query's `AbortSignal` and passes it to `fetch`.

## `/customers/[id]`
- customer profile
- edit form
- mutation
- cache refresh

The page remains a Server Component and fetches the initial customer. `CustomerDetailClient` owns the interactive edit flow.

After a successful edit:

1. update the detail cache immediately with `setQueryData`
2. update any existing customer-list caches with `setQueriesData`
3. invalidate the detail query
4. the active detail query refetches the latest mock value

DummyJSON does not persist mutations permanently, so the demo Route Handler keeps an in-memory edited customer for the learning flow.

## Global UI

Zustand owns genuinely shared client UI state:

- sidebar preference
- table density preference
- selected customer IDs

Persist only durable UI preferences. Row selection remains temporary interaction state.

## State ownership decision tree

```text
Data from API/server?
├── yes -> Server Component fetching or TanStack Query
└── no
    └── Shareable in URL?
        ├── yes -> searchParams
        └── no
            └── Local to one component?
                ├── yes -> useState
                └── no -> Zustand if distant components need it
```

Do not copy TanStack Query API responses into Zustand.

## Main code references

```text
src/app/customers/page.tsx
src/app/customers/loading.tsx
src/app/customers/error.tsx
src/components/customer/CustomerTable.tsx
src/components/customer/CustomerRow.tsx
src/app/customers/[id]/page.tsx
src/app/customers/[id]/CustomerDetailClient.tsx
src/features/customers/api.ts
src/features/customers/queries.ts
src/features/customers/customerQuery.ts
src/features/ui/useUiStore.ts
```

## Final review checklist
- [x] No unnecessary root-level `"use client"`.
- [x] API data is not duplicated into Zustand.
- [x] Query keys include parameters that change server data.
- [x] Mutations update/invalidate only relevant queries.
- [x] Global state is actually global.
- [x] Search/page use URL search params.
- [x] Loading, error and empty states exist.
- [x] Server-only and browser-only concerns are separated.
- [x] The main CRM flow integrates Next.js + TanStack Query + Zustand.

## Mental model to remember

```text
URL            -> navigation/shareable state
TanStack Query -> remote server state + cache
Zustand        -> shared client UI state
useState       -> local interaction/form draft state
Server Component -> server rendering / initial data
Client Component -> browser interaction
```
