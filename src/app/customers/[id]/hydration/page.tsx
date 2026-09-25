import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { customerQueryOptions } from "@/features/customers/customerQuery";
import HydratedCustomer from "./HydratedCustomer";

export default async function HydrationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Server-side QueryClient used only for this request/render.
  const queryClient = new QueryClient();

  // Fill the TanStack Query cache on the server before rendering the client component.
  await queryClient.query(customerQueryOptions(id));

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Case 3: Server prefetch + hydration
          </Typography>
          <Typography variant="h4" component="h1">
            Hydrated Customer #{id}
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Flow
            </Typography>
            <Typography component="pre" sx={{ whiteSpace: "pre-wrap", m: 0 }}>
              {`Server QueryClient\n  ↓ query(["customer", "${id}"])\n  ↓ dehydrate()\nHydrationBoundary\n  ↓\nBrowser QueryClient\n  ↓\nuseQuery(["customer", "${id}"]) uses hydrated data`}
            </Typography>
          </CardContent>
        </Card>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <HydratedCustomer customerId={id} />
        </HydrationBoundary>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Open DevTools &gt; Network and reload this page. The initial query is
              populated on the server and transferred into the client query cache.
              Then click “Refetch in browser” to explicitly make a client-side request.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
