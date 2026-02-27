import { create } from "zustand";
import { itemsAPI, statsAPI } from "../api/api";

const useItemsStore = create((set) => ({
    items: [],
    stats: null,
    loading: false,
    error: null,

    fetchItems: async () => {
        set({ loading: true, error: null });
        try {
            const data = await itemsAPI.getAll();
            set({ items: data });
        } catch (err) {
            console.error(err);
            set({ error: err.message || 'Failed to load items' });
        } finally {
            set({ loading: false });
        }
    },

    fetchStats: async () => {
        try {
            const data = await statsAPI.get();
            set({ stats: data });
        } catch (err) {
            console.error(err);
        }
    },
}));

export default useItemsStore