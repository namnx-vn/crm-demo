import { queryOptions } from "@tanstack/react-query";

import type { Customer } from "./type";

export async function getCustomer(id: string): Promise<Customer> {
  const runtime = typeof window === "undefined" ? "server" : "browser";
  console.log(`[${runtime}] GET /users/${id}`);

  const response = await fetch(`https://dummyjson.com/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  return response.json();
}

export function customerQueryOptions(id: string) {
  return queryOptions({
    queryKey: ["customer", id],
    queryFn: () => getCustomer(id),
    staleTime: 60 * 1000,
  });
}
