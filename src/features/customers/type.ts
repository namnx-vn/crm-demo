export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  image: string;
}

export interface CustomerResponse {
  users: Customer[];
  total: number;
  skip: number;
  limit: number;
}