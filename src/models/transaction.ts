export interface User {
  id: string;
  name: string;
}

export interface Transaction {
  _id?: string;
  user: User;
  type: "purchase" | "withdrawal";
  amount: number;
  currency: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  createdAt?: Date;
}
