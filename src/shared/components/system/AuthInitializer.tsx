"use client";

import {
  getAccessToken,
  getRefreshAuth,
} from "@/features/landing/services/landing.service";
import { useAuthStore, useTokenStore } from "@/shared/store/authStore";
import { useCallback, useEffect } from "react";

interface AppInitializerProps {
  isLoggedIn: boolean;
  accessToken?: string; // accessToken을 받아올 수 있도록 추가
  hasTokens: boolean; // hasTokens를 받아올 수 있도록 추가
  isRefresh: boolean; // refresh 토큰으로 access 토큰 자동갱신할지 추가
}
const AuthInitializer = ({
  isLoggedIn,
  accessToken,
  hasTokens,
  isRefresh,
}: AppInitializerProps) => {
  const { setLoggedIn } = useAuthStore();
  const { setAccessToken } = useTokenStore();

  // refresh 토큰 기반 재인증
  const refreshAuth = useCallback(async () => {
    await getRefreshAuth();
    setLoggedIn(true);
    //
    const { accessToken: accessTokenResponse } = await getAccessToken();
    setAccessToken(accessTokenResponse || "");
  }, []);

  useEffect(() => {
    setLoggedIn(isLoggedIn);
    setAccessToken(accessToken || "");
  }, [isLoggedIn, accessToken, setLoggedIn, setAccessToken]);

  useEffect(() => {
    if (isLoggedIn && !hasTokens) {
      setLoggedIn(false);
    }
  }, [isLoggedIn, hasTokens, setLoggedIn]);

  useEffect(() => {
    if (isRefresh) {
      refreshAuth();
    }
  }, [isRefresh, refreshAuth]);
  return null;
};

export default AuthInitializer;
