# Next.js + Zustand + TanStack Query Learning Plan

Mục tiêu: từ 24/09 đến 30/09 có thể đọc codebase và tự triển khai feature thực tế với Next.js App Router, TanStack Query và Zustand.

Backend giả: DummyJSON (https://dummyjson.com)

## Project xuyên suốt

CRM Demo với các feature:
- Dashboard
- Customers list
- Customer detail
- Search
- Pagination
- Edit customer
- Loading, error, empty states
- Global UI state

## Kiến trúc mục tiêu

```text
Next.js App Router
├── Server Components
├── Client Components
├── TanStack Query -> server state
└── Zustand -> client/global UI state
```

## DummyJSON mapping

- GET /users -> customer list
- GET /users/:id -> customer detail
- GET /users/search?q=... -> customer search
- PATCH /users/:id -> edit customer
- POST /users/add -> create customer

Lưu ý: DummyJSON mô phỏng mutation nhưng không lưu dữ liệu vĩnh viễn.

## Plan

- [Day 1](./day-01-nextjs-foundation.md) — App Router, layout, dynamic route
- [Day 2](./day-02-server-client-data.md) — Server/Client Components, data fetching
- [Day 3](./day-03-rendering-route-handlers.md) — rendering, caching, Route Handlers
- [Day 4](./day-04-tanstack-query.md) — TanStack Query fundamentals
- [Day 5](./day-05-mutations.md) — mutations, invalidation, optimistic update
- [Day 6](./day-06-zustand.md) — Zustand and state ownership
- [Day 7](./day-07-integration.md) — end-to-end CRM feature

## Rule quan trọng

```text
API/server data -> TanStack Query hoặc Server Component fetching
Local UI state -> useState
Shared client/UI state -> Zustand
Shareable filters/search/page -> ưu tiên URL search params
```

Không copy API response từ TanStack Query sang Zustand nếu không có lý do đặc biệt.

## Definition of done

Bạn cần tự giải thích và code được:
- App Router
- Server vs Client Components
- loading/error boundaries
- Route Handlers
- query keys và cache behavior
- useMutation + invalidateQueries
- optimistic update concept
- Zustand store/actions/selectors
- state ownership decisions
