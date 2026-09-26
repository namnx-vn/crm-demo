"use client";

import { Alert, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { Customer } from "@/features/customers/type";

const queryKey = (id: string) => ["cache-lifecycle-customer", id] as const;

async function getCustomer(id: string): Promise<Customer> {
  console.log(`[browser] GET /users/${id} at ${new Date().toLocaleTimeString()}`);

  const response = await fetch(`https://dummyjson.com/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  return response.json();
}

function CustomerObserver({ customerId }: { customerId: string }) {
  const query = useQuery({
    queryKey: queryKey(customerId),
    queryFn: () => getCustomer(customerId),
    staleTime: 10_000,
    gcTime: 30_000,
  });

  if (query.isPending) {
    return <Typography>Initial load: no cached data yet...</Typography>;
  }

  if (query.error) {
    return <Alert severity="error">{query.error.message}</Alert>;
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">
            {query.data.firstName} {query.data.lastName}
          </Typography>
          <Typography>{query.data.email}</Typography>
          <Typography variant="body2">
            isPending: {String(query.isPending)}
          </Typography>
          <Typography variant="body2">
            isFetching: {String(query.isFetching)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            staleTime = 10 seconds, gcTime = 30 seconds
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function CacheLifecycleDemo({ customerId }: { customerId: string }) {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(true);
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const cachedCustomer = queryClient.getQueryData<Customer>(queryKey(customerId));

  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Observer controls</Typography>
            <Typography variant="body2">
              Mount the observer to subscribe to the query. Unmount it to make the query inactive.
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={() => setMounted(true)} disabled={mounted}>
                Mount observer
              </Button>
              <Button variant="outlined" onClick={() => setMounted(false)} disabled={!mounted}>
                Unmount observer
              </Button>
            </Stack>
            <Typography variant="body2">
              Cache snapshot right now: {cachedCustomer ? `${cachedCustomer.firstName} ${cachedCustomer.lastName}` : "empty"}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {mounted ? (
        <CustomerObserver customerId={customerId} />
      ) : (
        <Alert severity="info">
          Observer unmounted. The query is inactive, but the cache may still exist until gcTime expires.
        </Alert>
      )}
    </Stack>
  );
}
