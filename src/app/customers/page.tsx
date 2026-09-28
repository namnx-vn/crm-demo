import { Container, Typography } from "@mui/material";

import CustomerTable from "@/components/customer/CustomerTable";

type CustomersPageProps = {
  searchParams: Promise<{
    search?: string | string[];
    page?: string | string[];
  }>;
};

function getFirstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const params = await searchParams;
  const search = getFirstValue(params.search)?.trim() ?? "";
  const rawPage = Number(getFirstValue(params.page) ?? "1");
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        Customers
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Search and pagination live in the URL. TanStack Query owns the remote data.
      </Typography>

      <CustomerTable search={search} page={page} />
    </Container>
  );
}
