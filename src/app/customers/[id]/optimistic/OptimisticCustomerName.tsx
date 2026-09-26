"use client";

import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

import type { Customer } from "@/features/customers/type";

const customerQueryKey = (id: string) => ["optimistic-customer", id] as const;

async function getCustomer(id: string): Promise<Customer> {
  const response = await fetch(`https://dummyjson.com/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  return response.json();
}

async function updateCustomerName({
  id,
  firstName,
}: {
  id: string;
  firstName: string;
}): Promise<Customer> {
  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName }),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  return response.json();
}

export default function OptimisticCustomerName({ customerId }: { customerId: string }) {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState("");

  const customerQuery = useQuery({
    queryKey: customerQueryKey(customerId),
    queryFn: () => getCustomer(customerId),
  });

  const mutation = useMutation({
    mutationFn: updateCustomerName,

    onMutate: async ({ firstName: nextFirstName }) => {
      await queryClient.cancelQueries({ queryKey: customerQueryKey(customerId) });

      const previousCustomer = queryClient.getQueryData<Customer>(
        customerQueryKey(customerId),
      );

      queryClient.setQueryData<Customer>(customerQueryKey(customerId), (current) => {
        if (!current) return current;

        return {
          ...current,
          firstName: nextFirstName,
        };
      });

      return { previousCustomer };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousCustomer) {
        queryClient.setQueryData(
          customerQueryKey(customerId),
          context.previousCustomer,
        );
      }
    },

    onSuccess: (updatedCustomer) => {
      queryClient.setQueryData(customerQueryKey(customerId), updatedCustomer);
      setFirstName("");
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: customerQueryKey(customerId) });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = firstName.trim();
    if (!value) return;

    mutation.mutate({ id: customerId, firstName: value });
  }

  if (customerQuery.isPending) {
    return <Typography>Loading customer...</Typography>;
  }

  if (customerQuery.error) {
    return <Alert severity="error">{customerQuery.error.message}</Alert>;
  }

  const customer = customerQuery.data;

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h6">Current cached customer</Typography>
          <Typography variant="h4" sx={{ mt: 1 }}>
            {customer.firstName} {customer.lastName}
          </Typography>
          <Typography color="text.secondary">{customer.email}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <Typography variant="h6">Optimistic name update</Typography>

            <TextField
              label="New first name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={mutation.isPending || !firstName.trim()}
              sx={{ alignSelf: "flex-start" }}
            >
              {mutation.isPending ? "Saving..." : "Save optimistically"}
            </Button>

            <Typography variant="body2" color="text.secondary">
              The cache is updated in onMutate before the PATCH finishes. If the
              request fails, onError restores the previous cached customer.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {mutation.error && <Alert severity="error">{mutation.error.message}</Alert>}
    </Stack>
  );
}
