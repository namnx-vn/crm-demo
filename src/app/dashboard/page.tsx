import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Static route
          </Typography>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant="h6">Why does /dashboard work?</Typography>
              <Typography color="text.secondary">
                Because this file lives at src/app/dashboard/page.tsx. In the App Router, folders describe URL segments and page.tsx makes that segment routable.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
