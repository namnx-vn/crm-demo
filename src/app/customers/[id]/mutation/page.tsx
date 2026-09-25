import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import MutationDemo from "./MutationDemo";

export default async function MutationPage({
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
            Case 4: Mutation + invalidateQueries
          </Typography>
          <Typography variant="h4" component="h1">
            Update Customer #{id}
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Typography component="pre" sx={{ whiteSpace: "pre-wrap", m: 0 }}>
              {`useQuery([customer, id])\n        ↓\nshow customer\n        ↓\nuseMutation(PATCH)\n        ↓ success\ninvalidateQueries([customer, id])\n        ↓\nquery becomes stale + active query refetches\n        ↓\nall subscribers receive fresh data`}
            </Typography>
          </CardContent>
        </Card>

        <MutationDemo customerId={id} />

        <Typography variant="body2" color="text.secondary">
          This page uses a demo API backed by in-memory server state, so changes reset when the development server restarts. It exists only to make mutation and invalidation behavior easy to observe.
        </Typography>
      </Stack>
    </Box>
  );
}
