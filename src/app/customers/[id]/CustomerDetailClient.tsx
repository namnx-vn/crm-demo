"use client";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";

import Link from "@/components/Link";
import { updateCustomerFirstName } from "@/features/customers/api";
import { customerQueryOptions } from "@/features/customers/customerQuery";
import { customerKeys } from "@/features/customers/queries";
import type {
  Customer,
  CustomerResponse,
} from "@/features/customers/type";

type CustomerDetailClientProps = {
  customerId: string;
  initialCustomer: Customer;
};

export default function CustomerDetailClient({
  customerId,
  initialCustomer,
}: CustomerDetailClientProps) {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState(initialCustomer.firstName);

  const { data: customer, isFetching } = useQuery({
    ...customerQueryOptions(customerId),
    initialData: initialCustomer,
  });

  const mutation = useMutation({
    mutationFn: updateCustomerFirstName,
    onSuccess: async (updatedCustomer) => {
      queryClient.setQueryData(
        customerKeys.detail(customerId),
        updatedCustomer,
      );

      queryClient.setQueriesData<CustomerResponse>(
        { queryKey: customerKeys.lists() },
        (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            users: current.users.map((item) =>
              item.id === updatedCustomer.id ? updatedCustomer : item,
            ),
          };
        },
      );

      setFirstName(updatedCustomer.firstName);

      await queryClient.invalidateQueries({
        queryKey: customerKeys.detail(customerId),
      });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedFirstName = firstName.trim();

    if (!normalizedFirstName || normalizedFirstName === customer.firstName) {
      return;
    }

    mutation.mutate({
      id: customerId,
      firstName: normalizedFirstName,
    });
  }

  const fullName = `${customer.firstName} ${customer.lastName}`;
  const hasChange =
    firstName.trim().length > 0 && firstName.trim() !== customer.firstName;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Final integration: Server initial data + TanStack Query mutation
          </Typography>
          <Typography variant="h4" component="h1">
            Customer #{customerId}
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
            >
              <Avatar
                src={customer.image}
                alt={fullName}
                sx={{ width: 88, height: 88 }}
              />

              <Box sx={{ flex: 1 }}>
                <Typography variant="h5">{fullName}</Typography>
                <Typography>{customer.email}</Typography>
                <Typography>{customer.phone}</Typography>
                <Typography>Age: {customer.age}</Typography>
                {isFetching && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Refreshing customer cache…
                  </Typography>
                )}
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Stack component="form" spacing={2} onSubmit={handleSubmit}>
              <Box>
                <Typography variant="h6">Edit customer</Typography>
                <Typography variant="body2" color="text.secondary">
                  This demo edits the first name, then refreshes the detail cache and updates matching list caches.
                </Typography>
              </Box>

              <TextField
                label="First name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  if (mutation.isSuccess || mutation.isError) {
                    mutation.reset();
                  }
                }}
                size="small"
                sx={{ maxWidth: 420 }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={mutation.isPending || !hasChange}
                sx={{ alignSelf: "flex-start" }}
              >
                {mutation.isPending ? "Saving…" : "Save changes"}
              </Button>

              {mutation.isError && (
                <Alert severity="error">{mutation.error.message}</Alert>
              )}

              {mutation.isSuccess && (
                <Alert severity="success">
                  Customer updated. The detail query was invalidated and refetched.
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Box>
          <Button component={Link} href="/customers" variant="outlined">
            Back to customers
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
