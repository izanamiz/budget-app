export type TransactionRequest = {
  price: number;
  type: string;
  scheduledAt: Date;
  categoryId: string;
  note?: string;
};

export type TransactionResponse = {
  price: number;
  type: string;
  scheduledAt: string;
  categoryId: string;
  note?: string;
  _id: string;
  create_at: string;
};
