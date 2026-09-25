"use client";

import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useState } from "react";

type BalanceComponentProps = {
  customerId: string;
};

type BalanceResponse = {
  id: number;
  bank?: {
    cardType?: string;
    currency?: string;
    iban?: string;
  };
};

export default function BalanceComponent({ customerId }: BalanceComponentProps) {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshBalance() {
    try {
      setIsLoading(true);
      setError(null);

      // DEMO ONLY:
      // DummyJSON does not expose a real balance endpoint, so we fetch the user
      // in the browser and derive a fake balance from the id.
      // Open DevTools > Network and click the button: this request is visible
      // because this is a Client Component.
      const response = await fetch(`https://dummyjson.com/users/${customerId}`);

      if (!response.ok) {
        throw new Error("Failed to refresh balance");
      }

      const customer: BalanceResponse = await response.json();
      setBalance(customer.id * 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Balance demo — Client Component</Typography>

          <Typography>
            Balance: {balance === null ? "Not loaded" : `$${balance.toLocaleString()}`}
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="outlined"
            onClick={refreshBalance}
            disabled={isLoading}
            sx={{ alignSelf: "flex-start" }}
          >
            {isLoading ? "Refreshing..." : "Refresh balance"}
          </Button>

          <Typography variant="body2" color="text.secondary">
            This component uses useState + fetch on purpose. We will replace this
            manual server-state management with TanStack Query in the next case.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
