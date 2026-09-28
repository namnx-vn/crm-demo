import { queryOptions } from "@tanstack/react-query";

import { customerKeys } from "./queries";
import type { Customer } from "./type";

export async function getCustomer(
  id: string,
  signal?: AbortSignal,
): Promise<Customer> {
  const isServer = typeof window === "undefined";
  const url = isServer
    ? `https://dummyjson.com/users/${id}`
    : `/api/demo/customer?id=${id}`;

  const response = await fetch(url, {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  return response.json();
}

export function customerQueryOptions(id: string) {
  return queryOptions({
    queryKey: customerKeys.detail(id),
    queryFn: ({ signal }) => getCustomer(id, signal),
    staleTime: 60 * 1000,
  });
}
