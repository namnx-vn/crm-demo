"use client";

import { Alert, Button, Container, Stack } from "@mui/material";

export default function CustomersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Alert severity="error">
        <Stack spacing={2}>
          <span>{error.message || "Something went wrong while loading customers."}</span>
          <Button
            variant="outlined"
            color="inherit"
            onClick={reset}
            sx={{ alignSelf: "flex-start" }}
          >
            Try again
          </Button>
        </Stack>
      </Alert>
    </Container>
  );
}
