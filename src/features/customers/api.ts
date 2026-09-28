import type { Customer, CustomerResponse } from "./type";

const BASE_URL = "https://dummyjson.com";

export const CUSTOMERS_PAGE_SIZE = 10;

export type CustomerListParams = {
  search: string;
  page: number;
  pageSize?: number;
};

export type UpdateCustomerFirstNameInput = {
  id: string;
  firstName: string;
};

export async function getCustomers(
  { search, page, pageSize = CUSTOMERS_PAGE_SIZE }: CustomerListParams,
  signal?: AbortSignal,
): Promise<CustomerResponse> {
  const normalizedSearch = search.trim();
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * pageSize;
  const url = new URL(
    normalizedSearch ? "/users/search" : "/users",
    BASE_URL,
  );

  if (normalizedSearch) {
    url.searchParams.set("q", normalizedSearch);
  }

  url.searchParams.set("limit", String(pageSize));
  url.searchParams.set("skip", String(skip));

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}

export async function updateCustomerFirstName(
  input: UpdateCustomerFirstNameInput,
): Promise<Customer> {
  const response = await fetch("/api/demo/customer", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  return response.json();
}
