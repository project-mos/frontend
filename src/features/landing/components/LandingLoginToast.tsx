"use client";

import { useToast } from "@/shared/hooks/useToast";
import { useAuthStore } from "@/shared/store/authStore";
import { useEffect, useRef } from "react";

const LandingLoginToast = () => {
  const shownRef = useRef(false);
  const toast = useToast();
  const {
    hasHydrated,
    isLoggedIn,
    loginSuccess,
    setLoginSuccess,
    wasLoggedIn,
    setWasLoggedIn,
  } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (shownRef.current) return;
    console.log(isLoggedIn, wasLoggedIn);
    if (isLoggedIn === false && wasLoggedIn) {
      toast.error("로그인이 만료되었습니다.");
      setWasLoggedIn(null);
    }

    if (localStorage.getItem("logout")) {
      toast.success("로그아웃되었습니다.");
      localStorage.removeItem("logout");
    }
    if (loginSuccess === null) return;
    if (loginSuccess) toast.success("로그인에 성공하였습니다.");
    else toast.error("로그인에 실패하였습니다.");

    shownRef.current = true;
    setLoginSuccess(null);
  }, [hasHydrated, isLoggedIn, loginSuccess, wasLoggedIn]);

  return <></>;
};

export default LandingLoginToast;
