"use client";

import Link from "next/link";
import {
  Avatar,
  Checkbox,
  Link as MuiLink,
  TableCell,
  TableRow,
} from "@mui/material";

import type { Customer } from "@/features/customers/type";
import { useUiStore } from "@/features/ui/useUiStore";

type CustomerRowProps = {
  customer: Customer;
};

export default function CustomerRow({ customer }: CustomerRowProps) {
  // Narrow selector: this row re-renders only when its own selected value changes.
  const isSelected = useUiStore((state) =>
    state.selectedCustomerIds.includes(customer.id),
  );
  const toggleCustomer = useUiStore((state) => state.toggleCustomer);

  return (
    <TableRow hover selected={isSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={() => toggleCustomer(customer.id)}
          inputProps={{ "aria-label": `Select customer ${customer.id}` }}
        />
      </TableCell>

      <TableCell>
        <MuiLink component={Link} href={`/customers/${customer.id}`}>
          {customer.id}
        </MuiLink>
      </TableCell>

      <TableCell>
        <Avatar
          src={customer.image}
          alt={`${customer.firstName} ${customer.lastName}`}
        />
      </TableCell>

      <TableCell>
        <MuiLink component={Link} href={`/customers/${customer.id}`}>
          {customer.firstName} {customer.lastName}
        </MuiLink>
      </TableCell>

      <TableCell>{customer.email}</TableCell>
      <TableCell>{customer.phone}</TableCell>
      <TableCell>{customer.age}</TableCell>
    </TableRow>
  );
}
