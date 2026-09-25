import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import CustomerQueryDemo from "./CustomerQueryDemo";

export default async function ClientFetchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Case 2: TanStack Query client fetch
          </Typography>
          <Typography variant="h4" component="h1">
            Shared server state for Customer #{id}
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Typography>
              BalanceComponent and AccountSummary both call the same useCustomer hook with the same queryKey: ["customer", id].
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Open DevTools &gt; Network, reload this page, and filter by users. Even though two components subscribe to the query, TanStack Query shares the query/cache instead of each component manually owning a separate fetch state.
            </Typography>
          </CardContent>
        </Card>

        <CustomerQueryDemo customerId={id} />
      </Stack>
    </Box>
  );
}
