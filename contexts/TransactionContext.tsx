import {
  createTransaction as createTransactionService,
  deleteTransaction as deleteTransactionService,
  fetchHistory as fetchHistoryService,
  updateTransaction as updateTransactionService,
} from "@/services/transaction";
import { TransactionModel } from "@/types/transaction-model";
import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

interface TransactionContextType {
  transactions: TransactionModel[];
  isLoading: boolean;
  error: string | null;
  createTransaction: (transaction: TransactionModel) => Promise<ResultType>;
  updateTransaction: (
    id: string,
    data: Partial<TransactionModel>
  ) => Promise<ResultType>;
  deleteTransaction: (id: string) => Promise<ResultType>;
  refreshTransactions: () => Promise<ResultType>;
  getTransactionsByType: (typeId: number) => TransactionModel[];
}

type ResultType = {
  success: boolean;
  error?: string;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshTransactions = async (): Promise<ResultType> => {
    setIsLoading(true);
    setError(null);

    const result = await fetchHistoryService();

    if (result.success) {
      setTransactions(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
    return result;
  };

  const createTransaction = async (
    transaction: TransactionModel
  ): Promise<ResultType> => {
    setIsLoading(true);
    setError(null);

    const result = await createTransactionService(transaction);

    if (result.success) {
      setTransactions((prev) => [...prev, result.data]);
    } else {
      setError(result.error);
      console.log(result);
    }

    setIsLoading(false);
    return result;
  };

  const updateTransaction = async (
    id: string,
    data: Partial<TransactionModel>
  ): Promise<ResultType> => {
    setIsLoading(true);
    setError(null);

    const result = await updateTransactionService(id, data);

    if (result.success) {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === id ? result.data : tx))
      );
    } else {
      setError(result.error);
    }

    setIsLoading(false);
    return result;
  };

  const deleteTransaction = async (id: string): Promise<ResultType> => {
    setIsLoading(true);
    setError(null);

    const result = await deleteTransactionService(id);

    if (result.success) {
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    } else {
      setError(result.error);
    }

    setIsLoading(false);
    return result;
  };

  const getTransactionsByType = (typeId: number): TransactionModel[] => {
    return transactions.filter((transaction) => transaction.typeId === typeId);
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }
  }, [error]);

  const value: TransactionContextType = {
    transactions,
    isLoading,
    error,
    createTransaction,
    refreshTransactions,
    getTransactionsByType,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
