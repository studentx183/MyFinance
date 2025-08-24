import { apiDelete, apiGet, apiPatch, apiPost } from "@/api/axios";
import { Result } from "@/types/api";
import { TransactionModel } from "@/types/transaction-model";

export const fetchHistory = (): Promise<Result<TransactionModel[]>> =>
  apiGet<TransactionModel[]>("/transactions");

export const createTransaction = (
  data: TransactionModel
): Promise<Result<TransactionModel>> =>
  apiPost<TransactionModel, TransactionModel>("/transactions", data);

export const updateTransaction = (
  id: string,
  data: Partial<TransactionModel>
): Promise<Result<TransactionModel>> =>
  apiPatch<TransactionModel, TransactionModel>(`/transactions/${id}`, data);

export const deleteTransaction = (id: string): Promise<Result<void>> =>
  apiDelete<void>(`/transactions/${id}`);
