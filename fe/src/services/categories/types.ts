export type CategoryResponse = {
  _id: string;
  name: string;
  type: string;
  imageUrl: string;
  budgetId?: string;
};

export enum TypeENUM {
  EXPENSE = 'expense',
  INCOME = 'income',
}
