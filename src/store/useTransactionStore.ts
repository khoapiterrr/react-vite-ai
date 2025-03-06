import { create } from 'zustand';
import { api } from '../lib/axios';

export interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  userId: number;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  filters: {
    type?: 'income' | 'expense';
    category?: string;
    startDate?: string;
    endDate?: string;
  };
  // Actions
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId'>) => Promise<void>;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  setFilters: (filters: Partial<TransactionState['filters']>) => void;
  clearFilters: () => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  loading: false,
  error: null,
  filters: {},

  fetchTransactions: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<Transaction[]>('/transactions', {
        params: get().filters,
      });
      set({ transactions: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch transactions' });
    } finally {
      set({ loading: false });
    }
  },

  addTransaction: async (transaction) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post<Transaction>('/transactions', transaction);
      set((state) => ({
        transactions: [...state.transactions, response.data],
      }));
    } catch (error) {
      set({ error: 'Failed to add transaction' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateTransaction: async (id, transaction) => {
    try {
      set({ loading: true, error: null });
      const response = await api.patch<Transaction>(`/transactions/${id}`, transaction);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? response.data : t
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update transaction' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteTransaction: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/transactions/${id}`);
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to delete transaction' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  clearFilters: () => {
    set({ filters: {} });
  },
})); 