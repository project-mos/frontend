import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  redirectPath: string;
  hasHydrated: boolean;
  setLoggedIn: (v: boolean) => void;
  setHasHydrated: (v: boolean) => void;
  setRedirectPath: (v: string) => void;
}

// store 값 localStorage랑 연결
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      redirectPath: "", // oAuth 처리 시 redirect path 저장
      hasHydrated: false, // hydration 됐는지 여부
      setLoggedIn: (v) => set({ isLoggedIn: v }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
      setRedirectPath: (v) => set({ redirectPath: v }), // oAuth 처리 시 redirect path를 지정해줘야 callback url 조정할 수 있습니다!
    }),
    {
      name: "login", // plz use unique key
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: () => (state) => {
        // hydration event 감지
        state?.setHasHydrated(true);
      },
    }
  )
);
