"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";

import { CUSTOMERS_PAGE_SIZE } from "@/features/customers/api";
import { useCustomers } from "@/features/customers/queries";
import BulkActionBar from "./BulkActionBar";
import CustomerRow from "./CustomerRow";

type CustomerTableProps = {
  search: string;
  page: number;
};

function buildCustomersUrl(search: string, page: number) {
  const params = new URLSearchParams();
  const normalizedSearch = search.trim();

  if (normalizedSearch) {
    params.set("search", normalizedSearch);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/customers?${query}` : "/customers";
}

export default function CustomerTable({ search, page }: CustomerTableProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(search);
  const { data, isPending, isFetching, isError, error, refetch } = useCustomers({
    search,
    page,
  });

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const customers = data?.users ?? [];
  const total = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / CUSTOMERS_PAGE_SIZE));

  useEffect(() => {
    if (data && total > 0 && page > pageCount) {
      router.replace(buildCustomersUrl(search, pageCount), { scroll: false });
    }
  }, [data, page, pageCount, router, search, total]);

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.replace(buildCustomersUrl(searchInput, 1), { scroll: false });
  }

  function handlePageChange(_event: ChangeEvent<unknown>, nextPage: number) {
    router.replace(buildCustomersUrl(search, nextPage), { scroll: false });
  }

  return (
    <Stack spacing={2}>
      <Stack
        component="form"
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        onSubmit={handleSearchSubmit}
      >
        <TextField
          label="Search customers"
          placeholder="e.g. Emily"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          size="small"
          fullWidth
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
        {(search || page > 1) && (
          <Button
            type="button"
            variant="outlined"
            onClick={() => router.replace("/customers", { scroll: false })}
          >
            Clear
          </Button>
        )}
      </Stack>

      <BulkActionBar />

      {isError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          {error.message || "Failed to load customers."}
        </Alert>
      ) : isPending ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
          >
            <Typography variant="body2" color="text.secondary">
              {total} customer{total === 1 ? "" : "s"}
              {search ? ` matching “${search}”` : ""}
            </Typography>
            {isFetching && (
              <Typography variant="body2" color="text.secondary">
                Refreshing…
              </Typography>
            )}
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>ID</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <CustomerRow key={customer.id} customer={customer} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <Typography variant="h6">No customers found</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try a different search term.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {total > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={pageCount}
                page={Math.min(page, pageCount)}
                onChange={handlePageChange}
                disabled={isFetching}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Stack>
  );
}
