"use client";

import { getAccessToken, getRefreshAuth } from "@/entities/auth/api/auth.api";
import { useAuthStore, useTokenStore } from "@/entities/auth/model/auth.store";
import { postFcmToken } from "@/entities/notification/api/notification.api";

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

  useEffect(() => {
    const fcmToken = localStorage.getItem("fcmToken");
    console.log(fcmToken);
    if (!fcmToken) return;
    if (!isLoggedIn || !accessToken) return;
    if (typeof window === "undefined") return;

    (async () => {
      try {
        await postFcmToken(fcmToken);
        console.log("서버에 FCM 토큰 등록 완료");
      } catch (e) {
        console.error("FCM 토큰 전송 실패:", e);
      }
      localStorage.removeItem("fcmToken");
    })();
  }, [isLoggedIn, accessToken]);

  return null;
};

export default AuthInitializer;
