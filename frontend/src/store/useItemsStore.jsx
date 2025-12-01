import { create } from "zustand";
import { api } from "../api/api";

const  useItemsStore = create((set) => ({
    items: [],
    getItems: async () => {
        try {
            const res = await api.getItems()
            set({items: res})
        } catch (error) {
            console.error(error)
        }
    }
}))

export default useItemsStore