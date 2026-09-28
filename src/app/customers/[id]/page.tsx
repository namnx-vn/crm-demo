import CustomerDetailClient from "./CustomerDetailClient";

import { getCustomer } from "@/features/customers/customerQuery";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await getCustomer(id);

  return (
    <CustomerDetailClient
      customerId={id}
      initialCustomer={customer}
    />
  );
}
