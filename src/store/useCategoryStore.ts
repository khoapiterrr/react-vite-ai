import { create } from 'zustand';
import { api } from '../lib/axios';

export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
  color?: string;
  userId: number;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  // Actions
  fetchCategories: () => Promise<void>;
  addCategory: (category: Omit<Category, 'id' | 'userId'>) => Promise<void>;
  updateCategory: (id: number, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<Category[]>('/categories');
      set({ categories: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch categories' });
    } finally {
      set({ loading: false });
    }
  },

  addCategory: async (category) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post<Category>('/categories', category);
      set((state) => ({
        categories: [...state.categories, response.data],
      }));
    } catch (error) {
      set({ error: 'Failed to add category' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateCategory: async (id, category) => {
    try {
      set({ loading: true, error: null });
      const response = await api.patch<Category>(`/categories/${id}`, category);
      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === id ? response.data : c
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update category' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to delete category' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
})); 