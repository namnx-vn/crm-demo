"use client";

import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useCustomers } from "@/features/customers/queries";
import BulkActionBar from "./BulkActionBar";
import CustomerRow from "./CustomerRow";

export default function CustomerTable() {
  const { data, isLoading, isError } = useCustomers();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load customers.</Alert>;
  }

  return (
    <>
      <BulkActionBar />

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
            {data?.users.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
