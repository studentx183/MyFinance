export interface TransactionModel {
  id: string;
  typeId: number;
  amount: number;
  createdAt: Date;
  for: string;
}
