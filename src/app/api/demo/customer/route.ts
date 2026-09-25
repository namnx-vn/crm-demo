import type { Customer } from "@/features/customers/type";

const customerStore = new Map<string, Customer>();

async function loadCustomer(id: string): Promise<Customer> {
  const cached = customerStore.get(id);

  if (cached) {
    return cached;
  }

  const response = await fetch(`https://dummyjson.com/users/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load customer");
  }

  const customer: Customer = await response.json();
  customerStore.set(id, customer);
  return customer;
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");

  if (!id) {
    return Response.json({ message: "Missing id" }, { status: 400 });
  }

  try {
    const customer = await loadCustomer(id);
    return Response.json(customer);
  } catch {
    return Response.json({ message: "Failed to load customer" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    id?: string;
    firstName?: string;
  };

  if (!body.id || !body.firstName?.trim()) {
    return Response.json(
      { message: "id and firstName are required" },
      { status: 400 },
    );
  }

  try {
    const currentCustomer = await loadCustomer(body.id);
    const updatedCustomer: Customer = {
      ...currentCustomer,
      firstName: body.firstName.trim(),
    };

    customerStore.set(body.id, updatedCustomer);
    return Response.json(updatedCustomer);
  } catch {
    return Response.json({ message: "Failed to update customer" }, { status: 500 });
  }
}
