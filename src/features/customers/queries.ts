import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "./api";

export const customerKeys = {
  all: ["customers"] as const,
};

export function useCustomers() {
  return useQuery({
    queryKey: customerKeys.all,
    queryFn: getCustomers,
  });
}