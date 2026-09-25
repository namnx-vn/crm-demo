"use client";

import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { customerQueryOptions } from "@/features/customers/customerQuery";

export default function HydratedCustomer({ customerId }: { customerId: string }) {
  const { data, isPending, isFetching, error, refetch } = useQuery(
    customerQueryOptions(customerId),
  );

  if (isPending) {
    return <Typography>Loading on client...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6">Hydrated Client Component</Typography>
          <Typography>
            {data.firstName} {data.lastName}
          </Typography>
          <Typography>{data.email}</Typography>
          <Typography variant="body2" color="text.secondary">
            Initial data came from the server-side TanStack Query cache. With a fresh
            staleTime, useQuery can render from the hydrated cache instead of starting
            with an empty client cache.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => refetch()}
            disabled={isFetching}
            sx={{ alignSelf: "flex-start" }}
          >
            {isFetching ? "Refetching..." : "Refetch in browser"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
