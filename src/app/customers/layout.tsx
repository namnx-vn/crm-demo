import Link from "next/link";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

export default function CustomersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box>
      <Box sx={{ px: 4, pt: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6">Customers layout</Typography>
          <Button component={Link} href="/customers" size="small">
            Customer list
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This UI comes from src/app/customers/layout.tsx and wraps every route under /customers.
        </Typography>
      </Box>

      <Divider sx={{ mt: 2 }} />

      {children}
    </Box>
  );
}
