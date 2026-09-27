"use client";

import { Button, Paper, Stack, Typography } from "@mui/material";

import { useUiStore } from "@/features/ui/useUiStore";

export default function BulkActionBar() {
  const selectedCount = useUiStore(
    (state) => state.selectedCustomerIds.length,
  );
  const clearSelectedCustomers = useUiStore(
    (state) => state.clearSelectedCustomers,
  );

  if (selectedCount === 0) {
    return null;
  }

  return (
    <Paper sx={{ mb: 2, p: 2 }} variant="outlined">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography>{selectedCount} customers selected</Typography>
        <Button onClick={clearSelectedCustomers}>Clear</Button>
      </Stack>
    </Paper>
  );
}
