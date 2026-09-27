# Day 6 — Zustand and state ownership

## Learn
- `create`
- state and actions
- selectors
- avoiding unnecessary re-renders
- `persist` and `partialize`
- Next.js hydration concerns with persisted browser state
- Zustand vs local state vs TanStack Query vs URL state

## State ownership rule

```text
Server/API state       -> TanStack Query
Local UI state         -> useState
Shared client/UI state -> Zustand
Shareable state        -> URL searchParams
```

Examples:

```text
customers           -> TanStack Query
selectedCustomerIds -> Zustand
sidebarCollapsed    -> Zustand
editModalOpen       -> useState
search/page/sort    -> URL searchParams
```

Do not copy customer API responses from TanStack Query into Zustand without a specific reason.

## Code example

The CRM now includes a working Zustand selection example:

- `src/features/ui/useUiStore.ts` — state, actions, immutable updates, `persist`, `partialize`
- `src/components/customer/CustomerRow.tsx` — narrow selector per row
- `src/components/customer/BulkActionBar.tsx` — subscribes only to selected count + clear action
- `src/components/customer/CustomerTable.tsx` — integrates the example into the customer table

### Narrow selectors

Avoid subscribing to the whole store:

```ts
const store = useUiStore();
```

Prefer subscribing only to the value a component needs:

```ts
const isSelected = useUiStore((state) =>
  state.selectedCustomerIds.includes(customer.id),
);
```

With this selector, changing customer 1 from unselected to selected does not require every other row to re-render because their selector result remains `false`.

## Immutable updates

Do not mutate the existing array:

```ts
// bad
state.selectedCustomerIds.push(id);

// good
[...state.selectedCustomerIds, id];
```

For the current CRM selection size (roughly 0–50 IDs), `number[]` is simpler than `Set<number>`. Consider `Set` only when lookup scale justifies the extra complexity.

## Persist

Persist durable UI preferences such as:

```text
sidebarCollapsed
tableDensity
theme
```

Temporary interaction state such as `selectedCustomerIds` normally should not survive refresh.

Use `partialize` to persist only the intended fields:

```ts
partialize: (state) => ({
  sidebarCollapsed: state.sidebarCollapsed,
  tableDensity: state.tableDensity,
});
```

With Next.js, remember that `localStorage` exists only in the browser. Rendering a persisted value that differs from the server default can cause hydration issues or visible UI flashes. Global visual preferences such as theme may be better stored somewhere the server can read, such as a cookie.

## Acceptance criteria
- Components subscribe with narrow selectors.
- Shared UI state works across distant components.
- TanStack Query remains the owner of remote customer data.
- Local state stays local when global state is unnecessary.
- Only durable UI preferences are persisted.

## Questions
- Zustand vs TanStack Query?
- When is `useState` better than Zustand?
- Why can broad store subscriptions cause unnecessary re-renders?
- Which UI states should survive refresh?
- What hydration problem can `localStorage`-backed state introduce in Next.js?
