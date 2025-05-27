import AuthInitializer from "@/shared/components/system/AuthInitializer";
import URL from "@/shared/constants/URL";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

interface AuthInitializeProviderProps {
  isAuth?: boolean;
}

const AuthInitializerProvider = async ({
  isAuth = false,
}: AuthInitializeProviderProps) => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access-token");
  const refreshToken = (await cookieStore).get("refresh-token");

  if (isAuth && (!accessToken || !refreshToken)) {
    redirect(URL.HOME);
  }

  return (
    <AuthInitializer
      isLoggedIn={!!accessToken}
      accessToken={accessToken?.value}
      hasTokens={!!accessToken && !!refreshToken}
    />
  );
};

export default AuthInitializerProvider;
