import type { CustomerResponse } from "./type";

const BASE_URL = "https://dummyjson.com";

export async function getCustomers(): Promise<CustomerResponse> {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}
