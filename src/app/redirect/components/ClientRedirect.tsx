"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import oAuthLogin from "@/features/login/services/oAuthLogin.service";
import URL from "@/shared/constants/URL";

const ClientRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const login = async () => {
    const result = await oAuthLogin({ code: code!, provider: state! });

    if (!result) {
      router.replace(URL.HOME);
      localStorage.setItem("login", "false");

      return;
    }
    localStorage.setItem("login", "true");
    router.replace(URL.HOME);
  };

  useEffect(() => {
    if (!code || !state) return;
    login();
  }, []);
  return <div></div>;
};

export default ClientRedirect;
