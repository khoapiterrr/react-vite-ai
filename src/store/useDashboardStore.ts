import { create } from 'zustand';
import { api } from '../lib/axios';

interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
  }[];
}

interface DashboardState {
  stats: DashboardStats | null;
  incomeChartData: ChartData | null;
  expenseChartData: ChartData | null;
  loading: boolean;
  error: string | null;
  // Actions
  fetchDashboardData: () => Promise<void>;
  fetchIncomeChartData: () => Promise<void>;
  fetchExpenseChartData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  incomeChartData: null,
  expenseChartData: null,
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<DashboardStats>('/dashboard/stats');
      set({ stats: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch dashboard stats' });
    } finally {
      set({ loading: false });
    }
  },

  fetchIncomeChartData: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<ChartData>('/dashboard/income-chart');
      set({ incomeChartData: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch income chart data' });
    } finally {
      set({ loading: false });
    }
  },

  fetchExpenseChartData: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<ChartData>('/dashboard/expense-chart');
      set({ expenseChartData: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch expense chart data' });
    } finally {
      set({ loading: false });
    }
  },
})); 