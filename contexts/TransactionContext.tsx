import { createTransaction, fetchHistory } from "@/services/transaction";
import { TransactionModel } from "@/types/transaction-model";
import React, { createContext, useContext, useEffect, useState } from "react";

interface TransactionContextType {
  transactions: TransactionModel[];
  isLoading: boolean;
  error: string | null;
  addTransaction: (transaction: TransactionModel) => Promise<boolean>;
  refreshTransactions: () => Promise<void>;
  getTransactionsByType: (typeId: number) => TransactionModel[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshTransactions = async () => {
    setIsLoading(true);
    setError(null);

    const result = await fetchHistory();

    if (result.success) {
      setTransactions(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const addTransaction = async (transaction: TransactionModel): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const result = await createTransaction(transaction);

    if (result.success) {
      setTransactions(prev => [...prev, result.data]);
      setIsLoading(false);
      return true;
    } else {
      setError(result.error);
      setIsLoading(false);
      return false;
    }
  };

  const getTransactionsByType = (typeId: number): TransactionModel[] => {
    return transactions.filter(transaction => transaction.typeId === typeId);
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  const value: TransactionContextType = {
    transactions,
    isLoading,
    error,
    addTransaction,
    refreshTransactions,
    getTransactionsByType,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
