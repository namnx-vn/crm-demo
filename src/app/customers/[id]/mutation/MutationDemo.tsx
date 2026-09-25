"use client";

import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

import type { Customer } from "@/features/customers/type";

function customerQueryKey(id: string) {
  return ["mutation-demo-customer", id] as const;
}

async function getCustomer(id: string): Promise<Customer> {
  const response = await fetch(`/api/demo/customer?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to load customer");
  }

  return response.json();
}

async function updateCustomerFirstName(input: {
  id: string;
  firstName: string;
}): Promise<Customer> {
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

function CustomerHeader({ customerId }: { customerId: string }) {
  const { data, isPending, isFetching } = useQuery({
    queryKey: customerQueryKey(customerId),
    queryFn: () => getCustomer(customerId),
    staleTime: 60_000,
  });

  if (isPending) {
    return <Typography>Loading customer...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">CustomerHeader</Typography>
        <Typography variant="h5">
          {data.firstName} {data.lastName}
        </Typography>
        <Typography>{data.email}</Typography>
        <Typography variant="body2" color="text.secondary">
          {isFetching ? "Refetching after invalidation..." : "Using query cache"}
        </Typography>
      </CardContent>
    </Card>
  );
}

function EditCustomerName({ customerId }: { customerId: string }) {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState("");

  const mutation = useMutation({
    mutationFn: updateCustomerFirstName,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: customerQueryKey(customerId),
      });
      setFirstName("");
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firstName.trim()) {
      return;
    }

    mutation.mutate({
      id: customerId,
      firstName,
    });
  }

  return (
    <Card>
      <CardContent>
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <Typography variant="h6">EditCustomerName</Typography>

          <TextField
            label="New first name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            size="small"
          />

          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending || !firstName.trim()}
            sx={{ alignSelf: "flex-start" }}
          >
            {mutation.isPending ? "Saving..." : "Save name"}
          </Button>

          {mutation.isError && (
            <Typography color="error">{mutation.error.message}</Typography>
          )}

          {mutation.isSuccess && (
            <Typography color="success.main">
              Mutation succeeded. The customer query was invalidated and refetched.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function MutationDemo({ customerId }: { customerId: string }) {
  return (
    <Stack spacing={2}>
      <CustomerHeader customerId={customerId} />
      <EditCustomerName customerId={customerId} />
    </Stack>
  );
}
