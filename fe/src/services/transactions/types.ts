export type TransactionRequest = {
  price: number;
  type: string;
  categoryId: string;
};

export type TransactionResponse = {
  price: number;
  type: string;
  categoryId: string;
  _id: string;
  create_at: string;
};
