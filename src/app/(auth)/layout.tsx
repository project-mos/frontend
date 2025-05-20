import LoginInitializer from "@/shared/components/system/LoginInitializer";
import URL from "@/shared/constants/URL";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access-token");
  const refreshToken = (await cookieStore).get("refresh-token");

  if (!accessToken || !refreshToken) {
    redirect(URL.HOME);
  }

  return (
    <>
      <LoginInitializer hasTokens={!!accessToken && !!refreshToken} />
      {children}
    </>
  );
}
