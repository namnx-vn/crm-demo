import Link from "next/link";
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";

import type { Customer } from "@/features/customers/type";

async function getCustomer(id: string): Promise<Customer> {
  const response = await fetch(`https://dummyjson.com/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch customer");
  }

  return response.json();
}

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await getCustomer(id);

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Dynamic route: /customers/[id]
          </Typography>
          <Typography variant="h4" component="h1">
            Customer #{id}
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ xs: "flex-start", sm: "center" }}>
              <Avatar
                src={customer.image}
                alt={`${customer.firstName} ${customer.lastName}`}
                sx={{ width: 88, height: 88 }}
              />

              <Box>
                <Typography variant="h5">
                  {customer.firstName} {customer.lastName}
                </Typography>
                <Typography>{customer.email}</Typography>
                <Typography>{customer.phone}</Typography>
                <Typography>Age: {customer.age}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            URL /customers/{id} matched src/app/customers/[id]/page.tsx. The customers layout remains around this page.
          </Typography>

          <Button component={Link} href="/customers" variant="contained">
            Back to customers
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
