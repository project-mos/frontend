import AuthInitializer from "@/entities/auth/model/AuthInitializer";
import URL from "@/shared/constants/URL";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AuthInitializeProviderProps {
  isAuth?: boolean;
}

const AuthInitializerProvider = async ({
  isAuth = false,
}: AuthInitializeProviderProps) => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access-token");
  const refreshToken = (await cookieStore).get("refresh-token");

  let isRefresh = false;

  if (isAuth && !accessToken && !refreshToken) {
    redirect(URL.HOME);
  }
  if (!accessToken && refreshToken) {
    isRefresh = true;
  }

  return (
    <AuthInitializer
      isLoggedIn={!!accessToken}
      accessToken={accessToken?.value}
      hasTokens={!!accessToken && !!refreshToken}
      isRefresh={isRefresh}
    />
  );
};

export default AuthInitializerProvider;
