import { apiGet, apiPost } from "@/api/axios";
import { Result } from "@/types/api";
import { TransactionModel } from "@/types/transaction-model";

export const fetchHistory = (): Promise<Result<TransactionModel[]>> =>
  apiGet<TransactionModel[]>("/transactions");

export const createTransaction = (
  data: TransactionModel
): Promise<Result<TransactionModel>> =>
  apiPost<TransactionModel>("/transactions", data);
