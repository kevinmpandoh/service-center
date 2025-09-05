import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null, // { id, username, role }
      isAuthenticated: false,
      isHydrated: false,
      // action: login
      login: (data) => {
        set({
          token: data.token,
          user: data.user,
          isAuthenticated: true,
        });
      },
      setHydrated: (value) => set({ isHydrated: value }),

      // action: logout
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false, // ✅ reset saat logout
        });
      },

      // getter role
      getRole: () => get().user?.role || null,
      updateUser: (partialUser) => {
        set({
          user: {
            ...get().user,
            ...partialUser,
          },
        });
      },
    }),
    {
      name: "auth-storage", // key di localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true); // ✅ set true begitu selesai hydrate
      },
    }
  )
);
