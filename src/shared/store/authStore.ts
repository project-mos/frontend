import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  loginSuccess: boolean;
  setLoginSuccess: (v: boolean) => void;
  wasLoggedIn: boolean;
  setWasLoggedIn: (v: boolean) => void;
}

// store 값 localStorage랑 연결
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLoggedIn: (v) => set({ isLoggedIn: v }),
      loginSuccess: false,
      setLoginSuccess: (v) => set({ loginSuccess: v }),
      wasLoggedIn: false,
      setWasLoggedIn: (v) => set({ wasLoggedIn: v }),
    }),
    {
      name: "login", // plz use unique key
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
