"use client";
import { useAuthStore } from "@/shared/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import oAuthLogin from "@/features/login/services/oAuthLogin.service";
import URL from "@/shared/constants/URL";

const ClientRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const { setLoggedIn } = useAuthStore();

  const login = async () => {
    const result = await oAuthLogin({ code: code!, provider: state! });

    if (result?.status === 200) {
      localStorage.setItem("login", "true");
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
      router.replace(URL.HOME);
      return;
    }

    localStorage.setItem("login", "false");
    setLoggedIn(false);
    router.replace(URL.HOME);
  };

  useEffect(() => {
    if (!code || !state) return;
    login();
  }, []);
  return <div></div>;
};

export default ClientRedirect;
