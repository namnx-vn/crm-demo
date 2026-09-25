"use client";

import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import type { Customer } from "@/features/customers/type";

async function getCustomer(id: string): Promise<Customer> {
  console.log(`[browser] GET customer ${id}`);

  const response = await fetch(`https://dummyjson.com/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  return response.json();
}

function useCustomer(id: string) {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomer(id),
  });
}

function Balance({ customerId }: { customerId: string }) {
  const { data, isPending, isFetching, error, refetch } = useCustomer(customerId);

  if (isPending) return <Typography>Balance: loading...</Typography>;
  if (error) return <Typography color="error">Balance error: {error.message}</Typography>;

  const demoBalance = data.id * 1000;

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">BalanceComponent</Typography>
          <Typography>Customer: {data.firstName}</Typography>
          <Typography>Demo balance: ${demoBalance.toLocaleString()}</Typography>
          <Button onClick={() => refetch()} disabled={isFetching} sx={{ alignSelf: "flex-start" }}>
            {isFetching ? "Refreshing..." : "Refetch customer"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function AccountSummary({ customerId }: { customerId: string }) {
  const { data, isPending, error, isFetching } = useCustomer(customerId);

  if (isPending) return <Typography>Account summary: loading...</Typography>;
  if (error) return <Typography color="error">Account error: {error.message}</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">AccountSummary</Typography>
        <Typography>Owner: {data.firstName} {data.lastName}</Typography>
        <Typography>Email: {data.email}</Typography>
        <Typography variant="body2" color="text.secondary">
          Query status: {isFetching ? "fetching" : "using cached data"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function CustomerQueryDemo({ customerId }: { customerId: string }) {
  return (
    <Stack spacing={2}>
      <Balance customerId={customerId} />
      <AccountSummary customerId={customerId} />
    </Stack>
  );
}
