import { Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";

import Link from "@/components/Link";

const routes = [
  { href: "/", file: "src/app/page.tsx", label: "Home" },
  { href: "/dashboard", file: "src/app/dashboard/page.tsx", label: "Dashboard" },
  { href: "/customers", file: "src/app/customers/page.tsx", label: "Customers" },
  { href: "/customers/1", file: "src/app/customers/[id]/page.tsx", label: "Customer #1" },
];

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Day 1 — Next.js Foundation
          </Typography>
          <Typography variant="h3" component="h1" sx={{ mt: 1 }}>
            App Router playground
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Next.js maps folders inside src/app to URL segments. You do not configure a React Router route table for these pages.
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5">Route map</Typography>
              {routes.map((route) => (
                <Stack
                  key={route.href}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
                >
                  <Button component={Link} href={route.href} variant="outlined" sx={{ minWidth: 150 }}>
                    {route.label}
                  </Button>
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {route.href} → {route.file}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h5">Mental model</Typography>
              <Typography>1. Folder = URL segment.</Typography>
              <Typography>2. page.tsx = UI for that route.</Typography>
              <Typography>3. layout.tsx = shared wrapper for nested routes below it.</Typography>
              <Typography>4. [id] = dynamic URL segment, exposed through params.</Typography>
              <Typography>5. Components are Server Components by default unless a client boundary is required.</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
