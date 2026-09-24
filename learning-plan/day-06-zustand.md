# Day 6 — Zustand and state ownership

## Learn
- `create`
- state and actions
- selectors
- avoiding unnecessary re-renders
- persist middleware concept
- Zustand vs Context vs local state vs TanStack Query

## Build
Create a Zustand store only for shared client/UI state, for example:

```text
sidebarOpen
customerTableDensity
selectedCustomerIds
filterPanelOpen
```

Do not put customer API responses into Zustand.

## Acceptance criteria
- Components subscribe with narrow selectors.
- Shared UI state works across distant components.
- TanStack Query remains the owner of remote customer data.
- Local state stays local when global state is unnecessary.

## Questions
- Zustand vs Context?
- Zustand vs TanStack Query?
- When is `useState` better than Zustand?
- Why can broad store subscriptions cause unnecessary re-renders?
