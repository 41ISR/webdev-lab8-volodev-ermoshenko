import { create } from 'zustand';
import { itemsAPI, statsAPI } from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';

const useItemsStore = create((set) => ({
  items: [],
  stats: null,
  currentItem: null,
  loading: false,
  error: null,

  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const items = await itemsAPI.getAll();
      set({ items, loading: false });
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
    }
  },

  fetchItem: async (id) => {
    set({ loading: true, error: null });
    try {
      const item = await itemsAPI.getById(id);
      set({ currentItem: item, loading: false });
      return item;
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
      return null;
    }
  },

  createItem: async (title, description, price, imageUrl) => {
    set({ loading: true, error: null });
    try {
      const newItem = await itemsAPI.create(title, description, price, imageUrl);
      set((state) => ({
        items: [newItem, ...state.items],
        loading: false,
      }));
      return { success: true, item: newItem };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  deleteItem: async (id) => {
    set({ loading: true, error: null });
    try {
      await itemsAPI.delete(id);
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  fetchStats: async () => {
    try {
      const stats = await statsAPI.getStats();
      set({ stats });
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  },

  clearCurrentItem: () => set({ currentItem: null }),
  clearError: () => set({ error: null }),
}));

export default useItemsStore;

