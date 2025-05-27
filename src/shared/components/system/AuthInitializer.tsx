"use client";

import { useAuthStore, useTokenStore } from "@/shared/store/authStore";
import { useEffect } from "react";

interface AppInitializerProps {
  isLoggedIn: boolean;
  accessToken?: string; // accessToken을 받아올 수 있도록 추가
  hasTokens: boolean; // hasTokens를 받아올 수 있도록 추가
}
const AuthInitializer = ({
  isLoggedIn,
  accessToken,
  hasTokens,
}: AppInitializerProps) => {
  const { setLoggedIn } = useAuthStore();
  const { setAccessToken } = useTokenStore();

  useEffect(() => {
    setLoggedIn(isLoggedIn);
    setAccessToken(accessToken || "");
  }, [isLoggedIn, accessToken, setLoggedIn, setAccessToken]);

  useEffect(() => {
    if (isLoggedIn && !hasTokens) {
      setLoggedIn(false);
    }
  }, [isLoggedIn, hasTokens, setLoggedIn]);
  return null;
};

export default AuthInitializer;
