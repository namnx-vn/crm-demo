import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import OptimisticCustomerName from "./OptimisticCustomerName";

export default async function OptimisticUpdatePage({
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
            Case 5: Optimistic update
          </Typography>
          <Typography variant="h4" component="h1">
            Customer #{id}
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Flow
            </Typography>
            <Typography component="pre" sx={{ whiteSpace: "pre-wrap", m: 0 }}>
              {`onMutate\n  ↓ save previous cache\n  ↓ update cache immediately\nUI changes before PATCH finishes\n  ↓\nPATCH /users/${id}\n  ↓ success → keep server response\n  ↓ error   → rollback previous cache\n  ↓\nonSettled → invalidate for final sync`}
            </Typography>
          </CardContent>
        </Card>

        <OptimisticCustomerName customerId={id} />
      </Stack>
    </Box>
  );
}
