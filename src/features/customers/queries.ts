import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  CUSTOMERS_PAGE_SIZE,
  getCustomers,
  type CustomerListParams,
} from "./api";

export type CustomerListQuery = Pick<CustomerListParams, "search" | "page">;

export const customerKeys = {
  all: ["customers"] as const,
  lists: () => [...customerKeys.all, "list"] as const,
  list: (params: CustomerListParams) =>
    [...customerKeys.lists(), params] as const,
  details: () => [...customerKeys.all, "detail"] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};

export function useCustomers({ search, page }: CustomerListQuery) {
  const params: CustomerListParams = {
    search: search.trim(),
    page: Math.max(1, page),
    pageSize: CUSTOMERS_PAGE_SIZE,
  };

  return useQuery({
    queryKey: customerKeys.list(params),
    queryFn: ({ signal }) => getCustomers(params, signal),
    placeholderData: keepPreviousData,
  });
}
