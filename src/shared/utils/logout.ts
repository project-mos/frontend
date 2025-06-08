import { useAuthStore, useTokenStore } from "@/shared/store/authStore";

export const logout = async () => {
  const setLoggedIn = useAuthStore.getState().setLoggedIn;
  const setLoginSuccess = useAuthStore.getState().setLoginSuccess;
  const setWasLoggedIn = useAuthStore.getState().setWasLoggedIn;
  const setAccessToken = useTokenStore.getState().setAccessToken;

  // 상태 초기화
  setLoggedIn(false);
  setLoginSuccess(null);
  setWasLoggedIn(null);
  setAccessToken("");

  // 로컬 스토리지 데이터 삭제
  localStorage.removeItem("login");

  // zustand persist 데이터 삭제
  useAuthStore.persist.clearStorage();

  // 서버에 쿠키 삭제 요청
  await fetch("/api/cookie", { method: "DELETE" });

  // 리다이렉트
  window.location.href = "/";
};