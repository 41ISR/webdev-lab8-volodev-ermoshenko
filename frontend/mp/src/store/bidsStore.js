import { create } from 'zustand';
import { bidsAPI } from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';

const useBidsStore = create((set) => ({
  bids: [],
  myBids: [],
  loading: false,
  error: null,

  fetchBids: async (itemId) => {
    set({ loading: true, error: null });
    try {
      const bids = await bidsAPI.getByItemId(itemId);
      set({ bids, loading: false });
      return bids;
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
      return [];
    }
  },

  createBid: async (itemId, amount) => {
    set({ loading: true, error: null });
    try {
      const newBid = await bidsAPI.create(itemId, amount);
      set((state) => ({
        bids: [newBid, ...state.bids],
        loading: false,
      }));
      return { success: true, bid: newBid };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ loading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  fetchMyBids: async () => {
    set({ loading: true, error: null });
    try {
      const myBids = await bidsAPI.getMyBids();
      set({ myBids, loading: false });
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
    }
  },

  clearBids: () => set({ bids: [] }),
  clearError: () => set({ error: null }),
}));

export default useBidsStore;

