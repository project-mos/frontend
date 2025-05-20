import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
}

// store 값 localStorage랑 연결
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLoggedIn: (v) => set({ isLoggedIn: v }),
    }),
    {
      name: "login", // plz use unique key
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
