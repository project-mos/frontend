"use client";

import { useCallback, useEffect } from "react";

import URL from "@/shared/constants/URL";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import oAuthLogin from "@/features/login/services/oAuthLogin.service";
import { useAuthStore } from "@/shared/store/authStore";
//localhost:3000/redirect?code=dL-Gh6xbiBontb-h7akwffCUvKFf9_JHRnI3UWb7pbR8Pd3cD1oyTwAAAAQKFxZiAAABluupCZCGtS2__sNdBQ&state=KAKAO
const ClientRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const { setLoggedIn, redirectPath, hasHydrated } = useAuthStore();

  const memoLogin = useCallback(async () => {
    if (!code || !state) {
      // (임시) 에러 클래스 생성할지 논의
      throw new Error(
        "OAuth 로그인 실패: 'code' 또는 'state'가 누락되었습니다."
      );
    }
    const result = await oAuthLogin({ code: code, provider: state });

    if (result?.status === 200) {
      setLoggedIn(true);
      console.log(redirectPath);
      // 전역 관리된 Path가 있다면 그 URL로 리다이렉트 없다면 HOME으로 리다이렉트
      router.replace(redirectPath || URL.HOME);
      return;
    }
    setLoggedIn(false);
    return router.replace(URL.HOME);
  }, [code, state, setLoggedIn, router, redirectPath]);

  useEffect(() => {
    if (hasHydrated) {
      memoLogin();
    }
  }, [hasHydrated, memoLogin]);
  return <div></div>;
};

export default ClientRedirect;
