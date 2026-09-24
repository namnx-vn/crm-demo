# Day 4 — TanStack Query fundamentals

## Learn
- QueryClient
- QueryClientProvider
- useQuery
- query keys
- staleTime
- refetching
- server state vs client state

## Build
Add TanStack Query for an interactive customer-list flow.

Suggested query key:

```ts
['customers', { page, search }]
```

Implement loading, error, success, search and pagination.

## Acceptance criteria
- Search/page combinations create predictable cache entries.
- API response is not copied into Zustand.
- Query keys are stable and descriptive.

## Questions
- Why is API data server state?
- What does staleTime mean?
- Why can `['customers']` be too broad?
