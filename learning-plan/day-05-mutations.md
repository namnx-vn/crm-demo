# Day 5 — Mutations, invalidation, optimistic update

## Learn
- `useMutation`
- `invalidateQueries`
- `setQueryData`
- mutation pending/error states
- optimistic update and rollback concepts

## Build
Create customer edit flow:

```text
/customers/[id]
-> edit form
-> PATCH DummyJSON
-> update or invalidate cache
-> UI reflects result
```

## Acceptance criteria
- Edit form handles pending/error states.
- Customer detail cache is updated or invalidated correctly.
- Customer list refreshes only when needed.
- You can explain invalidate vs direct cache update.

## Stretch goal
Implement an optimistic update and simulate a failed request to practice rollback.
