import { useAuthStore, useTokenStore } from "@/entities/auth/store/auth.store";
import URL from "@/shared/constants/URL";

export const logout = async () => {
  const { reset: authStoreReset } = useAuthStore.getState();
  const { reset: tokenStoreReset } = useTokenStore.getState();

  // 상태 초기화
  authStoreReset();
  tokenStoreReset();
  localStorage.setItem("logout", "true");

  // 서버에 쿠키 삭제 요청
  await fetch("/api/cookie", { method: "DELETE" });

  // 리다이렉트
  window.location.href = URL.HOME;
};
