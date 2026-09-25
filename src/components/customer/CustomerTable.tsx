"use client";

import {
  Alert,
  Avatar,
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

export default function CustomerTable() {
  const { data, isLoading, isError } = useCustomers();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load customers.</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
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
            <TableRow key={customer.id} hover>
              <TableCell>{customer.id}</TableCell>

              <TableCell>
                <Avatar
                  src={customer.image}
                  alt={`${customer.firstName} ${customer.lastName}`}
                />
              </TableCell>

              <TableCell>
                {customer.firstName} {customer.lastName}
              </TableCell>

              <TableCell>{customer.email}</TableCell>

              <TableCell>{customer.phone}</TableCell>

              <TableCell>{customer.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}