import { Container, Typography } from "@mui/material";

import CustomerTable from "@/components/customer/CustomerTable";

export default function CustomersPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Customers
      </Typography>

      <CustomerTable />
    </Container>
  );
}