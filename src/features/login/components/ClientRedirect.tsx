"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/entities/auth/store/auth.store";
import oAuthLogin from "@/features/login/services/oAuthLogin.service";
import URL from "@/shared/constants/URL";
import { useRouter, useSearchParams } from "next/navigation";

const ClientRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const { setLoggedIn, setLoginSuccess, setWasLoggedIn } = useAuthStore();

  const login = async () => {
    if (!code || !state) {
      // (임시) 에러 클래스 생성할지 논의
      throw new Error(
        "OAuth 로그인 실패: 'code' 또는 'state'가 누락되었습니다."
      );
    }
    const decodeURI = decodeURIComponent(state).split(",");
    const provider = decodeURI[0];
    const callbackUrl = decodeURI[1];

    const result = await oAuthLogin({ code: code, provider });
    if (result?.status === 200) {
      setLoginSuccess(true);
      setWasLoggedIn(true);
      setLoggedIn(true);

      // 전역 관리된 Path가 있다면 그 URL로 리다이렉트 없다면 HOME으로 리다이렉트
      router.replace(callbackUrl || URL.HOME);
      return;
    }
    setLoginSuccess(false);
    setLoggedIn(false);
    return router.replace(URL.HOME);
  };

  useEffect(() => {
    login();
  }, []);

  return <div></div>;
};

export default ClientRedirect;
