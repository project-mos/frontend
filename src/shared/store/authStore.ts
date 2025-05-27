import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean; // 지금 로그인 상태인지 저장하는 변수
  setLoggedIn: (v: boolean) => void;
  loginSuccess: boolean | null; // 로그인 성공/실패 토스트 띄우기 위한 변수
  setLoginSuccess: (v: boolean | null) => void;
  wasLoggedIn: boolean | null; // 로그인 만료 토스트 띄우기 위한 변수
  setWasLoggedIn: (v: boolean | null) => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
}

// store 값 localStorage랑 연결
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        setLoggedIn: (v) => set({ isLoggedIn: v }),
        loginSuccess: null,
        setLoginSuccess: (v) => set({ loginSuccess: v }),
        wasLoggedIn: null,
        setWasLoggedIn: (v) => set({ wasLoggedIn: v }),
        hasHydrated: false,
        setHasHydrated: (v) => set({ hasHydrated: v }),
      }),
      {
        name: "login", // plz use unique key
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated?.(true); // hydration 완료 표시
        },
      }
    ),
    { name: "authStore" }
  )
);

interface TokenStore {
  accessToken: string; // accessToken을 저장하는 변수
  setAccessToken: (token: string) => void; // accessToken을 설정하는 함수
}
// Token 스토어(런타임으로만 사용, localStorage에 저장하지 않음)
export const useTokenStore = create<TokenStore>()(
  devtools(
    (set) => ({
      accessToken: "",
      setAccessToken: (token: string) => {
        return set({ accessToken: token });
      },
    }),
    { name: "tokenStore" }
  )
);
