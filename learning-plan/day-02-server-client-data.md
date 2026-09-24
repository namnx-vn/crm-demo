# Day 2 — Server vs Client Components + data fetching

## Learn
- Server Component
- Client Component
- `"use client"`
- async Server Components
- loading and error boundaries
- server/client serialization boundary

## Build
- Fetch `https://dummyjson.com/users?limit=10` in `/customers`.
- Render a customer table.
- Add `loading.tsx`.
- Add an error boundary where appropriate.
- Keep only interactive pieces as Client Components.

## Acceptance criteria
- Initial customer list is rendered from server-side code.
- The whole page is not converted to client-only just for one interaction.
- You can identify browser APIs/hooks that require a Client Component.

## Questions
- Can a Client Component still have HTML generated on the server?
- What changes when a file has `"use client"`?
- Why can Server Components reduce JavaScript sent to the browser?
