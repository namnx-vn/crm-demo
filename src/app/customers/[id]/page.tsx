import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";

import Link from "@/components/Link";
import type { Customer } from "@/features/customers/type";
import BalanceComponent from "./BalanceComponent";

async function getCustomer(id: string): Promise<Customer> {
  // This fetch runs in the Server Component.
  // It is used for data needed to render the initial customer information.
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
            Case 1: Server fetch + small Client Component boundary
          </Typography>
          <Typography variant="h4" component="h1">
            Customer #{id}
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

        <BalanceComponent customerId={id} />

        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              What to observe
            </Typography>
            <Typography variant="body2">
              Customer information is fetched by page.tsx on the server. The
              balance area is isolated as a Client Component because it needs a
              click handler and local state. Click Refresh balance and inspect
              DevTools &gt; Network to see the browser request.
            </Typography>
          </CardContent>
        </Card>

        <Box>
          <Button component={Link} href="/customers" variant="contained">
            Back to customers
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
