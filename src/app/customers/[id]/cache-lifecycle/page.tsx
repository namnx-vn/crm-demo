import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import CacheLifecycleDemo from "./CacheLifecycleDemo";

export default async function CacheLifecyclePage({
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
            Case 6: staleTime vs gcTime
          </Typography>
          <Typography variant="h4" component="h1">
            Cache lifecycle for Customer #{id}
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2">
              This demo uses staleTime = 10 seconds and gcTime = 30 seconds so you can observe the difference quickly.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try: load the page, unmount the observer, wait less than 30 seconds and mount again. Then repeat and wait more than 30 seconds. Watch DevTools Network and the browser console.
            </Typography>
          </CardContent>
        </Card>

        <CacheLifecycleDemo customerId={id} />
      </Stack>
    </Box>
  );
}
