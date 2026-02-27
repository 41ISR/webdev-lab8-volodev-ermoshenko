// UNUSED: this store is no longer used; authentication is handled
// by AuthContext. The file can be deleted.
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create()(
    persist(
        (set, get) => ({
            session: undefined,
            setSession: (session) => set({ session }),
            clearSession: () => set({ session: undefined })
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)

export default null  // previously exported useUserStore