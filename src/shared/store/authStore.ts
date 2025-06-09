import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

type AuthState = {
  isLoggedIn: boolean; // 지금 로그인 상태인지 저장하는 변수
  loginSuccess: boolean | null; // 로그인 성공/실패 토스트 띄우기 위한 변수
  wasLoggedIn: boolean | null; // 로그인 만료 토스트 띄우기 위한 변수
  hasHydrated: boolean;
};

interface AuthAction {
  setLoggedIn: (v: boolean) => void;
  setLoginSuccess: (v: boolean | null) => void;
  setWasLoggedIn: (v: boolean | null) => void;
  setHasHydrated: (v: boolean) => void;
  reset: () => void;
}

const initialAuthState: AuthState = {
  hasHydrated: true,
  isLoggedIn: false,
  loginSuccess: null,
  wasLoggedIn: null,
};

// store 값 localStorage랑 연결
export const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        ...initialAuthState,
        setLoggedIn: (v) => set({ isLoggedIn: v }),
        setLoginSuccess: (v) => set({ loginSuccess: v }),
        setWasLoggedIn: (v) => set({ wasLoggedIn: v }),
        setHasHydrated: (v) => set({ hasHydrated: v }),
        reset: () => set(initialAuthState),
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

type TokenState = {
  accessToken: string; // accessToken을 저장하는 변수
};
type TokenAction = {
  setAccessToken: (token: string) => void; // accessToken을 설정하는 함수
  reset: () => void;
};
// Token 스토어(런타임으로만 사용, localStorage에 저장하지 않음)
const initialTokenState: TokenState = {
  accessToken: "",
};
export const useTokenStore = create<TokenState & TokenAction>()(
  devtools(
    (set) => ({
      ...initialTokenState,
      setAccessToken: (token: string) => set({ accessToken: token }),
      reset: () => set(initialTokenState),
    }),
    { name: "tokenStore" }
  )
);
