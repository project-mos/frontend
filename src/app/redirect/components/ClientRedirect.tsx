"use client";

import oAuthLogin from "@/features/login/services/oAuthLogin.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ClientRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const login = async () => {
    const result = await oAuthLogin({ code: code!, provider: state! });
    console.log(result);
    router.replace("/");
  };

  useEffect(() => {
    if (!code || !state) return;
    login();
  }, []);
  return <div></div>;
};

export default ClientRedirect;
